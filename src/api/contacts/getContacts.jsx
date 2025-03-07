import apiClient from "../apiClient";
import { useQuery } from "@tanstack/react-query";
import Services from "../services";

export const useGetContacts = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['contacts'],
        queryFn: async () => {
        const response = await apiClient.get(Services.GET_ALL_CONTACTS);
        return response;
    }})

    if (!isPending && !error && data) return data;
};