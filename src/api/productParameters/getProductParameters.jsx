import apiClient from "../apiClient";
import { useQuery } from "@tanstack/react-query";
import Services from "../services";

export const useGetProductParameters = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['productParameters'],
        queryFn: async () => {
            const response = await apiClient.get(Services.BO_GET_ALL_PRODUCT_PARAMETERS);
            return response;
        }
    });

    if (!isPending && !error && data) return data;
};

export const useGetProductParametersByProduct = (idProduct) => {
    const { isPending, error, data } = useQuery({
        queryKey: ['productParameters', idProduct],
        queryFn: async () => {
            const response = await apiClient.get(Services.BO_GET_PRODUCT_PARAMETERS_BY_PRODUCT + "/" + idProduct);
            return response;
        },
        enabled: !!idProduct,
    });

    if (!isPending && !error && data) return data;
};