function generateUser() {
    const date = Date.now();
    return {
        name: `user${date}`,
        email: `${date}@gmail.com`
    };
};
module.exports = { generateUser }
