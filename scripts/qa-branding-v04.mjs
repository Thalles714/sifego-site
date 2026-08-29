import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, "../..");
const filmDir = path.join(projectRoot, "assets/production/sifego/branding-film");
const rendererPath = path.join(filmDir, "render-branding-film.mjs");

const renderer = await readFile(rendererPath, "utf8");
const forbiddenCopy = [
  "SISTEMA DE IDENTIDADE",
  "BRANDING",
  "ENTENDER",
  "DEFINIR",
  "CRIAR",
  "TRÊS PERSPECTIVAS",
  "UM SISTEMA COERENTE",
  "IDENTIDADE EM MOVIMENTO",
  "SIFEGO / 2026",
];

for (const value of forbiddenCopy) {
  assert.equal(renderer.includes(value), false, `Texto removido retornou ao renderizador: ${value}`);
}

for (const pattern of [
  /function\s+grid\b/,
  /function\s+line\b/,
  /ctx\.arc\s*\(/,
  /ctx\.stroke\s*\(/,
  /strokeRect\s*\(/,
]) {
  assert.equal(pattern.test(renderer), false, `Geometria auxiliar proibida encontrada: ${pattern}`);
}

assert.match(renderer, /wordmark\(\s*"SIFEGO"/s, "O lockup final precisa conter somente o nome SIFEGO.");
assert.match(renderer, /const\s+spins\s*=\s*\[[^\]]+\]/s, "A coreografia dos três módulos precisa existir.");

async function readRaw(fileName) {
  const image = sharp(path.join(filmDir, fileName));
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  assert.equal(info.width, 1200, `${fileName} deve ter 1200 px de largura.`);
  assert.equal(info.height, 1000, `${fileName} deve ter 1000 px de altura.`);
  assert.equal(info.channels >= 3, true, `${fileName} deve possuir canais RGB.`);
  return { data, info };
}

function assertSolidOutside({ data, info }, bounds, expected, label) {
  let deviations = 0;
  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      if (x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom) continue;
      const index = (y * info.width + x) * info.channels;
      const difference =
        Math.abs(data[index] - expected[0]) +
        Math.abs(data[index + 1] - expected[1]) +
        Math.abs(data[index + 2] - expected[2]);
      if (difference > 3) deviations += 1;
    }
  }
  assert.equal(deviations, 0, `${label}: ${deviations} pixels apareceram fora da área permitida.`);
}

const start = await readRaw("qa-v04-render-0s.png");
const formation = await readRaw("qa-v04-render-1-72s.png");
const lockup = await readRaw("qa-v04-render-6-4s.png");
const seam = await readRaw("qa-v04-render-9-93s.png");
const poster = await readRaw("branding-sifego-system-v04-poster.webp");

assert.deepEqual(start.data, seam.data, "Primeiro quadro e emenda final precisam compartilhar o mesmo fundo sólido.");
assertSolidOutside(formation, { left: 390, right: 810, top: 280, bottom: 720 }, [17, 17, 15], "Take escuro");
assertSolidOutside(lockup, { left: 340, right: 860, top: 390, bottom: 610 }, [240, 238, 231], "Take claro");
assertSolidOutside(poster, { left: 340, right: 860, top: 390, bottom: 610 }, [240, 238, 231], "Poster");

console.log("Branding v4: composição, conteúdo permitido e emenda validados.");
