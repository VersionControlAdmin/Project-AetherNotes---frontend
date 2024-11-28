"use client";
import { useState, useEffect } from "react";
import { NotesGrid } from "@/components/notes-grid";
import { type Note, type Tag } from "@/types/note";
import { api } from "@/lib/api";

// Example data
// const initialNotes: Note[] = [
//   {
//     id: "1",
//     title: "Meeting Notes",
//     content: "Discussed project timeline and deliverables...",
//     tags: ["work", "project"],
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "2",
//     title: "Ideas for Blog Post",
//     content: "1. AI in everyday life\n2. Future of work\n3. Technology trends",
//     tags: ["writing", "ideas"],
//     summary:
//       "Blog post ideas focusing on technology and its impact on society.",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "3",
//     title: "Recipe Collection",
//     content:
//       "- Homemade pasta sauce\n- Chocolate chip cookies\n- Green smoothie recipe",
//     tags: ["cooking", "recipes", "personal"],
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "4",
//     title: "Book Recommendations",
//     content: "1. Atomic Habits\n2. Deep Work\n3. The Psychology of Money",
//     tags: ["reading", "self-improvement"],
//     summary:
//       "Collection of recommended books focusing on personal development and productivity.",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "5",
//     title: "Workout Plan",
//     content:
//       "Monday: Upper body\nWednesday: Lower body\nFriday: Full body\nWeekend: Cardio",
//     tags: ["fitness", "health"],
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "6",
//     title: "Travel Planning - Japan 2024",
//     content:
//       "- Book flights\n- Research hotels in Tokyo\n- Must-visit temples in Kyoto",
//     tags: ["travel", "planning"],
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "7",
//     title: "Coding Resources",
//     content:
//       "- TypeScript documentation\n- React best practices\n- Next.js tutorials",
//     tags: ["programming", "learning"],
//     summary:
//       "Curated list of development resources for modern web development.",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "8",
//     title: "Gift Ideas",
//     content:
//       "Mom: Cooking class voucher\nDad: Vintage wine\nSister: Art supplies",
//     tags: ["shopping", "personal"],
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "9",
//     title: "Home Improvement",
//     content:
//       "1. Paint living room\n2. Fix kitchen cabinet\n3. Update bathroom fixtures",
//     tags: ["home", "tasks"],
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "10",
//     title: "Language Learning Goals",
//     content:
//       "- Complete Spanish duolingo tree\n- Practice conversation weekly\n- Watch Spanish movies",
//     tags: ["learning", "languages"],
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "11",
//     title: "Project Deadlines",
//     content:
//       "Frontend MVP: March 15\nBackend Integration: March 30\nTesting: April 10",
//     tags: ["work", "deadlines"],
//     summary: "Key project milestones and deadlines for Q1.",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "12",
//     title: "Garden Planning",
//     content:
//       "Spring planting:\n- Tomatoes\n- Herbs\n- Flowers\nOrder seeds by February",
//     tags: ["gardening", "hobby"],
//     createdAt: new Date().toISOString(),
//   },
// ];

export default function NotesComponent() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);

  useEffect(() => {
    loadNotes();
    loadTags();
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

  const loadTags = async () => {
    const fetchedTags = await api.getTags();
    setAvailableTags(fetchedTags);
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
      await api.createNote(noteData);
      await loadNotes();
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
        availableTags={availableTags}
      />
    </div>
  );
}
