import fs from "fs";
import path from "path";

const name = process.argv[2];
if (!name) {
  console.error("Usage: npm run gen:feature <feature-name>");
  process.exit(1);
}

const base = path.resolve("src/features", name);
const files = {
  "page.tsx": `export default function ${pascal(name)}Page(){\n  return <div>${name} page</div>\n}\n`,
  "hooks.ts": `// hooks for ${name}\n`,
  "api.ts": `// api calls for ${name}\n`,
  "index.ts": `export { default } from "./page";\n`,
};

fs.mkdirSync(base, { recursive: true });
for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(base, file), content, "utf8");
}

console.log("✅ Feature created:", base);

function pascal(str){
  return str.replace(/(^\w|[-_ ]\w)/g, m => m.replace(/[-_ ]/, "").toUpperCase());
}
