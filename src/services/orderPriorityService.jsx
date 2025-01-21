import { getOrderPriority, getOrderPriorityById, postOrderPriority, putOrderPriority, deleteOrderPriority } from '../controller/orderPriorityController';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../util/Constants';

const QUERY_KEY = QUERY_KEYS.ORDER_PRIORITY;

export function useGetOrderPriority() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getOrderPriority()
  });
}

export function useGetOrderPriorityById(id) {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getOrderPriorityById(id),
  });
};

export const usePostOrderPriority = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (obj) => postOrderPriority(obj),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};

export const usePutOrderPriority = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (obj) => putOrderPriority(obj),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};

export const useDeleteOrderPriority = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteOrderPriority(id),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};