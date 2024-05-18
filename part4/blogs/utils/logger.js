const info = (...message) => {
    if(process.env.ENV_MODE !== 'test')
        console.log(...message)
}

const error = (...error) => {
    //if(process.env.ENV_MODE !== 'test')
    console.log(...error)
}

module.exports = {
    info, error
}