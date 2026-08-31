import apiClient from "../apiClient";
import { useQuery } from "@tanstack/react-query";
import Services from "../services";

export const useGetVats = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['vats'],
        queryFn: async () => {
            const response = await apiClient.get(Services.BO_GET_ALL_VATS);
            return response;
        }
    });

    return { data, isPending, error };
};