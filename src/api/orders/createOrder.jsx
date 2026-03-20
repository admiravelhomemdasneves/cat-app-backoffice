import Services from "../services";
import apiClient from "../apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateOrderDTO = (data) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => { return await apiClient.post(Services.BO_SAVE_ORDER, data); },
        onSuccess: () => { queryClient.invalidateQueries('orders'); },
        //onError: (err) => { console.log("ERROR UPDATING ROW", err); }
    });
};

export const useInactivateOrder = (id) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => { return await apiClient.get(Services.ORDER_INACTIVATE + "/" + id); },
        onSuccess: () => { queryClient.invalidateQueries('orders'); },
        //onError: (err) => { console.log("ERROR UPDATING ROW", err); }
    });
};