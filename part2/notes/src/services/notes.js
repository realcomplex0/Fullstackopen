import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = (setErrorMessage) => {
    return axios.get(baseUrl)
    .then(response => {
            console.log(response.data)
            return response.data
        }
    )
    .catch(error => {
        setErrorMessage('Something went wrong...')
        setTimeout(() => {setErrorMessage(null)}, 5000)
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