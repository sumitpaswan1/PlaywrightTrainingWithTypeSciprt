/*
Test: create booking
Request type: POST
Request body: Static

Add URL to playwright.config.ts file
baseURL: 'https://restful-booker.herokuapp.com'
*/

import { test, expect } from "@playwright/test";

test("create the static body", async ({ request }) => {

    // Create request body
    const requestBody = {

        firstname: "Jims",
        lastname: "Browns",
        totalprice: 1000,
        depositpaid: true,

        bookingdates: {
            checkin: "2025-07-01",
            checkout: "2025-07-05",
        },

        additionalneeds: "super bowls",
    };

    // Send POST request
    const response = await request.post("/booking", {
        data: requestBody,
    });

    // Extract response body
    const responseBody = await response.json();

    // Validate status code
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Validate response body attributes
    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");

    // Validate booking details
    const booking = responseBody.booking;

    expect(booking).toMatchObject({

        firstname: "Jims",
        lastname: "Browns",
        totalprice: 1000,
        depositpaid: true,
        additionalneeds: "super bowls",

    });

    // Validate booking dates
    expect(booking.bookingdates).toMatchObject({

        checkin: "2025-07-01",
        checkout: "2025-07-05",

    });

});