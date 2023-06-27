// import type { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "../../libs/api-gateway";

import { getWishListItem } from "../../libs/getWishListItem";

//TODO: we need to figure out what this needs to be as a return without the schema
export const getWishList: any = async (event) => {
  const idToFind = event.pathParameters.id;

  if (!idToFind) {
    return formatJSONResponse(
      {
        message: `Id not found within parameters!`,
      },
      400
    );
  }

  const data = await getWishListItem(idToFind);

  if (!data) {
    return formatJSONResponse(
      {
        message: `Wishlist entry not found!`,
      },
      404
    );
  }

  // Now we know that we have the data back, lets format it into a more readableWay

  return formatJSONResponse(
    {
      message: `Wishlist entry found!`,
      data: data,
    },
    200
  );
};
