import api from './../index'
import { axios } from '@/utils/request'

export function get(id) {
    return axios.get('/api/agentManagement/notice/' + id);
}
export function getAll(query) {
    return axios.get('/api/agentManagement/notice', { params: query });
}
export function add(model) {
    return axios.post('/api/agentManagement/notice', model);
}
export function del(id) {
    return axios.delete('/api/agentManagement/notice/' + id);
}
export function update(model) {
    return axios.put('/api/agentManagement/notice/' + model.id, model);
}