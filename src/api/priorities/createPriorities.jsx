import Services from "../services";
import apiClient from "../apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdatePriority = (data) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => { return await apiClient.post(Services.PUT_ID_ORDER_PRIORITY, data); },
        onSuccess: () => { queryClient.invalidateQueries('priorities'); },
        onError: (err) => { console.log("ERROR UPDATING ROW", err); }
    });
};

export const useInactivatePriority = (id) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => { return await apiClient.get(Services.INACTIVATE_PRIORITY + "/" + id); },
        onSuccess: () => { queryClient.invalidateQueries('priorities'); },
        onError: (err) => { console.log("ERROR UPDATING ROW", err); }
    });
};