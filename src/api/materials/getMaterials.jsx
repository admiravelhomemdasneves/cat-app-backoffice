import apiClient from "../apiClient";
import { useQuery } from "@tanstack/react-query";
import Services from "../services";

export const useGetMaterials = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['materials'],
        queryFn: async () => {
            const response = await apiClient.get(Services.GET_ALL_MATERIALS);
            return response;
        }
    });

    return { data, isPending, error };
};
