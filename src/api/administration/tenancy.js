import { axios } from '@/utils/request'
import server from '@/utils/server'

export function get(id) {
    return axios.get(`/api/saas/tenants/${id}`);
}

export function all(query) {
    return axios.get("/api/saas/tenants", { params: query });
}

export function create(model) {
    return axios.post("/api/saas/tenants", model);
}

export function update(id, model) {
    return axios.put(`/api/saas/tenants/${id}`, model);
}


export function del(id) {
    return axios.delete(`/api/saas/tenants/${id}`);
}

export function defaultConnectionString(tenant) {
    return axios.get(`/api/multi-tenancy/tenants/${tenant}/default-connection-string`);
}

export function updateConnectionString(tenant, defaultConnectionString) {
    return axios.put(`/api/multi-tenancy/tenants/${tenant}/default-connection-string?defaultConnectionString=${defaultConnectionString}`);
}

export function deleteConnectionString(tenant) {
    return axios.delete(`/api/multi-tenancy/tenants/${tenant}/default-connection-string`);
}

export function byName(name) {
    return axios.get(`/api/abp/multi-tenancy/tenants/by-name/${name}`, { baseURL: server.AuthUrlApi })
}