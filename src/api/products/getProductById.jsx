import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import Services from "../services";

export const useGetProductById = (id, { enabled = true } = {}) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => await apiClient.get(`${Services.BO_GET_ALL_PRODUCTS}/${id}`),
        enabled: !!id && enabled,
    });
};
