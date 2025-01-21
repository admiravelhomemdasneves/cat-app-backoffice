import { toOrderPriorityEntity } from "../entities/orderPriorityEntity";
import { ENDPOINTS } from "../util/Constants";
import apiClient from "../api/apiClient";

const ENDPOINT = ENDPOINTS.ORDER_PRIORITY;

export const getOrderPriority = async () => {
    const response = await apiClient.get(ENDPOINT);

    const result = response.map(data => {
        return toOrderPriorityEntity(data);
    });

    return result;
}

export const getOrderPriorityById = async (id) => {
    const response = await apiClient.get(`${ENDPOINT}/${id}`);

    const result = toOrderPriorityEntity(response);

    return result;
}

export const postOrderPriority = async (obj) => {
    const data = obj.toObject();
    const response = await apiClient.post(ENDPOINT, data);

    return response;
}

export const putOrderPriority = async (obj) => {
    const data = obj.toObject();
    const response = await apiClient.put(ENDPOINT, data);

    return response;
}

export const deleteOrderPriority = async (id) => {
    const response = await apiClient.delete(`${ENDPOINT}/${id}`);

    return response;
};