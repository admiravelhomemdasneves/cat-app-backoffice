import { getProducts, getProductById, postProduct, putProduct, deleteProduct } from '../controller/productController';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../util/Constants';

const QUERY_KEY = QUERY_KEYS.PRODUCTS;

export function useGetProducts() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getProducts()
  });
}

export function useGetProductById(id) {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getProductById(id),
  });
};

export const usePostProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product) => postProduct(product),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};

export const usePutProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product) => putProduct(product),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};