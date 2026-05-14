import { cp, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const outDir = path.join(projectRoot, "out");
const backendDir = path.join(projectRoot, "backend");
const targetDir = path.join(outDir, "backend");

if (existsSync(outDir) && existsSync(backendDir)) {
  await mkdir(targetDir, { recursive: true });
  await cp(backendDir, targetDir, {
    recursive: true,
    filter: (source) => !source.endsWith("config.php")
  });
}
