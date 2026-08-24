// Build do design system: um bundle ESM + os .d.ts + a folha de estilos.
// React fica externo — o host (ou o _vendor/ dos cartões de preview) fornece-o.
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, copyFileSync, readdirSync } from "node:fs";

mkdirSync("dist", { recursive: true });

await build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2020",
  jsx: "automatic",
  external: ["react", "react-dom", "react/jsx-runtime"],
  logLevel: "info",
});

// CSS: uma entrada que importa tokens + fontes + componentes, resolvida por esbuild.
await build({
  entryPoints: ["src/styles.css"],
  outfile: "dist/styles.css",
  bundle: true,
  loader: { ".woff2": "file", ".ttf": "file" },
  assetNames: "fonts/[name]",
  logLevel: "info",
});

execFileSync("npx", ["tsc", "-p", "tsconfig.json"], { stdio: "inherit", shell: true });

console.log("dist/:", readdirSync("dist").join(", "));
