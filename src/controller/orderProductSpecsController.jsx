import OrderProductSpecsEntity, { toOrderProductSpecsEntity } from "../entities/orderProductSpecsEntity";
import { ENDPOINTS } from "../util/Constants";
import apiClient from "../api/apiClient";

const ENDPOINT = ENDPOINTS.ORDER_PRODUCT_SPECS;

export const getOrderProductSpecs = async () => {
    const response = await apiClient.get(ENDPOINT);

    const orderProductSpecs = response.map(orderProductSpecsData => {
        return toOrderProductSpecsEntity(orderProductSpecsData);
    });

    return orderProductSpecs;
}

export const getOrderProductSpecsById = async (id) => {
    const response = await apiClient.get(`${ENDPOINT}/${id}`);

    const product = toOrderProductSpecsEntity(response);

    return product;
}

export const getOrderProductSpecsByOrderProduct = async (id) => {
    const response = await apiClient.get(`${ENDPOINT}/orderProduct/${id}`);

    const orderProductSpecs = response.map(orderProductSpecsData => {
        return toOrderProductSpecsEntity(orderProductSpecsData);
    });

    return orderProductSpecs;
}

export const postOrderProductSpecs = async (orderProductSpecs) => {
    const orderProductSpecsData = orderProductSpecs.toObject();
    const response = await apiClient.post(ENDPOINT, orderProductSpecsData);

    return response;
}

export const putOrderProductSpecs = async (orderProductSpecs) => {
    const orderProductSpecsData = orderProductSpecs.toObject();
    const response = await apiClient.put(ENDPOINT, orderProductSpecsData);

    return response;
}

export const deleteOrderProductSpecs = async (id) => {
    const response = await apiClient.delete(`${ENDPOINT}/${id}`);

    return response;
};