import fs from "fs";
import z from "zod";

const data = fs.readFileSync("./data.json", "utf8");
const json = JSON.parse(data);

const schema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  key1: z.string(),
  key2: z.string(),
  key3: z.string(),
  key4: z.string(),
});

const executionTimes = [];
console.log("Iteration, Execution Time");
for (let i = 0; i < 100; i++) {
  performance.mark("iterationStart");
  schema.array().parse(json);
  performance.mark("iterationEnd");
  performance.measure(
    `iterationDuration-${i}`,
    "iterationStart",
    "iterationEnd"
  );

  const measure = performance.getEntriesByName(`iterationDuration-${i}`)[0];
  executionTimes.push(measure.duration);

  console.log(`${i}, ${measure.duration}`);
}

const minExecutionTime = Math.min(...executionTimes);
const maxExecutionTime = Math.max(...executionTimes);
const averageExecutionTime =
  executionTimes.reduce((acc, val) => acc + val, 0) / executionTimes.length;

const calculateMedian = (arr) => {
  const sortedArr = arr.sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedArr.length / 2);

  if (sortedArr.length % 2 === 0) {
    return (sortedArr[middleIndex - 1] + sortedArr[middleIndex]) / 2;
  } else {
    return sortedArr[middleIndex];
  }
};

const medianExecutionTime = calculateMedian(executionTimes);

console.log(`Minimum Execution Time: ${minExecutionTime} milliseconds`);
console.log(`Maximum Execution Time: ${maxExecutionTime} milliseconds`);
console.log(`Average Execution Time: ${averageExecutionTime} milliseconds`);
console.log(`Median Execution Time: ${medianExecutionTime} milliseconds`);
