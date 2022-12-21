import axios from "axios";
import config from "../config";

describe("getWishList Int Tests", () => {
  type wishlistDataProps = {
    data: {
      id: string;
    };
  };

  let wishlistData: wishlistDataProps;

  const event = {
    NAME: "CreateTest",
    SITE: "CreateTestSite",
    PRICE: "7357",
    URL: "www.CreateTestSite.com",
  };

  beforeAll(async () => {
    const { data } = await axios({
      url: `${config.API_URL}wishlist`,
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify(event),
    });

    wishlistData = data;
  });
  it("should make a request with correct parameters", async () => {
    const { status, data } = await axios({
      url: `${config.API_URL}wishlist/${wishlistData.data.id}`,
      method: "GET",
    });

    expect(status).toBe(200);
    expect(data.message).toBe("Wishlist entry found!");
    const expectedReturnItem = {
      ...event,
      ID: wishlistData.data.id,
    };

    expect(data.data).toEqual(expectedReturnItem);
  });

  it("should return an error if the id we pass in does not exist", async () => {
    const { status, data } = await axios({
      url: `${config.API_URL}wishlist/123`,
      method: "GET",
    });

    expect(status).toBe(200);
    expect(data.message).toBe("Wishlist entry not found!");
    expect(data.data).toBeUndefined();
  });
});
