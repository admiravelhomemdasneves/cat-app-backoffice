import { getOrderProductSpecs, getOrderProductSpecsById, getOrderProductSpecsByOrderProduct, postOrderProductSpecs, putOrderProductSpecs, deleteOrderProductSpecs } from '../controller/orderProductSpecsController';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import OrderProductSpecsEntity from '../entities/orderProductSpecsEntity';
import { QUERY_KEYS } from '../util/Constants';

const QUERY_KEY = QUERY_KEYS.ORDER_PRODUCT_SPECS;

export function useGetOrderProductSpecs() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getOrderProductSpecs(),
  });
}

export function useGetOrderProductSpecsById(id) {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getOrderProductSpecsById(id),
  });
};

export function useGetOrderProductSpecsByOrderProduct(id) {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getOrderProductSpecsByOrderProduct(id),
  });
};

export const usePostOrderProductSpecs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product) => postOrderProductSpecs(product),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};

export const usePostNewOrderProductSpec = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderProduct) => {
      postOrderProductSpecs(new OrderProductSpecsEntity(
        null,
        orderProduct,
        null,
        null,
        null,
        1,
      ))
    },
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};

export const usePutOrderProductSpecs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product) => putOrderProductSpecs(product),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};

export const useDeleteOrderProductSpecs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteOrderProductSpecs(id),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};