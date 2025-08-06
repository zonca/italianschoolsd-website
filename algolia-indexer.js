const algoliasearch = require("algoliasearch");
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
);
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

const searchFile = path.join(__dirname, "dist", "search.json");
let records = JSON.parse(fs.readFileSync(searchFile, "utf8"));

// Add DocSearch hierarchy fields to each record
records = records.map((record) => {
  const dom = new JSDOM(record.content);
  const h1 = dom.window.document.querySelector("h1");
  const h2 = dom.window.document.querySelector("h2");
  return {
    ...record,
    hierarchy: {
      lvl0: record.title || "Untitled",
      lvl1: h1 ? h1.textContent : null,
      lvl2: h2 ? h2.textContent : null,
      lvl3: null,
      lvl4: null,
      lvl5: null,
      lvl6: null,
    },
  };
});

// Clear index first, then add new records
index
  .clearObjects()
  .then(() => {
    console.log("Index cleared.");
    return index.saveObjects(records, {
      autoGenerateObjectIDIfNotExist: true,
    });
  })
  .then(({ objectIDs }) => {
    console.log(`Finished indexing ${objectIDs.length} records.`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
