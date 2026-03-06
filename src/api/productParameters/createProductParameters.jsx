import Services from "../services";
import apiClient from "../apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProductParameter = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            return await apiClient.post(`${Services.BO_SAVE_PRODUCT_PARAMETER}/${data.product.idProduct}`, data);
        },
        onSuccess: () => { queryClient.invalidateQueries('productParameters'); },
        onError: (err) => { console.log("ERROR SAVING PRODUCT PARAMETER", err); }
    });
};

export const useInactivateProductParameter = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => { return await apiClient.get(Services.BO_INACTIVATE_PRODUCT_PARAMETER + "/" + id); },
        onSuccess: () => { queryClient.invalidateQueries('productParameters'); },
        onError: (err) => { console.log("ERROR INACTIVATING PRODUCT PARAMETER", err); }
    });
};