const db = require("../models")

test('check if the model bookings is correctly istantiated', () => {
    expect(db['bookings']).not.toBeNull();
})
test('check if the model users is correctly istantiated', () => {
    expect(db['users']).not.toBeNull();
})