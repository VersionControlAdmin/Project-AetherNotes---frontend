import axios from "axios";
import { Note } from "@/types/note";

const API_BASE_URL = "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  // Notes
  getNotes: () => axiosInstance.get<Note[]>("/notes").then((res) => res.data),
  getNote: (id: string) =>
    axiosInstance.get<Note>(`/notes/${id}`).then((res) => res.data),

  createNote: (note: Omit<Note, "id" | "createdAt">) =>
    axiosInstance.post<Note>("/notes", note).then((res) => res.data),

  updateNote: (id: string, updates: Partial<Note>) =>
    axiosInstance.put<Note>(`/notes/${id}`, updates).then((res) => res.data),

  deleteNote: (id: string) => axiosInstance.delete(`/notes/${id}`),

  generateSummary: (id: string) =>
    axiosInstance.post<Note>(`/notes/${id}/summarize`).then((res) => res.data),

  // Tags
  getTags: () => axiosInstance.get("/tags").then((res) => res.data),

  createTag: (name: string) =>
    axiosInstance.post("/tags", { name }).then((res) => res.data),

  addTagsToNote: (noteId: string, tagIds: string[]) =>
    axiosInstance
      .post(`/notes/${noteId}/tags`, { tagIds })
      .then((res) => res.data),
};
