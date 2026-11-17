import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import Services from "../services";

export const useGetMyPermissions = () => {
    return useQuery({
        queryKey: ['myPermissions'],
        queryFn: async () => await apiClient.get(Services.BO_GET_MY_PERMISSIONS),
        staleTime: 1000 * 60 * 5,
    });
};
