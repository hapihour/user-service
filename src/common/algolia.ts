import algoliasearch from 'algoliasearch';

export const buildUserIndex = () => {
  const algoliaApp = process.env.ALGOLIA_APP_ID!;
  const algoliaUserIndex = process.env.ALGOLIA_USER_INDEX!;
  const algoliaToken = process.env.ALGOLIA_TOKEN!;
  const client = algoliasearch(algoliaApp, algoliaToken);
  const index = client.initIndex(algoliaUserIndex);

  return index;
}
