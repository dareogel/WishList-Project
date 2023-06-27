import { formatJSONResponse } from "../../libs/api-gateway";

import { DynamoDB } from "aws-sdk";
import { getWishListItem } from "../../libs/getWishListItem";

//TODO: create the type for the event.
export const updateWishList = async (event: any) => {
  const dynamo = new DynamoDB();

  const idToFind = event.pathParameters.id;

  if (!idToFind) {
    return formatJSONResponse(
      {
        message: `Id not found within parameters!`,
      },
      400
    );
  }

  const updates = Object.keys(event.body);
  const allowedUpdates = ["SITE", "PRICE", "SITE_URL", "SITE_NAME"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return formatJSONResponse(
      {
        message: `Invalid update request`,
      },
      400
    );
  }

  try {
    let expressionString = `SET `;
    const expressionAttributeValues = {};

    updates.forEach((update, index) => {
      expressionString += `${update} = :${update.toLocaleLowerCase()}`;

      //Because it can either be a number or a string we need to test this, you need to add any number types into this array
      const numberExpressions = ["PRICE"];

      // check the type from the above array to see what prop type is required
      const propType = numberExpressions.includes(update) ? "N" : "S";

      // add the attribute values into the object
      expressionAttributeValues[`:${update.toLocaleLowerCase()}`] = {
        [propType]: event.body[update].toString(),
      };

      // if it is not the last item in the array then put a commer at the end.
      if (index !== updates.length - 1) {
        expressionString += `, `;
      }
    });

    // console.log("EXPRESSION STRING", expressionString);
    // console.log(
    //   "EXPRESSION ATTRIBUTES",
    //   JSON.stringify(expressionAttributeValues)
    // );

    const requestParmas = {
      TableName: "WishlistTable",
      Key: { ID: { S: idToFind } },
      // ...expression,
      UpdateExpression: expressionString,
      ExpressionAttributeValues: expressionAttributeValues,
    };

    await dynamo.updateItem(requestParmas).promise();

    const data = await getWishListItem(idToFind);

    return formatJSONResponse(
      {
        message: `WishList item successfully updated!`,
        data,
      },
      200
    );
  } catch (error) {
    return formatJSONResponse(
      {
        message: `wishlist update failed`,
        error,
      },
      400
    );
  }
};
