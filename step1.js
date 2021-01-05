"use strict";

const fsP = require("fs/promises");
const argv = process.argv;

/**
 * Function takes a path, and reads the file with that path,
 * printing contents of file
 * Ask about console logging error message succintly
 * */  
async function cat(path) {
  try {
    let contents = await fsP.readFile(path, "utf8");
    console.log(contents);
  } catch (err) {
    console.error(err);
    process.exit(2);
  }
}

cat(argv[2]);