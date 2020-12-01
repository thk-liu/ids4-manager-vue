import { axios } from '@/utils/request'
import server from '@/utils/server'

export function audit_logs(query) {
    return axios.get("/api/audit-logging/audit-logs", { params: query });
}

export function get(id) {
    return axios.get(`/api/audit-logging/audit-logs/${id}`);
}