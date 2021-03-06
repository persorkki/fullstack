import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const create = (input) => {
    const request =
        axios.post(baseUrl, input)
    return request.then(res => res.data)
}

const getAll = () => {
    const request =
        axios.get(baseUrl)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request =
        axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, person) => {
    const request =
        axios.put(`${baseUrl}/${id}`, person)
    return request.then(response => response.data)
}

export default { create, getAll, deletePerson, update}