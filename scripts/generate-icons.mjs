// Genera el favicon y los iconos de la Pousada a partir del logo actual.
// Símbolo (olas + gaviotas, sin texto) recortado de pousada-logo-preto.webp,
// centrado en un lienzo cuadrado sobre el azul de marca #143C7A.
//
// Para regenerar:  node scripts/generate-icons.mjs
// Para subir de resolución en el futuro: reemplazar SRC por un original mejor
// (idealmente solo-símbolo, cuadrado y transparente) y ajustar BIRDS/WAVES, o
// —más simple— sustituir directamente los archivos generados en /public e
// /public/icons manteniendo los mismos nombres (el código no cambia).
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "public/images/pousada-logo-preto.webp";
const BLUE = { r: 20, g: 60, b: 122, alpha: 1 }; // #143C7A
const MASTER = 512;

// Regiones limpias (sin texto) dentro del logo 300x130.
const BIRDS = { left: 196, top: 4, width: 66, height: 36 };
const WAVES = { left: 223, top: 41, width: 60, height: 57 };

function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const entries = Buffer.alloc(16 * images.length);
  let offset = 6 + 16 * images.length;
  const datas = [];
  images.forEach((im, i) => {
    const e = entries.subarray(i * 16, i * 16 + 16);
    e.writeUInt8(im.size >= 256 ? 0 : im.size, 0);
    e.writeUInt8(im.size >= 256 ? 0 : im.size, 1);
    e.writeUInt8(0, 2); e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
    e.writeUInt32LE(im.png.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += im.png.length;
    datas.push(im.png);
  });
  return Buffer.concat([header, entries, ...datas]);
}

async function main() {
  await mkdir("public/icons", { recursive: true });
  const waves = await sharp(await sharp(SRC).extract(WAVES).png().toBuffer())
    .resize({ height: 300 }).toBuffer();
  const wm = await sharp(waves).metadata();
  const birds = await sharp(await sharp(SRC).extract(BIRDS).png().toBuffer())
    .resize({ width: 215 }).toBuffer();
  const bm = await sharp(birds).metadata();
  const master = await sharp({ create: { width: MASTER, height: MASTER, channels: 4, background: BLUE } })
    .composite([
      { input: waves, left: Math.round((MASTER - wm.width) / 2) + 8, top: 176 },
      { input: birds, left: Math.round((MASTER - bm.width) / 2), top: 96 },
    ]).png().toBuffer();

  const png = (size) => sharp(master).resize(size, size, { fit: "fill" }).png().toBuffer();

  // Iconos PNG (manifest + apple + referencia)
  await sharp(await png(512)).toFile("public/icons/icon-512.png");
  await sharp(await png(192)).toFile("public/icons/icon-192.png");
  await sharp(await png(180)).toFile("public/icons/apple-touch-icon.png");
  await sharp(await png(32)).toFile("public/icons/icon-32.png");
  await sharp(await png(16)).toFile("public/icons/icon-16.png");
  await sharp(master).toFile("public/icons/icon-source.png"); // master 512 (base para regenerar)

  // favicon.ico multi-tamaño (16/32/48) en la raíz de /public
  const ico = buildIco([
    { size: 16, png: await png(16) },
    { size: 32, png: await png(32) },
    { size: 48, png: await png(48) },
  ]);
  await sharp(master).resize(48, 48).toFile("public/icons/icon-48.png");
  const { writeFile } = await import("node:fs/promises");
  await writeFile("public/favicon.ico", ico);

  console.log("Iconos generados. waves", wm.width + "x" + wm.height, "birds", bm.width + "x" + bm.height);
}
main();
