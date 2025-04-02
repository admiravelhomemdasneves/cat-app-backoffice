import apiClient from "../apiClient";
import { useQuery } from "@tanstack/react-query";
import Services from "../services";

export const useGetPrintingServices = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['printing-services'],
        queryFn: async () => {
        const response = await apiClient.get(Services.GET_ALL_PRINTING_SERVICE);
        return response;
    }})

    if (!isPending && !error && data) return data;
};