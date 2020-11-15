const db = require("../models/index");

test('check if the model bookings is correctly istantiated', () => {
    expect(db['bookings']).not.toBeNull();
})