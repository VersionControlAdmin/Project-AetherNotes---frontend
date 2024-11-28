# Frontend API Integration Instructions

# Frontend API Integration Instructions

## 0. Install Axios

First, install axios:

```bash
npm install axios
```

## 1. Create API Client

Create a new file `src/lib/api.ts`:

```typescript
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
```

## 2. Update Note Component

Replace the example data in `src/components/note-component.tsx` with:

```typescript
export function NoteComponent() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const fetchedNotes = await api.getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Failed to load notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNote = async (id: string, updates: Partial<Note>) => {
    try {
      const updatedNote = await api.updateNote(id, updates);
      setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await api.deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const handleGenerateSummary = async (id: string) => {
    try {
      const updatedNote = await api.generateSummary(id);
      setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
    } catch (error) {
      console.error("Failed to generate summary:", error);
    }
  };

  const handleAddNote = async (noteData: Omit<Note, "id" | "createdAt">) => {
    try {
      const newNote = await api.createNote(noteData);
      setNotes([...notes, newNote]);
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <NotesGrid
        notes={notes}
        onUpdateNote={handleUpdateNote}
        onDeleteNote={handleDeleteNote}
        onGenerateSummary={handleGenerateSummary}
        onAddNote={handleAddNote}
      />
    </div>
  );
}
```

## 3. Enable CORS on Backend

Add CORS middleware to your backend `app.ts`:

```typescript
import cors from "cors";

app.use(cors());
```

Install the CORS package:

```bash
npm install cors
npm install --save-dev @types/cors
```

## 4. Update Note Type

Update `src/types/note.ts`:

```typescript
export interface Note {
  id: string;
  title: string;
  content: string;
  summary?: string;
  createdAt: string;
  tags?: Tag[];
}

export interface Tag {
  id: string;
  name: string;
}
```

## Required Changes Summary:

1. Create API client utility
2. Remove hardcoded example data
3. Implement proper error handling
4. Add loading states
5. Enable CORS on backend
6. Update type definitions
7. Test all CRUD operations

## Testing Steps:

1. Start backend server (port 3000)
2. Start frontend dev server
3. Test creating, reading, updating, and deleting notes
4. Test summary generation
5. Verify error handling
6. Check loading states
