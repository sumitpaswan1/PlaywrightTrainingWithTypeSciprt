import { test, expect } from '@playwright/test';

test('GET API Request - 04', async ({ request }) => {

    const bookingId = 8864; // path parameter

    // Sending GET request along with path parameter
    const response = await request.get(`/booking/${bookingId}`);

    const responseBody = await response.json();

    console.log(responseBody);

    // Assertions
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

});

test('get booking details with query parameters', async ({ request }) => {

    const firstname = 'Jim';
    const lastname = 'Brown';
    
    //sending the post request
    const response = await request.get("/booking",{params:{firstname,lastname}});

    //parse the response and print
    const responseBody = await response.json();
    console.log(responseBody);

    //add assertions
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    //check response body is not empty
    expect(responseBody.length).toBeGreaterThan(0);

    //fetch all booking ids from the response and print
    for(const item of responseBody){

        expect(item).toHaveProperty('bookingid');
        expect(typeof item.bookingid).toBe("number");
        expect(item.bookingid).toBeGreaterThan(0);
    }

});