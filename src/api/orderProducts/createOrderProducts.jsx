import Services from "../services";
import apiClient from "../apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateOrderItemDTO = (data) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => { return await apiClient.post(Services.BO_SAVE_ORDER_ITEM, data); },
        onSuccess: () => { queryClient.invalidateQueries(['orders','orderProducts']); },
        //onError: (err) => { console.log("ERROR UPDATING ROW", err); }
    });
};

export const useInactivateOrderItem = (id) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => { return await apiClient.get(Services.BO_INACTIVATE_ORDER_ITEM + "/" + id); },
        onSuccess: () => { queryClient.invalidateQueries(['orders','orderProducts']); },
        //onError: (err) => { console.log("ERROR UPDATING ROW", err); }
    });
};