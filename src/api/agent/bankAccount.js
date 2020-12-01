import api from './../index'
import { axios } from '@/utils/request'

export function get(id){
  return axios.get('/api/agentManagement/bankAccount/'+id);
}
export function getAll(query){
  return axios.get('/api/agentManagement/bankAccount/all',{params:query});
}
export function add(model){
  return axios.post('/api/agentManagement/bankAccount',model);
}
export function del(id){
  return axios.delete('/api/agentManagement/bankAccount?id='+id);
}
export function update(model){
  return axios.put('/api/agentManagement/bankAccount/'+model.id,model);
}
export function setDefault(id){
  return axios.post('/api/agentManagement/bankAccount/'+id);
}