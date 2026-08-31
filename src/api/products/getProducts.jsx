import apiClient from "../apiClient";
import { useQuery } from "@tanstack/react-query";
import Services from "../services";

export const useGetProducts = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
        const response = await apiClient.get(Services.BO_GET_ALL_PRODUCTS);
        return response;
    }})

    return { data, isPending, error };
};

export const useGetProductParameters = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['productsParameters'],
        queryFn: async () => {
        const response = await apiClient.get(Services.BO_GET_ALL_PRODUCT_PARAMETERS);
        return response;
    }})

    return { data, isPending, error };
};