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

records = records.map((record) => {
  return {
    ...record,
    hierarchy: {
      lvl0: record.section ? record.section.charAt(0).toUpperCase() + record.section.slice(1) : "Page",
      lvl1: record.title || "Untitled",
      lvl2: null,
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
