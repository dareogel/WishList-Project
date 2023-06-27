import axios from "axios";
import config from "../config";

describe("updateWishList Integration Tests", () => {
  type wishlistDataProps = {
    data: {
      id: string;
    };
  };

  let wishlistData: wishlistDataProps;

  const event = {
    SITE_NAME: "UpdateTest",
    SITE: "CreateTestSite",
    PRICE: "7357",
    SITE_URL: "www.CreateTestSite.com",
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

  afterAll(async () => {
    await axios({
      url: `${config.API_URL}wishlist/${wishlistData.data.id}`,
      method: "DELETE",
    });
  });

  it("should succesfully update the fields of the wishlist item", async () => {
    const wishListUpdateEvent = {
      SITE: "UpdatedSite",
      PRICE: "1111",
      SITE_NAME: "UpdatedName",
      SITE_URL: "www.Updatedurl.com",
    };

    const { status, data } = await axios({
      url: `${config.API_URL}wishlist/${wishlistData.data.id}`,
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify(wishListUpdateEvent),
    });

    expect(status).toBe(200);
    expect(data.message).toBe("WishList item successfully updated!");
    const expectedReturnItem = {
      ...wishListUpdateEvent,
      ID: wishlistData.data.id,
    };
    expect(data.data).toEqual(expectedReturnItem);
  });
  it("should succesfully update the fields of the wishlist item", async () => {
    const wishListUpdateEvent = {
      SITE: "UpdatedSite",
      PRICE: "1111",
      FAKE: "FAKETEST",
    };

    const { status, data } = await axios({
      url: `${config.API_URL}wishlist/${wishlistData.data.id}`,
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify(wishListUpdateEvent),
    });

    expect(status).toBe(200);
    expect(data.message).toBe("Invalid update request");
    expect(data.statusCode).toBe(400);
  });
});
