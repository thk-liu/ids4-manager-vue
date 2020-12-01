import { axios } from '@/utils/request'
import server from '@/utils/server'

export function users(query) {
    return axios.get("/api/identity/users", { params: query });
}

export function del_user(id) {
    return axios.get(`/api/identity/users/${id}`);
}

export function claim_types(query) {
    return axios.get("/api/identity/claim-types", { params: query });
}

export function all_claim_types() {
    return axios.get('api/identity-server/claim-types');
}

export function clients(query) {
    return axios.get('/api/identity-server/clients', { params: query })
}

export function client_detail(id) {
    return axios.get(`/api/identity-server/clients/${id}`)
}

export function create_client(model) {
    return axios.post('/api/identity-server/clients', module)
}

export function update_client(id, model) {
    return axios.put(`/api/identity-server/clients/${id}`, model)
}
export function delete_client(id, model) {
    return axios.delete(`/api/identity-server/clients/${id}`)
}


export function api_resources(query) {
    return axios.get('/api/identity-server/api-resources', { params: query, baseURL: server.AuthUrlApi })
}

// roles_claims
export function roles_claims(id) {
    return axios.get(`/api/identity/roles/${id}/claims`, { baseURL: server.AuthUrlApi });
}

// users_claims
export function users_claims(id) {
    return axios.get(`/api/identity/users/${id}/claims`, { baseURL: server.AuthUrlApi });
}

export function put_user_claim_types(id, modal) {
    return axios.put(`/api/identity/users/${id}/claims`, modal, { baseURL: server.AuthUrlApi });
}

export function SharedSecret(value) {
    return axios.get(`api/identity-server/clients/${value}/SharedSecret`, { baseURL: server.AuthUrlApi });
}

export function X509Thumbprint(value) {
    return axios.get(`api/identity-server/clients/${value}/X509Thumbprint`, { baseURL: server.AuthUrlApi });
}

export function settings() {
    return axios.get('/api/identity/settings');
}

export function saveSettings(model) {
    return axios.put('/api/identity/settings', model);
}