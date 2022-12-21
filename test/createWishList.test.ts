import { main } from "../src/functions/createWishList/handler";

describe("makeThirdPartyServiceRequest", () => {
  it("should make a request with correct parameters", async () => {
    const event = {
      body: JSON.stringify({
        NAME: "Shares2",
        SITE: "Invonra2",
        PRICE: "9000",
        URL: "www.invonra.com",
      }),
    };

    const actual = await main(event);

    expect(actual).toHaveBeenCalledWith({
      statusCode: 201,
    });
  });
});
