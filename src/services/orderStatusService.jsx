import { getOrderStatus, getOrderStatusById, postOrderStatus, putOrderStatus, deleteOrderStatus } from '../controller/orderStatusController';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../util/Constants';

const QUERY_KEY = QUERY_KEYS.ORDER_STATUS;

export function useGetOrderStatus() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getOrderStatus()
  });
}

export function useGetOrderStatusById(id) {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getOrderStatusById(id),
  });
};

export const usePostOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (obj) => postOrderStatus(obj),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};

export const usePutOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (obj) => putOrderStatus(obj),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};

export const useDeleteOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteOrderStatus(id),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};