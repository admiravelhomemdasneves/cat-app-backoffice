import Services from "../services";
import apiClient from "../apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProduct = (data) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => { return await apiClient.post(Services.BO_SAVE_PRODUCT, data); },
        onSuccess: () => { queryClient.invalidateQueries('products','productsParameters'); },
        //onError: (err) => { console.log("ERROR UPDATING ROW", err); }
    });
};

export const useInactivateProduct = (id) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => { return await apiClient.get(Services.BO_INACTIVATE_PRODUCT + "/" + id); },
        onSuccess: () => { queryClient.invalidateQueries('products'); },
        //onError: (err) => { console.log("ERROR UPDATING ROW", err); }
    });
};