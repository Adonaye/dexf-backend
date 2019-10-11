const mongoose = require('mongoose');
const UserController = require('./user_controller');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
});

test('Instantiates a user', async () => {
    const user = await UserController.create("1", "juan", "1234", "5678");
    const fetchedUser = await UserController.findById("1");
    expect(user).toEqual(fetchedUser);
});