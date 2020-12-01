import api from './../index'
import { axios } from '@/utils/request'

export function getPermissions(role,providerKey) {
    return axios.get("/api/abp/permissions?providerName="+role+"&providerKey="+providerKey);
}

export function savePermissions(providerName,providerKey,model){

    return axios.put("/api/abp/permissions?providerName="+providerName+"&providerKey="+providerKey,model);
}

export function getRoles(){
    return axios.get("/api/identity/roles");
}

export function createRole(model){
    return axios.post("/api/identity/roles",model);
}

export function updateRole(id,model){
    return axios.put("/api/identity/roles/"+id,model);
}

export function delRole(id){
    return axios.delete("/api/identity/roles/"+id);
}