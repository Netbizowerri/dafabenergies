import { copyFile, mkdir } from "node:fs/promises";

await mkdir("dist", { recursive: true });
await copyFile("deploy/.htaccess", "dist/.htaccess");
