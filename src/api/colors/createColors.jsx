import Services from "../services";
import apiClient from "../apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateColor = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => { return await apiClient.post(Services.BO_SAVE_COLOR, data); },
        onSuccess: () => { queryClient.invalidateQueries('colors'); },
        onError: (err) => { console.log("ERROR SAVING COLOR", err); }
    });
};

export const useInactivateColor = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => { return await apiClient.get(Services.BO_INACTIVATE_COLOR + "/" + id); },
        onSuccess: () => { queryClient.invalidateQueries('colors'); },
        onError: (err) => { console.log("ERROR INACTIVATING COLOR", err); }
    });
};