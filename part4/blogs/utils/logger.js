const info = (...message) => {
    console.log(...message)
}

const error = (...error) => {
    console.log(...error)
}

module.exports = {
    info, error
}