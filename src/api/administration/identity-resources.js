import { axios } from '@/utils/request'
import server from '@/utils/server'

export function getAll(query) {
    return axios.get('/api/identity-server/identity-resources', { params: query })
}

export function get(id) {
    return axios.get(`/api/identity-server/identity-resources/${id}`)
}

export function update(id, model) {
    return axios.put(`/api/identity-server/identity-resources/${id}`, model)
}

export function create(model) {
    return axios.post(`/api/identity-server/identity-resources`, model)
}

export function del(id) {
    return axios.delete(`/api/identity-server/identity-resources/${id}`)
}