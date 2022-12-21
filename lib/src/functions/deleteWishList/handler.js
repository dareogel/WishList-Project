import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
const deleteWishList = async (event) => {
    return formatJSONResponse({
        message: `This function deletes all or deletes a wish list by id`,
        event,
    });
};
export const main = middyfy(deleteWishList);
//# sourceMappingURL=handler.js.map