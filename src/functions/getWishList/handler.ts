// import type { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { DynamoDB } from "aws-sdk";

//TODO: we need to figure out what this needs to be as a return without the schema
const getWishList: any = async (event) => {
  const dynamo = new DynamoDB();

  const idToFind = event.pathParameters.id;

  if (!idToFind) {
    return formatJSONResponse({
      message: `Id not found within parameters!`,
      statusCode: 400,
    });
  }

  const requestParmas = {
    TableName: "WishlistTable",
    Key: { ID: { S: idToFind } },
  };

  //TODO: If this call returns no data, do not throw an error Just return a message that states that this id does not exist.

  //TODO: create a formatter that will for the data returned from this into a more normalised state.
  const data = await dynamo.getItem(requestParmas).promise();

  if (Object.keys(data).length === 0) {
    return formatJSONResponse({
      message: `Wishlist entry not found!`,
    });
  }

  // Now we know that we have the data back, lets format it into a more readableWay

  const returnObject = {
    PRICE: data.Item.PRICE.N,
    SITE: data.Item.SITE.S,
    ID: data.Item.ID.S,
    NAME: data.Item.NAME.S,
    URL: data.Item.URL.S,
  };

  return formatJSONResponse({
    message: `Wishlist entry found!`,
    data: returnObject,
  });
};

export const main = middyfy(getWishList);
