// import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { DynamoDB } from "aws-sdk";

const deleteWishList: any = async (event) => {
  const dynamo = new DynamoDB();

  const idToFind = event.pathParameters.id;

  if (!idToFind) {
    return formatJSONResponse({
      message: `invalid Id provided!`,
      statusCode: 400,
    });
  }

  const requestParmas = {
    Key: { ID: { S: idToFind } },
    TableName: "WishlistTable",
  };

  const data = await dynamo.getItem(requestParmas).promise();

  if (Object.keys(data).length === 0) {
    return formatJSONResponse({
      message: `Wishlist entry not found!`,
    });
  }

  await dynamo.deleteItem(requestParmas).promise();

  const returnObject = {
    PRICE: data.Item.PRICE.N,
    SITE: data.Item.SITE.S,
    ID: data.Item.ID.S,
    NAME: data.Item.NAME.S,
    URL: data.Item.URL.S,
  };

  return formatJSONResponse({
    message: `Wishlist entry deleted!`,
    data: returnObject,
  });
};

export const main = middyfy(deleteWishList);
