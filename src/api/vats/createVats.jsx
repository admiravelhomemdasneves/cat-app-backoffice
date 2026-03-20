import Services from "../services";
import apiClient from "../apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateVat = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => { return await apiClient.post(Services.BO_SAVE_VAT, data); },
        onSuccess: () => { queryClient.invalidateQueries('vats'); },
        //onError: (err) => { console.log("ERROR SAVING VAT", err); }
    });
};

export const useInactivateVat = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => { return await apiClient.get(Services.BO_INACTIVATE_VAT + "/" + id); },
        onSuccess: () => { queryClient.invalidateQueries('vats'); },
        //onError: (err) => { console.log("ERROR INACTIVATING VAT", err); }
    });
};