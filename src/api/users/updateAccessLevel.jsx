import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../apiClient";
import Services from "../services";

export const useUpdateAccessLevel = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ userId, accessLevelId }) =>
            await apiClient.put(`${Services.BO_UPDATE_USER_ACCESS_LEVEL}/${userId}/access-level`, { accessLevelId }),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['users'] }); },
    });
};
