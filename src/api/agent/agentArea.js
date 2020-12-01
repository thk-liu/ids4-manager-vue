import api from './../index'
import { axios } from '@/utils/request'

export function getAll() {
  var query = { maxResultCount: 10 };
  return axios.get('/api/agentManagement/agentArea/withHead');
}
export function add(model) {
  return axios.post('/api/agentManagement/agentArea', model);
}

export function del(id) {
  return axios.delete('/api/agentManagement/agentArea/' + id);
}
export function update(model) {
  return axios.put('/api/agentManagement/agentArea/' + model.id, model);
}
export function getTreeData() {
  return axios.get('/api/agentManagement/agentArea/treeData');
}

