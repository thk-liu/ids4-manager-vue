import api from './../index'
import { axios } from '@/utils/request'

export function getAll() {
    // return axios.get('/api/agentManagement/agentCategory');
    return axios.get('/api/agentManagement/agentCategory/withHead');
}
export function add(model) {
    return axios.post('/api/agentManagement/agentCategory', model);
}
export function del(id) {
    return axios.delete('/api/agentManagement/agentCategory/' + id);
}
export function update(model) {
    let id = model.id;
    // delete model.id;
    return axios.put('/api/agentManagement/agentCategory/' + id, model);
}

export function getTreeData() {
    return axios.get('/api/agentManagement/agentCategory/treeData');
}