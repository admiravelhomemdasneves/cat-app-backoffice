import apiClient from "../apiClient";
import { useQuery } from "@tanstack/react-query";
import Services from "../services";

export const useGetPriorities = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['order-priorities'],
        queryFn: async () => {
        const response = await apiClient.get(Services.GET_ALL_ORDER_PRIORITY);
        return response;
    }})

    if (!isPending && !error && data) return data;
};