import { axios } from '@/utils/request'
import server from '@/utils/server'

export function get(id) {
    return axios.get(`/api/saas/editions/${id}`);
}

export function all(query) {
    return axios.get("/api/saas/editions", { params: query });
}

export function create(model) {
    return axios.post("/api/saas/editions", model);
}

export function update(id, model) {
    return axios.put(`/api/saas/editions/${id}`, model);
}


export function del(id) {
    return axios.delete(`/api/saas/editions/${id}`);
}