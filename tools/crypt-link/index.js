import CryptoJS from "crypto-js";
import { readFile, writeFile } from "fs/promises";
import dotenv from "dotenv";
import { existsSync } from "fs";
dotenv.config();

const key = process.env["KEY"];
const inputFilePath = "input.json";
const outputFilePath = "output.json";

if (key.length === 0) {
  console.error("Invalid key supplied!");
  process.exit(1);
}

if (!existsSync(inputFilePath)) {
  console.error("Input file does not exists!");
  process.exit(1);
}

const inputData = await readFile(inputFilePath);
const data = JSON.parse(inputData.toString("utf-8"));

if (!data || !Array.isArray(data) || data.length === 0) {
  console.error("Invalid input!");
  process.exit(1);
}

let result = [];

for (const link of data) {
  const { name, url } = link;

  const cryptUrl = CryptoJS.Rabbit.encrypt(url, key).toString();

  result.push({
    name,
    url: cryptUrl
  });
}

if (result.length > 0) {
  try {
    await writeFile(outputFilePath, JSON.stringify(result, undefined, "  "));
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
