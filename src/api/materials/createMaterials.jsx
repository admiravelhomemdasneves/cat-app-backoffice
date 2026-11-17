import Services from "../services";
import apiClient from "../apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateMaterial = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => { return await apiClient.post(Services.SAVE_MATERIAL, data); },
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['materials'] }); },
    });
};

export const useInactivateMaterial = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => { return await apiClient.get(Services.INACTIVATE_MATERIAL + "/" + id); },
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['materials'] }); },
    });
};
