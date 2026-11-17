import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../apiClient";
import Services from "../services";

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userDTO) => await apiClient.post(Services.BO_SAVE_USER, userDTO),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['users'] }); },
    });
};
