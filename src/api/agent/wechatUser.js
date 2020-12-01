import api from './../index'
import { axios } from '@/utils/request'

export function getAll(query){
  return axios.get('/api/agentManagement/userInfo/weChatUsers',{params:query});
}