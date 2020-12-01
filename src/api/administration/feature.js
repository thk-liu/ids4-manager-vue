import { axios } from '@/utils/request'
import server from '@/utils/server'

export function get(providerKey, providerName) {
    return axios.get(`/api/abp/features?providerKey=${providerKey}&providerName=${providerName}`);
}

export function update(id, model) {
    return axios.put(`/api/saas/editions/${id}`, model);
}