import { middyfy } from "../../libs/lambda";
import { getWishList } from "./getWishList";

export const main = middyfy(getWishList);
