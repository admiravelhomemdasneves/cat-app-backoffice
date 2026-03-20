import apiClient from "../apiClient";
import { useQuery } from "@tanstack/react-query";
import Services from "../services";

export const useGetStores = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['stores'],
        queryFn: async () => {
            const response = await apiClient.get(Services.BO_GET_ALL_STORES);
            return response;
        }
    });

    if (!isPending && !error && data) return data;
};