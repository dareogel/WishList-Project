import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const searchWishList: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  return formatJSONResponse({
    message: `This function searches a wishlist by name site or price`,
    event,
  });
};

export const main = middyfy(searchWishList);
