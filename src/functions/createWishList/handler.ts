import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONResponse,
} from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { DynamoDB } from "aws-sdk";

import schema from "./schema";

const createWishList: ValidatedEventAPIGatewayProxyEvent<
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
    const { SITE, NAME, PRICE, URL } = event.body;

    const requestParmas = {
      TableName: "WishlistTable",
      Item: {
        ID: { S: generatedId },
        SITE: { S: SITE || "" },
        NAME: { S: NAME || "" },
        PRICE: { N: PRICE || "" },
        URL: { S: URL || "" },
      },
    };

    await dynamo.putItem(requestParmas).promise();

    return formatJSONResponse({
      data: { message: `wishlist created`, id: generatedId },
      statusCode: 201,
    });
  } catch (error) {
    return formatJSONResponse({
      message: `wishlist creation unsuccessful`,
      statusCode: 400,
      error,
    });
  }
};

export const main = middyfy(createWishList);
