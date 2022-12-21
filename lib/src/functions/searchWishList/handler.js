import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
const searchWishList = async (event) => {
    return formatJSONResponse({
        message: `This function searches a wishlist by name site or price`,
        event,
    });
};
export const main = middyfy(searchWishList);
//# sourceMappingURL=handler.js.map