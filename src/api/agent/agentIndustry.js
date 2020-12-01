import api from './../index'
import { axios } from '@/utils/request'

export function getAll() {
  return axios.get('/api/agentManagement/agentIndustry');
}
export function add(model) {
  return axios.post('/api/agentManagement/agentIndustry', model);
}
export function del(id) {
  return axios.delete('/api/agentManagement/agentIndustry/' + id);
}
export function update(model) {
  let id = model.id;
  // delete model.id;
  return axios.put('/api/agentManagement/agentIndustry/' + id, model);
}

