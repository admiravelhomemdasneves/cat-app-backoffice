import Services from "../services";
import apiClient from "../apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdatePrintingService = (data) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => { return await apiClient.post(Services.PUT_ID_PRINTING_SERVICE, data); },
        onSuccess: () => { queryClient.invalidateQueries('printingServices'); },
        //onError: (err) => { console.log("ERROR UPDATING ROW", err); }
    });
};

export const useInactivatePrintingService = (id) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => { return await apiClient.get(Services.INACTIVATE_PRINTING_SERVICE + "/" + id); },
        onSuccess: () => { queryClient.invalidateQueries('printingServices'); },
        //onError: (err) => { console.log("ERROR UPDATING ROW", err); }
    });
};