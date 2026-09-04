import Services from "../services";
import apiClient from "../apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateOrderItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => { return await apiClient.post(Services.BO_SAVE_ORDER_ITEM, data); },
        onSuccess: () => { queryClient.invalidateQueries(['orders']); },
    });
};

export const useInactivateOrderItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => { return await apiClient.get(Services.BO_INACTIVATE_ORDER_ITEM + "/" + id); },
        onSuccess: () => { queryClient.invalidateQueries(['orders']); },
    });
};

export const useCalculateOrderItemPrice = () => {
    return useMutation({
        mutationFn: async (id) => {
            const response = await apiClient.post(`${Services.BO_CALCULATE_ORDER_ITEM_PRICE}/${id}/calculate-price`, {});
            return response.data;
        },
    });
};
