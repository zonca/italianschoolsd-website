const algoliasearch = require("algoliasearch");
const atomic = require("atomic-algolia");

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
);

const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

atomic(index, {
  files: "./dist/search.json",
  transform: ({ content, ...rest }) => ({
    ...rest,
    content: content.substring(0, 5000),
  }),
}).then(() => {
  console.log("Finished indexing");
});
