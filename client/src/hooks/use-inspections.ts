// hooks/use-inspections.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api"; // use the axios instance with interceptors

const API_PATH = "/inspections";

// Fetch all inspections
export const useInspections = () =>
  useQuery({
    queryKey: ["inspections"],
    queryFn: async () => {
      const res = await api.get(API_PATH); // token automatically attached by interceptor
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // cache 5 mins
    retry: true, 
  });

// Add new inspection
export const useAddInspection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post(API_PATH, data);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inspections"] }),
  });
};

// Update inspection
export const useUpdateInspection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await api.put(`${API_PATH}/${id}`, data);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inspections"] }),
  });
};

// Delete inspection
export const useDeleteInspection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`${API_PATH}/${id}`);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inspections"] }),
  });
};
