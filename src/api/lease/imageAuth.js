import api from './../index'
import { axios } from '@/utils/request'

export function getAll(query){
    return axios.get('/api/leaseManagement/imageAuth', { params: query });
}

export function setState(id,state){
    return axios.get(`/api/leaseManagement/imageAuth/${id}/state?state=${state}`,{state:state});
}

export function del(id){
    return axios.delete(`/api/leaseManagement/imageAuth/${id}`);

}