import { getOrder, getOrderById, getCompleteOrderInfoById, postOrder, putOrder, deleteOrder } from '../controller/orderController';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../util/Constants';

const QUERY_KEY = QUERY_KEYS.ORDER;
const QUERY_KEY_COMPLETE_ORDER = QUERY_KEYS.COMPLETE_ORDER_INFO;

export function useGetOrder() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getOrder(),
  });
}

export function useGetOrderById(id) {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getOrderById(id),
  });
};

export function useGetCompleteOrderInfoById(id) {
    return useQuery({
      queryKey: [QUERY_KEY_COMPLETE_ORDER],
      queryFn: () => getCompleteOrderInfoById(id)
    });
  };

export const usePostOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product) => postOrder(product),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};

export const usePutOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product) => putOrder(product),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteOrder(id),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};