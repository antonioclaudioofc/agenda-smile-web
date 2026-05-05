import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDentist,
  deleteDentist,
  getDentists,
  updateDentist,
} from "../api/dentist";
import type { DentistSchema } from "../types/dentist";

export const useDentist = () => {
  return useQuery({
    queryKey: ["dentist"],
    queryFn: getDentists,
  });
};

export const useCreateDentist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DentistSchema) => createDentist(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dentist"] });
    },
  });
};

export const useUpdateDentist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: DentistSchema }) =>
      updateDentist(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dentist"] });
    },
  });
};

export const useDeleteDentist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDentist(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dentist"] });
    },
  });
};
