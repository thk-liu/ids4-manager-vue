import api from './../index'
import { axios } from '@/utils/request'

export function getAll() {
  return axios.get('/api/agentManagement/agentLevel');
}
export function add(model) {
  return axios.post('/api/agentManagement/agentLevel', model);
}
export function del(id) {
  return axios.delete('/api/agentManagement/agentLevel/' + id);
}
export function update(model) {
  let id = model.id;
  // delete model.id;
  return axios.put('/api/agentManagement/agentLevel/' + id, model);
}

