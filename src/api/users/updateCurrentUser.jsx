import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../apiClient";
import Services from "../services";

export const useUpdateCurrentUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updates) => await apiClient.put(Services.PUT_CURRENT_USER, updates),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['currentUser'] }); },
    });
};
