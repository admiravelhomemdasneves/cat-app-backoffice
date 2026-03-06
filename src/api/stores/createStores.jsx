import Services from "../services";
import apiClient from "../apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateStore = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => { return await apiClient.post(Services.BO_SAVE_STORE, data); },
        onSuccess: () => { queryClient.invalidateQueries('stores'); },
        onError: (err) => { console.log("ERROR SAVING STORE", err); }
    });
};

export const useInactivateStore = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => { return await apiClient.get(Services.BO_INACTIVATE_STORE + "/" + id); },
        onSuccess: () => { queryClient.invalidateQueries('stores'); },
        onError: (err) => { console.log("ERROR INACTIVATING STORE", err); }
    });
};