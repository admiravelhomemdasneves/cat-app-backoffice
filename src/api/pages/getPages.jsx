import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import Services from "../services";

export const useGetPages = () => {
    return useQuery({
        queryKey: ['pages'],
        queryFn: async () => await apiClient.get(Services.BO_GET_PAGES),
    });
};
