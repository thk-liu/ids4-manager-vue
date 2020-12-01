import { axios } from '@/utils/request'
import server from '@/utils/server'


export function get(id) {
    return axios.get(`api/identity-server/api-resources/${id}`)
}

export function getAll(query) {
    return axios.get('/api/identity-server/api-resources', { params: query })
}
export function create(model) {
    return axios.post('/api/identity-server/api-resources', model)
}

export function update(id, model) {
    return axios.put(`/api/identity-server/api-resources/${id}`, model)
}

export function del(id) {
    return axios.delete(`api/identity-server/api-resources/${id}`)
}