//@ts-nocheck
import { DynamoDB } from "aws-sdk";
import { createWishList } from "./createWishList";

jest.mock("aws-sdk");

describe("createWishList handler unit tests", () => {
  it("should pass the correctly formatted data into the dynamo put item funciton when values are valid", async () => {
    const dynamoMock = jest.fn();

    const fakeDynamo = {
      putItem: dynamoMock,
    };

    dynamoMock.mockReturnValueOnce({
      promise: () => Promise.resolve({}),
    });

    DynamoDB.mockImplementation(() => {
      return fakeDynamo;
    });

    await createWishList(
      {
        body: {
          SITE: "wfwefw",
          SITE_NAME: "fwefweef",
          PRICE: "12342",
          SITE_URL: "wfwefwe",
        },
        headers: {},
      },
      {},
      () => {}
    );

    expect(dynamoMock).toHaveBeenCalledWith({
      Item: {
        ID: { S: expect.any(String) },
        PRICE: { N: "12342" },
        SITE: { S: "wfwefw" },
        SITE_NAME: { S: "fwefweef" },
        SITE_URL: { S: "wfwefwe" },
      },
      TableName: "WishlistTable",
    });
  });

  it("should return a success response when dynamo confirms wishlist creation", async () => {
    const dynamoMock = jest.fn();
    const fakeDynamo = {
      putItem: dynamoMock,
    };
    dynamoMock.mockReturnValueOnce({
      promise: () => Promise.resolve({}),
    });

    DynamoDB.mockImplementation(() => {
      return fakeDynamo;
    });

    const response = await createWishList(
      {
        body: {
          SITE: "wfwefw",
          SITE_NAME: "fwefweef",
          PRICE: "12342",
          SITE_URL: "wfwefwe",
        },
        headers: {},
      },
      {},
      () => {}
    );

    // expect(dynamoMock).toHaveBeenCalledWith({
    //   Item: {
    //     ID: { S: expect.any(String) },
    //     PRICE: { N: "12342" },
    //     SITE: { S: "wfwefw" },
    //     SITE_NAME: { S: "fwefweef" },
    //     SITE_URL: { S: "wfwefwe" },
    //   },
    //   TableName: "WishlistTable",
    // });

    expect(response).toStrictEqual({
      body: JSON.stringify(
        {
          message: `wishlist created`,
          id: "CreatWishListTestID",
        },
        function (_, value) {
          return value === "CreatWishListTestID"
            ? JSON.parse(response.body).id
            : value;
        }
      ),
      statusCode: 201,
    });
    // expect(dynamoMock).toHaveBeenCalledWith({
    //   Item: {
    //     ID: { S: expect.any(String) },
    //     PRICE: { N: "12342" },
    //     SITE: { S: "wfwefw" },
    //     SITE_NAME: { S: "fwefweef" },
    //     SITE_URL: { S: "wfwefwe" },
    //   },
    //   TableName: "WishlistTable",
    // });
  });
});
