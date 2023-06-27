import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONResponse,
} from "../../libs/api-gateway";

import { DynamoDB } from "aws-sdk";

import schema from "./schema";

export const createWishList: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const dynamo = new DynamoDB();

  const generateId = () => {
    return (
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    );
  };

  const generatedId = generateId();

  try {
    const { SITE, SITE_NAME, PRICE, SITE_URL } = event.body;

    const requestParmas = {
      TableName: "WishlistTable",
      Item: {
        ID: { S: generatedId },
        SITE: { S: SITE || "" },
        SITE_NAME: { S: SITE_NAME || "" },
        PRICE: { N: PRICE || "" },
        SITE_URL: { S: SITE_URL || "" },
      },
    };

    await dynamo.putItem(requestParmas).promise();

    return formatJSONResponse(
      {
        message: `wishlist created`,
        id: generatedId,
      },
      201
    );
  } catch (error) {
    return formatJSONResponse(
      {
        message: `wishlist creation unsuccessful`,
        error,
      },
      400
    );
  }
};
