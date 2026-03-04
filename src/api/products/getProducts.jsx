import apiClient from "../apiClient";
import { useQuery } from "@tanstack/react-query";
import Services from "../services";

export const useGetProductsOLD = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
        const response = await apiClient.get(Services.GET_ALL_PRODUCTS);
        return response;
    }})

    if (!isPending && !error && data) return data;
};

export const useGetProducts = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
        const response = await apiClient.get(Services.BO_GET_ALL_PRODUCTS);
        return response;
    }})

    if (!isPending && !error && data) return data;
};