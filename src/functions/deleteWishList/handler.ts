import { middyfy } from "../../libs/lambda";
import { deleteWishList } from "./deleteWishList";

export const main = middyfy(deleteWishList);
