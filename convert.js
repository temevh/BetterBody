import fs from "fs";

const inputPath = "./exercises.json";
const outputPath = "./exercises.sql";

const exercises = JSON.parse(fs.readFileSync(inputPath, "utf8"));

const escapeSql = (str) => str.replace(/'/g, "''").replace(/\r?\n/g, " ");

const toPgArray = (arr) => {
  if (!arr || arr.length === 0) return "ARRAY[]::text[]";
  return `ARRAY[${arr.map((v) => `'${escapeSql(v)}'`).join(", ")}]`;
};

const inserts = exercises.map((ex) => {
  return `(
    '${escapeSql(ex.id)}',
    '${escapeSql(ex.name)}',
    '${escapeSql(ex.force ?? "")}',
    '${escapeSql(ex.level ?? "")}',
    '${escapeSql(ex.mechanic ?? "")}',
    '${escapeSql(ex.equipment ?? "")}',
    '${escapeSql(ex.category ?? "")}',
    ${toPgArray(ex.primary_muscles)},
    ${toPgArray(ex.secondary_muscles)},
    ${toPgArray(ex.instructions)},
    ${toPgArray(ex.images)}
  )`;
});

const sql = `
insert into exercises (
  id,
  name,
  force,
  level,
  mechanic,
  equipment,
  category,
  primary_muscles,
  secondary_muscles,
  instructions,
  images
) values
${inserts.join(",\n")};
`;

fs.writeFileSync(outputPath, sql);

console.log("✅ SQL file generated:", outputPath);
