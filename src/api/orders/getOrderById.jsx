import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import Services from "../services";

export const useGetOrderById = (id, { enabled = true } = {}) => {
    return useQuery({
        queryKey: ['order', id],
        queryFn: async () => await apiClient.get(`${Services.BO_GET_ALL_ORDERS}/${id}`),
        enabled: !!id && enabled,
    });
};
