import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
    .get(baseUrl)
    .then(response => response.data)
}

const addPerson = (person) => {
    return axios
    .post(baseUrl, person)
    .then(response => response.data)
}

const deletePerson = (id) => {
    return axios
    .delete(`${baseUrl}/${id}`)
}

const replaceNumber = (id, newPerson) => {
    return axios.
    put(`${baseUrl}/${id}`, newPerson)
    .then(response => response.data)
}

export default {getAll, addPerson, deletePerson, replaceNumber}