"use strict";

const fsP = require("fs/promises");
// const path = process.argv[2];
const axios = require("axios");

/**
 * Function takes a path, and reads the file with that path,
 * printing contents of file
 * */

async function cat(path) {
  let contents;
  try {
    contents = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.error(`Error reading ${path}:\n`, err.message);
    process.exit(1);
  }
  return contents;
}



/**
 * Function take a URL, and uses axios to read the content of that URL,
 * printing contents to the console
 **/
async function webCat(url) {
  let contents;
  try {
    contents = await axios({ url });
  } catch (err) {
    console.error(`Error fetching ${url}:\n`, err.message);
    process.exit(1);
  }
  return contents.data;
}

/** 
 * Function checks if argument typed in console is a url with "http", 
 * and calls webCat if so. Otherwise, calls cat. 
 * */
async function start() {
  let pathRead;
  let pathWrite;
  if (process.argv[2] === "--out") {
    if (!process.argv[4]) {
      console.error('Please enter a fifth argument')
    }
    else {
      pathRead = process.argv[4];
      pathWrite = process.argv[3];
      let contents = await read(pathRead);
      writeOutput(contents, pathWrite);
    }
  }

  else {
    pathRead = process.argv[2];
    let contents = await read(pathRead);
    console.log(contents);
  }
}



async function read(pathRead) {
  let contents;
  if (pathRead.startsWith("http")) {
    contents = await webCat(pathRead);
  } else {
    contents = await cat(pathRead);
  }
  return contents;
}

async function writeOutput(contents, pathWrite) {
  try {
    await fsP.writeFile(pathWrite, contents, "utf8");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

start();
