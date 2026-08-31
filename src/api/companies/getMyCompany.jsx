import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import Services from "../services";

export const useGetMyCompany = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['myCompany'],
        queryFn: async () => await apiClient.get(Services.BO_GET_MY_COMPANY),
    });
    return { data, isPending, error };
};
