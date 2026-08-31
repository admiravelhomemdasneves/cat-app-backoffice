import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../apiClient";
import Services from "../services";

export const useUpdatePermission = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (permissionDTO) => await apiClient.post(Services.BO_SAVE_PERMISSION, permissionDTO),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] });
            queryClient.invalidateQueries({ queryKey: ['myPermissions'] });
        },
    });
};
