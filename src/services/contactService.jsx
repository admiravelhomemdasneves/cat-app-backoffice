import { getContact, getContactById, postContact, putContact, deleteContact } from '../controller/contactController';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { QUERY_KEYS } from '../util/Constants';

const QUERY_KEY = QUERY_KEYS.CONTACT;

export function useGetContact() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getContact(),
    keepPreviousData
  });
}

export function useGetContactById(id) {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getContactById(id),
  });
};

export const usePostContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (obj) => postContact(obj),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};

export const usePutContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (obj) => putContact(obj),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteContact(id),
    onSuccess: () => { queryClient.invalidateQueries(QUERY_KEY); },
  });
};