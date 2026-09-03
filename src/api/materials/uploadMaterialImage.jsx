import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";

export const useUploadMaterialImage = () => {
    return useMutation({
        mutationFn: async ({ materialId, file }) =>
            await apiClient.uploadFile(`/material/${materialId}/image`, file),
    });
};

export const useDeleteMaterialImage = () => {
    return useMutation({
        mutationFn: async (imageId) =>
            await apiClient.delete(`/material/image/${imageId}`),
    });
};
