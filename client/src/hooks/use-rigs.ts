import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE = "https://drop-stack-backend.onrender.com/api/rigs";

// Fetch all rigs
export const useRigs = () => {
  return useQuery({
    queryKey: ["rigs"],
    queryFn: async () => {
      const res = await axios.get(API_BASE);
      return res.data;
    },
  });
};

// Add rig
export const useAddRig = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { name: string; location: string }>({
    mutationFn: async (data) => {
      const res = await axios.post(API_BASE, data);
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
  return useMutation<any, Error, { id: string; data: { name: string; location: string } }>({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(`${API_BASE}/${id}`, data);
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
  return useMutation<any, Error, string>({
    mutationFn: async (id) => {
      const res = await axios.delete(`${API_BASE}/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rigs"] });
    },
  });
};