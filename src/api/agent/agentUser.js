import api from './../index'
import { axios } from '@/utils/request'

export function get(id) {
  return axios.get('/api/agentManagement/agentUser/' + id);
}
export function getAll(query) {
  return axios.get('/api/agentManagement/agentUser', { params: query });
}
export function add(model) {
  return axios.post('/api/agentManagement/agentUser', model);
}
export function del(id) {
  return axios.delete('/api/agentManagement/agentUser/' + id);
}
export function update(model) {
  return axios.put('/api/agentManagement/agentUser/' + model.id, model);
}
export function setDefault(id) {
  return axios.post('/api/agentManagement/agentUser/' + id);
}