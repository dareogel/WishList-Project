import { middyfy } from "../../libs/lambda";
import { createWishList } from "./createWishList";

export const main = middyfy(createWishList);
