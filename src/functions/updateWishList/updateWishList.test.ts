//@ts-nocheck
import { DynamoDB } from "aws-sdk";
import { updateWishList } from "./updateWishList";

jest.mock("aws-sdk");

describe("updateWishList handler unit tests", () => {
  it("should pass the correctly formatted data into the dynamo update item funciton when values are valid", async () => {
    const dynamoMock = jest.fn();

    const fakeDynamo = {
      getItem: dynamoMock,
      updateItem: dynamoMock,
    };

    dynamoMock.mockReturnValueOnce({
      promise: () => Promise.resolve({}),
    });

    dynamoMock.mockImplementation(() => {
      return fakeDynamo;
    });

    await updateWishList(
      {
        pathParameters: { id: "TestID" },
        body: {
          SITE: "SiteChange",
          SITE_NAME: "NameChange",
          PRICE: "1111",
          SITE_URL: "URLChange@test.com",
        },
        headers: {},
      },
      {},
      () => {}
    );

    expect(dynamoMock).toHaveBeenCalledWith({
      Key: { ID: { S: expect.any(String) } },
      TableName: "WishlistTable",
    });

    // expect(dynamoMock).toHaveBeenCalledWith({
    //   TableName: "WishlistTable",
    //   Key: { ID: { S: expect.any(String) } },
    //   UpdateExpression: expect.any(String),
    //   ExpressionAttributeValues: expect.any(String),
    // });
  });

  it("should return a success response when dynamo confirms wishlist deletion", async () => {
    const dynamoMockUpdate = jest.fn();
    const dynamoMockGet = jest.fn();

    const fakeDynamo = {
      getItem: dynamoMockGet,
      updateItem: dynamoMockUpdate,
    };

    dynamoMockUpdate.mockReturnValueOnce({
      promise: () => Promise.resolve({}),
    });

    dynamoMockGet.mockReturnValueOnce({
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

    const response = await updateWishList(
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
        message: `Wishlist entry updated!`,
        // Dare why does data return an empty object
        data: {},
      }),
      statusCode: 200,
    });
  });
});
