# Zod/valibot benchmark

Benchmarks zod and valibot to see which is faster.

### Running benchmarks

1. Run `pnpm install` to install dependencies.
2. Run `node index.js` to create a data file. You can change the number of iterations in `index.js`. By default a million objects are generated.
3. Run `node benchmark-zod.js` to run the zod benchmark.
4. Run `node benchmark-valibot.js` to run the valibot benchmark.

Both scripts are similar and report the results in a CSV format. At the end
there's a summary of the results.

### Results

On my machine (Macbook Pro 14" M1 Max w/ Node 18.18) the results are:

|         | zod-million | zod-4k  | valibot-million | valibot-4k |
| ------- | ----------- | ------- | --------------- | ---------- |
| Min     | 709.0 ms    | 2.1 ms  | 318.4 ms        | 0.8 ms     |
| Max     | 1140.9 ms   | 17.5 ms | 625.6 ms        | 7.1 ms     |
| Average | 819.6 ms    | 2.6 ms  | 399.0 ms        | 1.0 ms     |
| Median  | 808.7 ms    | 2.4 ms  | 386.4 ms        | 0.9 ms     |
| p95     | 1009.0 ms   | 3.1 ms  | 572.1 ms        | 1.2 ms     |
| p99     | 1110.8 ms   | 4.3 ms  | 612.0 ms        | 1.3 ms     |

Here we can conclude that valibot is about 2-3 times faster than zod. The
difference is more noticeable when validating a million objects. That means that
valibot is a better choice for validating large amounts of data. However, zod is
can still be a good choice on the lower end if a few milliseconds of parse time
can be looked over.

Note that these are just benchmarks and it doesn't take into account how usable
the APIs are.
