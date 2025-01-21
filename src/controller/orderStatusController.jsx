import { toOrderStatusEntity } from "../entities/orderStatusEntity";
import { ENDPOINTS } from "../util/Constants";
import apiClient from "../api/apiClient";

const ENDPOINT = ENDPOINTS.ORDER_STATUS;

export const getOrderStatus = async () => {
    const response = await apiClient.get(ENDPOINT);

    const result = response.map(data => {
        return toOrderStatusEntity(data);
    });

    return result;
}

export const getOrderStatusById = async (id) => {
    const response = await apiClient.get(`${ENDPOINT}/${id}`);

    const result = toOrderStatusEntity(response);

    return result;
}

export const postOrderStatus = async (obj) => {
    const data = obj.toObject();
    const response = await apiClient.post(ENDPOINT, data);

    return response;
}

export const putOrderStatus = async (obj) => {
    const data = obj.toObject();
    const response = await apiClient.put(ENDPOINT, data);

    return response;
}

export const deleteOrderStatus = async (id) => {
    const response = await apiClient.delete(`${ENDPOINT}/${id}`);

    return response;
};