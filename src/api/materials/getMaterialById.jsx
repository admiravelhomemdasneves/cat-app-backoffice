import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import Services from "../services";

export const useGetMaterialById = (id, { enabled = true } = {}) => {
    return useQuery({
        queryKey: ['material', id],
        queryFn: async () => await apiClient.get(`${Services.GET_ALL_MATERIALS}/${id}`),
        enabled: !!id && enabled,
    });
};
