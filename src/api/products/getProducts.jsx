import apiClient from "../apiClient";
import { useQuery } from "@tanstack/react-query";
import Services from "../services";

export const useGetProducts = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
        const response = await apiClient.get(Services.GET_ALL_PRODUCTS);
        return response;
    }})

    if (!isPending && !error && data) return data;
};