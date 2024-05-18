require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = (process.env.NODE_ENV == 'dev' ? process.env.MONGODB_URI : process.env.MONGODB_TEST_URI)

console.log('MONGODB_URI', MONGODB_URI)

module.exports = {
    PORT, MONGODB_URI
}