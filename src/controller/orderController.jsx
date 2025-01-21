import OrderEntity, { toOrderEntity } from "../entities/orderEntity";
import CompleteOrderInfoDTO from "../entities/dto/completeOrderInfoDTO";
import { ENDPOINTS } from "../util/Constants";
import apiClient from "../api/apiClient";

const ENDPOINT = ENDPOINTS.ORDER;

export const getOrder = async () => {
    const response = await apiClient.get(ENDPOINT);

    const order = response.map(orderData => {
        return toOrderEntity(orderData);
    });

    return order;
}

export const getOrderById = async (id) => {
    const response = await apiClient.get(`${ENDPOINT}/${id}`);

    const order = toOrderEntity(response);

    return order;
}

export const getCompleteOrderInfoById = async (id) => {
    const response = await apiClient.get(`${ENDPOINT}/complete/${id}`);

    const order = new CompleteOrderInfoDTO(response.order, response.orderProducts);

    return order;
}

export const postOrder = async (order) => {
    const orderData = order.toObject();
    const response = await apiClient.post(ENDPOINT, orderData);

    return response;
}

export const putOrder = async (order) => {
    const orderData = order.toObject();
    const response = await apiClient.put(ENDPOINT, orderData);

    return response;
}

export const deleteOrder = async (id) => {
    const response = await apiClient.delete(`${ENDPOINT}/${id}`);

    return response;
};