import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import Services from "../services";

export const useGetAllPermissions = () => {
    return useQuery({
        queryKey: ['permissions'],
        queryFn: async () => await apiClient.get(Services.BO_GET_ALL_PERMISSIONS),
    });
};
