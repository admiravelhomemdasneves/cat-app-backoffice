import Services from "../services";
import apiClient from "../apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateContact = (data) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => { return await apiClient.post(Services.PUT_ID_CONTACT, data); },
        onSuccess: () => { queryClient.invalidateQueries('contacts'); },
        onError: (err) => { console.log("ERROR UPDATING ROW", err); }
    });
};

export const useInactivateContact = (id) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => { return await apiClient.get(Services.INACTIVATE_CONTACT + "/" + id); },
        onSuccess: () => { queryClient.invalidateQueries('contacts'); },
        onError: (err) => { console.log("ERROR UPDATING ROW", err); }
    });
};