import api from './../index'
import { axios } from '@/utils/request'

export function get(id) {
  return axios.get('/api/agentManagement/receivingAddress/' + id);
}
export function getAll(query) {
  return axios.get('/api/agentManagement/receivingAddress', { params: query });
}
export function add(model) {
  return axios.post('/api/agentManagement/receivingAddress', model);
}
export function del(id) {
  return axios.delete('/api/agentManagement/receivingAddress/' + id);
}
export function update(model) {
  return axios.put('/api/agentManagement/receivingAddress/' + model.id, model);
}
export function setDefault(id) {
  return axios.post(`/api/agentManagement/receivingAddress/${id}/setDefault`);
}
