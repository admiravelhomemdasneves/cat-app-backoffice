import apiClient from "../apiClient";
import { useQuery } from "@tanstack/react-query";
import Services from "../services";

export const useGetContacts = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['contacts'],
        queryFn: async () => {
        const response = await apiClient.get(Services.BO_GET_ALL_CONTACTS);
        return response;
    }})

    return { data, isPending, error };
};