import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE = "https://drop-stack-backend.onrender.com/api/inspectors";

// ✅ Fetch all inspectors
export const useInspectors = () => {
  return useQuery({
    queryKey: ["inspectors"],
    queryFn: async () => {
      const res = await axios.get(API_BASE);
      return res.data;
    },
  });
};

// ✅ Add inspector
export const useAddInspector = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { name: string; specialties: string[] }>({
    mutationFn: async (data) => {
      const res = await axios.post(API_BASE, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inspectors"] });
    },
  });
};

// ✅ Update inspector
export const useUpdateInspector = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { id: string; data: { name: string; specialties: string[] } }>({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(`${API_BASE}/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inspectors"] });
    },
  });
};

// ✅ Delete inspector
export const useDeleteInspector = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationFn: async (id) => {
      const res = await axios.delete(`${API_BASE}/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inspectors"] });
    },
  });
};
