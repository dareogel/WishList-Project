//@ts-nocheck
import { DynamoDB } from "aws-sdk";
import { searchWishList } from "./searchWishList";

jest.mock("aws-sdk");

describe("searchWishList handler unit tests", () => {
  it("should pass", async () => {
    expect(1).toBe(1);
  });
});
