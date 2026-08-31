import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../apiClient";
import Services from "../services";

export const useUpdateCompany = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (company) => await apiClient.post(Services.BO_SAVE_COMPANY, company),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['myCompany'] }); },
    });
};
