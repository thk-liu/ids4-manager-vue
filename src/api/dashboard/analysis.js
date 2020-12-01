import api from './../index'
import { axios } from '@/utils/request'

export function getAll(query) {
    return axios.get('/api/orderManagement/orderStatistics/orderBaseStatistics');
}

// export function orderBusinessOverview(StartDate,EndDate){
//     return axios.get('/api/orderManagement/orderStatistics/orderBusinessOverviewStatistics?StartDate=' + StartDate + "&EndDate=" + EndDate);
//   }
export function orderBusinessOverview(query) {
    return axios.get('/api/orderManagement/orderStatistics/orderBusinessOverviewStatistics', { params: query });
}

// export function orderStatistics(StartDate,EndDate){
//     return axios.get('/api/orderManagement/orderStatistics/orderStatistics?StartDate=' + StartDate + "&EndDate=" + EndDate);
//   }
export function orderStatistics(query) {
    return axios.get('/api/orderManagement/orderStatistics/orderStatistics', { params: query });
}

export function deliverStatistics(query) {
    return axios.get('/api/orderManagement/orderStatistics/deliverStatistics', { params: query });
}

export function paymentStatistics(query) {
    return axios.get('/api/orderManagement/orderStatistics/paymentStatistics', { params: query });
}

export function ordersByAgentTOP(query) {
    return axios.get('/api/orderManagement/orderStatistics/ordersByAgentTOP', { params: query });
}
export function productTOP(query) {
    return axios.get('/api/orderManagement/orderStatistics/productTOP', { params: query });
}