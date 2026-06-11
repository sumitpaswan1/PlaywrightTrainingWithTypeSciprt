import { test, expect} from '@playwright/test';
import fs from 'fs';


test("create the post request body using json file", async ({ request }) => {

    // Read request body from JSON file
    const jsonFile = "testdata/post_request_body.json";
    const requestBody = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));

    //send POST request
    const response = await request.post("/booking", {data : requestBody});
    const responseBody = await response.json();

    //validate status code
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    //validate response body attributes
    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");
    expect(responseBody).toHaveProperty("booking.additionalneeds");

    //validate booking details
    const booking = responseBody.booking;
    expect(booking).toMatchObject({

        firstname: requestBody.firstname,
        lastname: requestBody.lastname,
        totalprice: requestBody.totalprice,
        depositpaid: requestBody.depositpaid,
        additionalneeds: requestBody.additionalneeds,
    })

    //validate booking dates
    expect(booking.bookingdates).toMatchObject({

        checkin: requestBody.bookingdates.checkin,
        checkout: requestBody.bookingdates.checkout,
    })



})