import { middyfy } from "../../libs/lambda";
import { updateWishList } from "./updateWishList";

export const main = middyfy(updateWishList);
