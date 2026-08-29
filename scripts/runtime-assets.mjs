import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(here, "..");
const sourceRoot = path.join(siteRoot, "src");
const publicRoot = path.join(siteRoot, "public");
const assetRoot = path.join(publicRoot, "assets");
const manifestPath = path.join(siteRoot, "runtime-assets-manifest.json");
const assetPattern = /["'](\/assets\/[^"']+)["']/g;

async function filesInside(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const absolutePath = path.join(directory, entry.name);
      return entry.isDirectory() ? filesInside(absolutePath) : [absolutePath];
    }),
  );
  return nested.flat();
}

const sourceFiles = (await filesInside(sourceRoot)).filter((file) => /\.(?:css|ts|tsx)$/.test(file));
const referenced = new Set();

for (const sourceFile of sourceFiles) {
  const source = await readFile(sourceFile, "utf8");
  for (const match of source.matchAll(assetPattern)) referenced.add(match[1].slice(1));
}

const publicFiles = (await filesInside(assetRoot)).map((file) =>
  path.relative(publicRoot, file).split(path.sep).join("/"),
);
const unused = publicFiles.filter((file) => !referenced.has(file)).sort();
const missing = [...referenced].filter((file) => !publicFiles.includes(file)).sort();

async function describeAsset(relativePath) {
  const absolutePath = path.join(publicRoot, ...relativePath.split("/"));
  const [details, content] = await Promise.all([stat(absolutePath), readFile(absolutePath)]);
  return {
    path: relativePath,
    bytes: details.size,
    sha256: createHash("sha256").update(content).digest("hex"),
  };
}

const assets = await Promise.all([...referenced].sort().map(describeAsset));
const manifest = {
  source: "site/src",
  generatedAt: new Date().toISOString().slice(0, 10),
  count: assets.length,
  totalBytes: assets.reduce((total, asset) => total + asset.bytes, 0),
  assets,
};

if (process.argv.includes("--write")) {
  assert.deepEqual(missing, [], `Assets referenciados e ausentes: ${missing.join(", ")}`);
  assert.deepEqual(unused, [], `Assets públicos sem uso: ${unused.join(", ")}`);
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Manifesto atualizado: ${manifest.count} assets, ${manifest.totalBytes} bytes.`);
} else if (process.argv.includes("--check")) {
  const current = JSON.parse(await readFile(manifestPath, "utf8"));
  assert.deepEqual(missing, [], `Assets referenciados e ausentes: ${missing.join(", ")}`);
  assert.deepEqual(unused, [], `Assets públicos sem uso: ${unused.join(", ")}`);
  assert.equal(current.source, manifest.source);
  assert.equal(current.count, manifest.count);
  assert.equal(current.totalBytes, manifest.totalBytes);
  assert.deepEqual(current.assets, manifest.assets);
  console.log(`Assets válidos: ${manifest.count} arquivos conferidos por tamanho e SHA-256.`);
} else {
  console.log(JSON.stringify({ referenced: referenced.size, missing, unused }, null, 2));
}
