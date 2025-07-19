const algoliasearch = require("algoliasearch");
const atomic = require("atomic-algolia");

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
);

atomic(client, process.env.ALGOLIA_INDEX_NAME, {
  files: "./dist/search.json",
  transform: ({ content, ...rest }) => ({
    ...rest,
    content: content.substring(0, 5000),
  }),
}, (err, result) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log("Finished indexing", result);
});
