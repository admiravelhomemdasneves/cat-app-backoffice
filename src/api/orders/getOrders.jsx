import apiClient from "../apiClient";
import { useQuery } from "@tanstack/react-query";
import Services from "../services";

export const useGetOrders = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await apiClient.get(Services.BO_GET_ALL_ORDERS);
            return response;
    }})

    if (!isPending && !error && data) return data;
};