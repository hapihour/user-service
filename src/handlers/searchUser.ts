import * as AWS from 'aws-sdk';
import {IUser} from '../common/interaces';
import {buildUserIndex} from '../common/algolia';
import {Response as AlgoliaResponse} from 'algoliasearch';

export const handler = async (event, context, callback) => {
  const query = event.queryStringParameters.q;
  const response = await queryForUser(query);

  callback(null, { body: JSON.stringify(response) });
};

const queryForUser = async (query: string): Promise<AlgoliaResponse> => {
  const userIndex = buildUserIndex();
  const response: AlgoliaResponse = await userIndex.search({query});

  return response;
};
