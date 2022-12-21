import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { DynamoDB } from "aws-sdk";
import schema from "./schema";

const updateWishList: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const dynamo = new DynamoDB();

  const idToFind = event.pathParameters.id;

  if (!idToFind) {
    return formatJSONResponse({
      message: `Id not found within parameters!`,
      statusCode: 400,
    });
  }

  const updates = Object.keys(event.body);
  const allowedUpdates = ["SITE", "NAME", "PRICE", "URL"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return formatJSONResponse({
      message: `Invalid update request`,
      statusCode: 400,
    });
  }

  try {
    // let expression = {
    //   UpdateExpression: "SET",
    //   ExpressionAttributeValues: {},
    // };

    // updates.forEach((update) => {
    //   expression.UpdateExpression += ` #${update} = :${update},`;
    //   expression.ExpressionAttributeValues[update] = update;
    // });

    const requestParmas = {
      TableName: "WishlistTable",
      Key: { ID: { S: idToFind } },
      // ...expression,
      UpdateExpression: `SET SITE = :site`,
      ExpressionAttributeValues: {
        ":site": { S: event.body.SITE },
      },
    };

    const data = await dynamo.updateItem(requestParmas).promise();

    return formatJSONResponse({
      message: `WishList item successfully updated!`,
      statusCode: 200,
      data,
    });
  } catch (error) {
    return formatJSONResponse({
      message: `wishlist update unsuccessful`,
      statusCode: 400,
      error,
    });
  }
};

export const main = middyfy(updateWishList);
