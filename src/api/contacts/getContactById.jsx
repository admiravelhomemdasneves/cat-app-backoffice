import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import Services from "../services";

export const useGetContactById = (id, { enabled = true } = {}) => {
    return useQuery({
        queryKey: ['contact', id],
        queryFn: async () => await apiClient.get(`${Services.BO_GET_ALL_CONTACTS}/${id}`),
        enabled: !!id && enabled,
    });
};
