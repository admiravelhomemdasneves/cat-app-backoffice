import Services from "../services";
import apiClient from "../apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateOrderProduct = (data) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => { return await apiClient.post(Services.PUT_ID_ORDER_PRODUCT, data); },
        onSuccess: () => { queryClient.invalidateQueries(['orders','orderProducts']); },
        onError: (err) => { console.log("ERROR UPDATING ROW", err); }
    });
};

export const useInactivateOrderProduct = (id) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => { return await apiClient.get(Services.ORDER_PRODUCT_INACTIVATE + "/" + id); },
        onSuccess: () => { queryClient.invalidateQueries(['orders','orderProducts']); },
        onError: (err) => { console.log("ERROR UPDATING ROW", err); }
    });
};