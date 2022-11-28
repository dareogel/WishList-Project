import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const updateWishList: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  return formatJSONResponse({
    message: `This function updates a wish list by id`,
    event,
  });
};

export const main = middyfy(updateWishList);
