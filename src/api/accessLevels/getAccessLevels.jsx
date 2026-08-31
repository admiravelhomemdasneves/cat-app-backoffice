import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import Services from "../services";

export const useGetAccessLevels = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['accessLevels'],
        queryFn: async () => await apiClient.get(Services.BO_GET_ACCESS_LEVELS),
        staleTime: 1000 * 60 * 10,
    });
    return { data, isPending, error };
};
