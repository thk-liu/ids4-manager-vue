import { axios } from '@/utils/request'

export function GetCounts(query) {
    return axios.get('/api/notifications/tenantNotification/count', { params: query });
}

export function GetLists(query) {
    return axios.get('/api/notifications/tenantNotification', { params: query });
}

export function SetReader(id) {
    return axios.put(`/api/notifications/tenantNotification/${id}/state?state=${1}`);
}