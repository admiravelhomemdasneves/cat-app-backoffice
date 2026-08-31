import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import Services from "../services";

export const useGetUsers = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['users'],
        queryFn: async () => await apiClient.get(Services.BO_GET_USERS),
    });
    return { data, isPending, error };
};
