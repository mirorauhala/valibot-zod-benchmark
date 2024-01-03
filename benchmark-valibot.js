import fs from "fs";
import { array, object, number, string, parse } from "valibot";

const data = fs.readFileSync("./data.json", "utf8");
const json = JSON.parse(data);

const schema = object({
  id: number(),
  name: string(),
  price: number(),
  key1: string(),
  key2: string(),
  key3: string(),
  key4: string(),
});

const executionTimes = [];
console.log("Iteration, Execution Time");
for (let i = 0; i < 100; i++) {
  performance.mark("iterationStart");
  parse(array(schema), json);
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
