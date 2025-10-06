// hooks/use-inspectors.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api"; // axios instance with token interceptor

const API_PATH = "/api/inspectors";

// Fetch all inspectors
export const useInspectors = () =>
  useQuery({
    queryKey: ["inspectors"],
    queryFn: async () => {
      const res = await api.get(API_PATH); // token attached automatically
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

// Add inspector
export const useAddInspector = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; specialties: string[] }) => {
      const res = await api.post(API_PATH, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inspectors"] });
    },
  });
};

// Update inspector
export const useUpdateInspector = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: { name: string; specialties: string[] } }) => {
      const res = await api.put(`${API_PATH}/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inspectors"] });
    },
  });
};

// Delete inspector
export const useDeleteInspector = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`${API_PATH}/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inspectors"] });
    },
  });
};
