// json
import fs from "fs";
const objects = [];

for (let i = 0; i < 1000000; i++) {
  objects.push({
    id: i,
    name: `name${i}`,
    price: i,
    key1: `key1-${i}`,
    key2: `key2-${i}`,
    key3: `key3-${i}`,
    key4: `key4-${i}`,
  });
}

const json = JSON.stringify(objects);

fs.writeFileSync("./data.json", json);
