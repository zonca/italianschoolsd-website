const algoliasearch = require("algoliasearch");
const fs = require("fs");

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
);
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

const records = JSON.parse(fs.readFileSync("./dist/search.json", "utf8"));

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
