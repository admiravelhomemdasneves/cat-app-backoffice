import OrderProductEntity, { toOrderProductEntity } from "../entities/orderProductEntity";
import { ENDPOINTS } from "../util/Constants";
import apiClient from "../api/apiClient";

const ENDPOINT = ENDPOINTS.ORDER_PRODUCT;

export const getOrderProduct = async () => {
    const response = await apiClient.get(ENDPOINT);

    const orderProduct = response.map(orderProductData => {
        return toOrderProductEntity(orderProductData);
    });

    return orderProduct;
}

export const getOrderProductById = async (id) => {
    const response = await apiClient.get(`${ENDPOINT}/${id}`);

    const orderProduct = toOrderProductEntity(response);

    return orderProduct;
}

export const getOrderProductByOrder = async (id) => {
    const response = await apiClient.get(`${ENDPOINT}/order/${id}`);

    const orderProduct = response.map(orderProductData => {
        return toOrderProductEntity(orderProductData);
    });

    return orderProduct;
}

export const postOrderProduct = async (orderProduct) => {
    const orderProductData = orderProduct.toObject();
    const response = await apiClient.post(ENDPOINT, orderProductData);

    return response;
}

export const putOrderProduct = async (orderProduct) => {
    const orderProductData = orderProduct.toObject();
    const response = await apiClient.put(ENDPOINT, orderProductData);

    return response;
}

export const deleteOrderProduct = async (id) => {
    const response = await apiClient.delete(`${ENDPOINT}/${id}`);

    return response;
};