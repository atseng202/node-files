"use strict";

const fsP = require("fs/promises");
const path = process.argv[2];
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
  console.log(contents);
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
  console.log(contents.data);
}

/** 
 * Function checks if argument typed in console is a url with "http", 
 * and calls webCat if so. Otherwise, calls cat. 
 * */
function start() {
  if (path.startsWith("http")) {
    webCat(path);
  } else {
    cat(path);
  }
}

start();
