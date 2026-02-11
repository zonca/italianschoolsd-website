const algoliasearch = require("algoliasearch");
const fs = require("fs");
const path = require("path");

const requiredEnv = ["ALGOLIA_APP_ID", "ALGOLIA_ADMIN_KEY", "ALGOLIA_INDEX_NAME"];
const missing = requiredEnv.filter((k) => !process.env[k]);
if (missing.length) {
  console.log(`Skipping Algolia indexing: missing env var(s): ${missing.join(", ")}`);
  process.exit(0);
}

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
);
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

const searchFile = path.join(__dirname, "dist", "search.json");
if (!fs.existsSync(searchFile)) {
  console.log("Skipping Algolia indexing: dist/search.json not found");
  process.exit(0);
}
let records = JSON.parse(fs.readFileSync(searchFile, "utf8"));

records = records.map((record) => {
  const title = record.title || record.lvl0 || "Untitled";
  const sectionLabel = record.section
    ? record.section.charAt(0).toUpperCase() + record.section.slice(1)
    : "Page";
  const lvl1 = record.lvl1 || title;

  return {
    ...record,
    // Keep ranking fields numeric for customRanking.
    publishdate: Number(record.publishdate) || 0,
    lastmod: Number(record.lastmod) || 0,
    type: "lvl1",
    lvl1,
    hierarchy: {
      lvl0: sectionLabel,
      lvl1: title,
      lvl2: record.lvl2 || null,
      lvl3: record.lvl3 || null,
      lvl4: record.lvl4 || null,
      lvl5: record.lvl5 || null,
      lvl6: record.lvl6 || null,
    },
  };
});

// Prefer more recent content after textual relevance.
index
  .setSettings({
    customRanking: ["desc(publishdate)", "desc(lastmod)"],
  })
  .then(() => {
    console.log("Index settings updated.");
    // Clear index first, then add new records
    return index.clearObjects();
  })
  .then(() => {
    console.log("Index cleared.");
    return index.saveObjects(records, {
      autoGenerateObjectIDIfNotExist: true,
    });
  })
  .then(({objectIDs}) => {
    console.log(`Finished indexing ${objectIDs.length} records.`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
