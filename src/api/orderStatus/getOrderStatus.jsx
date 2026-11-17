import apiClient from "../apiClient";
import { useQuery } from "@tanstack/react-query";
import Services from "../services";

export const useGetOrderStatus = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['order-status'],
        queryFn: async () => {
        const response = await apiClient.get(Services.GET_ALL_ORDER_STATUS);
        return response;
    }})

    return { data, isPending, error };
};