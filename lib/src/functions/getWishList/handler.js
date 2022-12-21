import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { DynamoDB } from "aws-sdk";
const getWishList = async (event) => {
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
  const data = await dynamo.getItem(requestParmas).promise();
  if (Object.keys(data).length === 0) {
    return formatJSONResponse({
      message: `Wishlist entry not found!`,
    });
  }
  return formatJSONResponse({
    message: `Wishlist entry found!`,
    data,
  });
};
export const main = middyfy(getWishList);
//# sourceMappingURL=handler.js.map
