import Services from "../services";
import apiClient from "../apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateStatus = (data) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => { return await apiClient.post(Services.PUT_ID_ORDER_STATUS, data); },
        onSuccess: () => { queryClient.invalidateQueries('statuses'); },
        onError: (err) => { console.log("ERROR UPDATING ROW", err); }
    });
};

export const useInactivateStatus = (id) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => { return await apiClient.get(Services.INACTIVATE_STATUS + "/" + id); },
        onSuccess: () => { queryClient.invalidateQueries('statuses'); },
        onError: (err) => { console.log("ERROR UPDATING ROW", err); }
    });
};