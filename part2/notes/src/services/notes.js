import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    const fake = {
        id: 10000,
        content: 'Save on ze server bitch',
        important: true
    }
    return axios.get(baseUrl)
    .then(response => response.data.concat(fake))
    .catch(error => {
        console.log('caught this bitch: ', error);
    })
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
    .then(response => response.data)
}

export default {getAll, create, update}