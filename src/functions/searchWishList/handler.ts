import { middyfy } from "../../libs/lambda";
import { searchWishList } from "./searchWishList";

export const main = middyfy(searchWishList);
