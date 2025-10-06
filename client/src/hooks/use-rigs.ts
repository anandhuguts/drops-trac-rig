// hooks/use-rigs.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api.ts"; // axios instance with token interceptor

const API_PATH = "/api/rigs";

// Fetch all rigs
export const useRigs = () =>
  useQuery({
    queryKey: ["rigs"],
    queryFn: async () => {
      const res = await api.get(API_PATH); // token automatically attached
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // optional cache 5 mins
    retry: false,
  });

// Add rig
export const useAddRig = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; location: string }) => {
      const res = await api.post(API_PATH, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rigs"] });
    },
  });
};

// Update rig
export const useUpdateRig = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: { name: string; location: string } }) => {
      const res = await api.put(`${API_PATH}/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rigs"] });
    },
  });
};

// Delete rig
export const useDeleteRig = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`${API_PATH}/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rigs"] });
    },
  });
};
