import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../apiClient";
import Services from "../services";

export const useInactivateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => await apiClient.get(`${Services.BO_INACTIVATE_USER}/${id}`),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['users'] }); },
    });
};
