import api from './../index'
import { axios } from '@/utils/request'

export function get(id) {
    return axios.get('/api/agentManagement/agent/' + id);
}
export function getAll(query) {
    console.log(query);
    return axios.get('/api/agentManagement/agent', { params: query });
}
export function add(model) {
    return axios.post('/api/agentManagement/agent', model);
}
export function del(id) {
    return axios.delete('/api/agentManagement/agent/' + id);
}

export function update(model) {
    return axios.put('/api/agentManagement/agent/' + model.id, model);
}
export function setAgentActive(model) {
    return axios.post('/api/agentManagement/agent/' + model.id + '/setAgentActive?active=' + model.active);
}

export function importAgent(file) {
    return axios.post('api/agentManagement/agent/import', file);
}