import runTestcaseFile from "./util/runTestcaseFile";

const args = process.argv;
if (args.length !== 3) {
  throw new Error("Wrong number of arguments provided. Exitting.");
}
const filePath = args[2];

const solution = runTestcaseFile(filePath);
console.log(
  "🦄🎢🎢🎢🎢🎢🎢 The earnings will be : " + solution + " Dirhams 🤑"
);
