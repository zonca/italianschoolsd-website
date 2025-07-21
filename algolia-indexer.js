const algoliasearch = require("algoliasearch");
const fs = require("fs");
const path = require("path");

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
);
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

const searchFile = path.join(__dirname, "dist", "search.json");
let records = JSON.parse(fs.readFileSync(searchFile, "utf8"));

// Add DocSearch hierarchy fields to each record
records = records.map((record) => ({
  ...record,
  lvl0: record.title || "",
  lvl1: "",
  lvl2: "",
  lvl3: "",
  lvl4: "",
  lvl5: "",
  lvl6: ""
}));

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
