import axios from "axios";
import { Note } from "@/types/note";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // Notes
  getNotes: async (endpoint: string) => {
    const response = await axiosInstance.get(`${endpoint}/notes`);
    return response.data;
  },

  getNote: (id: string) =>
    axiosInstance.get<Note>(`/notes/${id}`).then((res) => res.data),

  createNote: async (noteData: Partial<Note>, endpoint: string) => {
    const response = await axiosInstance.post(`${endpoint}/notes`, noteData);
    return response.data;
  },

  updateNote: async (id: string, updates: Partial<Note>, endpoint: string) => {
    const response = await axiosInstance.put(
      `${endpoint}/notes/${id}`,
      updates
    );
    return response.data;
  },

  deleteNote: async (id: string, endpoint: string) => {
    await axiosInstance.delete(`${endpoint}/notes/${id}`);
  },

  generateSummary: async (id: string, endpoint: string) => {
    const response = await axiosInstance.post(
      `${endpoint}/notes/${id}/summarize`
    );
    return response.data;
  },

  // Action Plan
  generateActionPlanForAllNotes: async (endpoint: string) => {
    const response = await axiosInstance.get(
      `${endpoint}/generate-action-plan`
    );
    console.log(response.data);
    return response.data;
  },

  // Tags
  getTags: async (endpoint: string) => {
    const response = await axiosInstance.get(`${endpoint}/tags`);
    return response.data;
  },

  createTag: (name: string) =>
    axiosInstance.post("/tags", { name }).then((res) => res.data),

  addTagsToNote: (noteId: string, tagIds: string[]) =>
    axiosInstance
      .post(`/notes/${noteId}/tags`, { tagIds })
      .then((res) => res.data),
};
