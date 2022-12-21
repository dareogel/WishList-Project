import config from "../config";
import axios from "axios";

describe("createWishList Integration Test", () => {
  let id = "";

  afterAll(async () => {
    await axios({
      url: `${config.API_URL}wishlist/${id}`,
      method: "DELETE",
    });
  });

  it("should make a request with correct parameters", async () => {
    const event = {
      NAME: "Testt",
      SITE: "TestSite",
      PRICE: "7357",
      URL: "www.TestSite.com",
    };

    const { status, data } = await axios({
      url: `${config.API_URL}wishlist`, // need to change when base path is sorted
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify(event),
    });

    id = data.data.id;

    expect(status).toBe(200);

    expect(data.data.message).toBe("wishlist created");

    // We are checking that the id exists
    expect(data.data.id.length).toBeGreaterThan(1);

    // Now that we have created the data we use the get endpoint to make sure that it is correct
    const { status: status2, data: data2 } = await axios({
      url: `${config.API_URL}wishlist/${data.data.id}`, // need to change when base path is sorted
      method: "GET",
    });

    expect(status2).toBe(200);

    expect(data2.message).toBe("Wishlist entry found!");

    const expectedReturnItem = {
      ...event,
      ID: data.data.id,
    };

    // Check that the data is correct
    expect(data2.data).toEqual(expectedReturnItem);
  });
});
