import PrintingServiceEntity from "../entities/printingServiceEntity";
import { ENDPOINTS } from "../util/Constants";
import apiClient from "../api/apiClient";

const ENDPOINT = ENDPOINTS.PRINTING_SERVICE;

export const getPrintingServices = async () => {
    const response = await apiClient.get(ENDPOINT);

    const products = response.map(productData => {
        return new PrintingServiceEntity(
            productData.id_printing_service,
            productData.name,
            productData.description,
        );
    });

    return products;
}

export const getPrintingServiceById = async (id) => {
    const response = await apiClient.get(`${ENDPOINT}/${id}`);

    const product = new PrintingServiceEntity(
        response.id_printing_service,
        response.name,
        response.description,
    );

    return product;
}

export const postPrintingService = async (product) => {
    const productData = product.toObject();
    const response = await apiClient.post(ENDPOINT, productData);

    return response;
}

export const putPrintingService = async (product) => {
    const productData = product.toObject();
    const response = await apiClient.put(ENDPOINT, productData);

    return response;
}

export const deletePrintingService = async (id) => {
    const response = await apiClient.delete(`${ENDPOINT}/${id}`);

    return response;
};