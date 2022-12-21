import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
const updateWishList = async (event) => {
    return formatJSONResponse({
        message: `This function updates a wish list by id`,
        event,
    });
};
export const main = middyfy(updateWishList);
//# sourceMappingURL=handler.js.map