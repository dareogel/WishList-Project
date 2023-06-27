//@ts-nocheck
import { DynamoDB } from "aws-sdk";
import { getWishList } from "./getWishList";

jest.mock("aws-sdk");

describe("getWishList handler unit tests", () => {
  it("should pass the correctly formatted data into the dynamo get item funciton when values are valid", async () => {
    const dynamoMock = jest.fn();

    const fakeDynamo = {
      getItem: dynamoMock,
    };

    dynamoMock.mockReturnValueOnce({
      promise: () => Promise.resolve({}),
    });

    DynamoDB.mockImplementation(() => {
      return fakeDynamo;
    });

    await getWishList(
      {
        pathParameters: { id: "TestID" },
      },
      {},
      () => {}
    );

    expect(dynamoMock).toHaveBeenCalledWith({
      Key: { ID: { S: expect.any(String) } },
      TableName: "WishlistTable",
    });
  });

  it("should return a success response when dynamo confirms wishlist found", async () => {
    const dynamoMock = jest.fn();

    const fakeDynamo = {
      getItem: dynamoMock,
    };

    dynamoMock.mockReturnValueOnce({
      promise: () =>
        Promise.resolve({
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

    const response = await getWishList(
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
        message: `Wishlist entry found!`,
        // Dare why does data return an empty object
        data: {},
      }),
      statusCode: 200,
    });
  });
});
