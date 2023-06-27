//@ts-nocheck
import { DynamoDB } from "aws-sdk";
import { deleteWishList } from "./deleteWishList";

jest.mock("aws-sdk");

describe("deleteWishList handler unit tests", () => {
  it("should pass the correctly formatted data into the dynamo delete item funciton when values are valid", async () => {
    const dynamoMock = jest.fn();

    const fakeDynamo = {
      getItem: dynamoMock,
      deleteItem: dynamoMock,
    };

    dynamoMock.mockReturnValueOnce({
      promise: () => Promise.resolve({}),
    });

    DynamoDB.mockImplementation(() => {
      return fakeDynamo;
    });

    await deleteWishList({
      pathParameters: { id: "TestID" },
    });

    expect(dynamoMock).toHaveBeenCalledWith({
      Key: { ID: { S: expect.any(String) } },
      TableName: "WishlistTable",
    });
  });

  it("should return a success response when dynamo confirms wishlist deletion", async () => {
    const dynamoMockDelete = jest.fn();
    const dynamoMockGet = jest.fn();

    const fakeDynamo = {
      getItem: dynamoMockGet,
      deleteItem: dynamoMockDelete,
    };

    dynamoMockDelete.mockReturnValueOnce({
      promise: () => Promise.resolve({}),
    });

    dynamoMockGet.mockReturnValueOnce({
      promise: () => ({
        Item: {
          PRICE: 200000,
          SITE: "testSite@test.com",
          ID: "TestID",
          SITE_NAME: "testSite",
          SITE_URL: "testSite@test.com",
        },
      }),
    });

    DynamoDB.mockImplementation(() => {
      return fakeDynamo;
    });

    const response = await deleteWishList(
      {
        pathParameters: { id: "TestID" },
      },
      {},
      () => {}
    );

    const mockReturnObject = {
      PRICE: 200000,
      SITE: "testSite@test.com",
      ID: "TestID",
      SITE_NAME: "testSite",
      SITE_URL: "testSite@test.com",
    };

    expect(response).toStrictEqual({
      body: JSON.stringify({
        message: `Wishlist entry deleted!`,
        // Dare why does data return an empty object
        data: {},
      }),
      statusCode: 200,
    });
  });
});
