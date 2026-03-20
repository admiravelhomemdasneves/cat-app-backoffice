import apiClient from "../apiClient";
import { useQuery } from "@tanstack/react-query";
import Services from "../services";

export const useGetColors = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['colors'],
        queryFn: async () => {
            const response = await apiClient.get(Services.BO_GET_ALL_COLORS);
            return response;
        }
    });

    if (!isPending && !error && data) return data;
};