// import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "../../libs/api-gateway";
import { DynamoDB } from "aws-sdk";

export const deleteWishList: any = async (event) => {
  const dynamo = new DynamoDB();

  const idToFind = event.pathParameters.id;

  if (!idToFind) {
    return formatJSONResponse(
      {
        message: `invalid Id provided!`,
      },
      400
    );
  }

  const requestParmas = {
    Key: { ID: { S: idToFind } },
    TableName: "WishlistTable",
  };

  const data = await dynamo.getItem(requestParmas).promise();

  if (Object.keys(data).length === 0) {
    return formatJSONResponse(
      {
        message: `Wishlist entry not found!`,
      },
      404
    );
  }

  await dynamo.deleteItem(requestParmas).promise();

  const returnObject = {
    PRICE: data.Item.PRICE.N,
    SITE: data.Item.SITE.S,
    ID: data.Item.ID.S,
    SITE_NAME: data.Item.SITE_NAME.S,
    SITE_URL: data.Item.SITE_URL.S,
  };

  return formatJSONResponse(
    {
      message: `Wishlist entry deleted!`,
      data: returnObject,
    },
    200
  );
};
