import api from './../index'
import { axios } from '@/utils/request'

export function postShoppingCart (productId, skuId, quantity) { // 加入购物车
	let param = {
	  productId,
	  skuId,
	  quantity
	}
	return axios.post(`/api/productManagement/shoppingCart`, param)
}

export function getShoppingCart (SkipCount) { // 获取购物车
	let query = {
		SkipCount,
		MaxResultCount: 1000
	}
	return axios.get(`/api/productManagement/shoppingCart`, query)
}

export function putShoppingCart (id, quantity) { // 更新购物车
	return axios.put(`/api/productManagement/shoppingCart/${id}?Qty=${quantity}`)
}

export function deleteShoppingCart (id) { // 删除购物车
	return axios.delete(`/api/productManagement/shoppingCart/${id}`)
}

export function postShopCartCheck (data) {// 购物车选中或取消
	return axios.post(`/api/productManagement/shoppingCart/setCheck`, data)
}

export function clearShopCart () { // 清空购物车
	return axios.post(`/api/productManagement/shoppingCart/clear`)
}

export function getProductWishCount () { // 获取收藏的商品数量
	return axios.get('/api/productManagement/productWishlist/count')
}

export function postProductWish (id) { // 收藏
	return axios.post(`/api/productManagement/productWishlist/${id}`)
} 