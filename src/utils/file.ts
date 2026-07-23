// src/utils/file.ts
import fs from "fs-extra";
import path from "path";
import stripJsonComments from "strip-json-comments";

export async function readConfig(cwd: string) {
  const configPath = path.join(cwd, "nikala.config.json");
  if (!(await fs.pathExists(configPath))) return null;
  return fs.readJson(configPath);
}

export async function writeConfig(cwd: string, config: unknown) {
  await fs.writeFile(
    path.join(cwd, "nikala.config.json"),
    JSON.stringify(config, null, 2)
  );
}

export async function readTsConfig(cwd: string) {
  const tsconfigPath = path.join(cwd, "tsconfig.json");
  if (!(await fs.pathExists(tsconfigPath))) return null;
  
  const content = await fs.readFile(tsconfigPath, "utf-8");
  return JSON.parse(stripJsonComments(content));
}

export async function writeTsConfig(cwd: string, config: unknown) {
  await fs.writeFile(
    path.join(cwd, "tsconfig.json"),
    JSON.stringify(config, null, 2)
  );
}