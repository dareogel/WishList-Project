import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";

import schema from "./schema";

export const searchWishList: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  return formatJSONResponse(
    {
      message: `This function searches a wishlist by name site or price`,
      event,
    },
    200
  );
};
