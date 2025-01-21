import { getPrintingServices, getPrintingServiceById, postPrintingService, putPrintingService, deletePrintingService } from '../controller/printingServiceController';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../util/Constants';

const QUERY_KEY = QUERY_KEYS.PRINTING_SERVICE;

export function useGetPrintingServices() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getPrintingServices()
  });
}

export function useGetPrintingServiceById(id) {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getPrintingServiceById(id),
  });
};

export const usePostPrintingService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product) => postPrintingService(product),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};

export const usePutPrintingService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product) => putPrintingService(product),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};

export const useDeletePrintingService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deletePrintingService(id),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};