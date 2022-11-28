import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const deleteWishList: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  return formatJSONResponse({
    message: `This function deletes all or deletes a wish list by id`,
    event,
  });
};

export const main = middyfy(deleteWishList);
