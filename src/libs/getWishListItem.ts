import { DynamoDB } from "aws-sdk";

export async function getWishListItem(id: string) {
  if (!id) {
    return null;
  }
  const dynamo = new DynamoDB();

  const requestParmas = {
    TableName: "WishlistTable",
    Key: { ID: { S: id } },
  };

  const data = await dynamo.getItem(requestParmas).promise();

  if (Object.keys(data).length === 0) {
    return null;
  }

  return {
    PRICE: data.Item.PRICE.N,
    SITE: data.Item.SITE.S,
    ID: data.Item.ID.S,
    SITE_NAME: data.Item.SITE_NAME.S,
    SITE_URL: data.Item.SITE_URL.S,
  };
}
