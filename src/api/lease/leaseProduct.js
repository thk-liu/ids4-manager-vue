import api from './../index'
import { axios } from '@/utils/request'

export function GetLeaseByProductId(id){
    if(!id)
    return;
    return axios.get(`/api/leaseManagement/leaseProductManagement/${id}/leaseByProductId`)
}

export function SaveProductLease(model){
    if(model.id){
        //有id是修改
        return axios.put(`/api/leaseManagement/leaseProductManagement/${model.id}`,model)
    }
    return axios.post('/api/leaseManagement/leaseProductManagement',model)
}
