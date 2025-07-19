const algoliasearch = require("algoliasearch");
const fs = require("fs");
const path = require("path");

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
);
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

const searchFile = path.join(__dirname, "dist", "search.json");
const records = JSON.parse(fs.readFileSync(searchFile, "utf8"));

// atomic-algolia seems to be buggy, let's use the official client
index
  .replaceAllObjects(records, {
    autoGenerateObjectIDIfNotExist: true,
  })
  .then(({ objectIDs }) => {
    console.log(`Finished indexing ${objectIDs.length} records.`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
