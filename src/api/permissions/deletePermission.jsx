import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../apiClient";
import Services from "../services";

export const useDeletePermission = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => await apiClient.delete(`${Services.BO_DELETE_PERMISSION}/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] });
            queryClient.invalidateQueries({ queryKey: ['myPermissions'] });
        },
    });
};
