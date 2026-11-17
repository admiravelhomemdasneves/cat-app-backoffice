import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import Services from "../services";

export const useGetCurrentUser = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => await apiClient.get(Services.GET_CURRENT_USER),
        staleTime: 1000 * 60 * 5,
    });
    return { data, isPending, error };
};
