import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PatientSchema } from "../types/patient";
import {
  createPatient,
  getPatients,
  updatePatient,
  deletePatient,
} from "../api/patient";
import { useAuth } from "../contexts/AuthContext";

export const usePatient = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PatientSchema) =>
      createPatient({
        ...data,
        cpf: data.cpf.replace(/\D/g, ""),
        phone: data.phone.replace(/\D/g, ""),
        user: user?.id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};

export const usePatients = () => {
  return useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });
};

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PatientSchema }) =>
      updatePatient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePatient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};
