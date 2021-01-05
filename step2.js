"use strict";

const fsP = require("fs/promises");
const argv = process.argv;
const dns = require("dns");
const axios = require("axios");

/**
 * Function takes a path, and reads the file with that path,
 * printing contents of file
 * */
async function cat(path) {
  try {
    let contents = await fsP.readFile(path, "utf8");
    console.log(contents);
  } catch (err) {
    console.error(`Error reading ${path}:\n`, err.message);
    process.exit(2);
  }
}

/**
 * Function take a URL, and uses axios to read the content of that URL,
 * printing contents to the console
 **/  

 async function webCat(url) {
   try {
     let contents = await axios({url});
     console.log(contents.data);
   } catch (err) {
     console.error(`Error fetching ${url}:\n`, err.message);
    process.exit(1);
   }
 }

 function start() {
   if (argv[2].includes("http")) {
     webCat(argv[2]);
   } else {
     cat(argv[2]);
   }
 }

 start();

 
// Don't know why DNS didnt work
//  dns.lookup(argv[2], function catMethod(err, hostname) {
//   if (err) {
//     console.error(err);
//     cat(argv[2]);
//   } else {
//     console.log('webCat:');
//     webCat(argv[2]);
//   }
//  });
