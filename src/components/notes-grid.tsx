"use client";

import { type Note, type Tag } from "@/types/note";
import { NoteCard } from "@/components/note-card";
import { NoteAdder } from "@/components/note-adder";

interface NotesGridProps {
  notes: Note[];
  availableTags: Tag[];
  onUpdateNote: (id: string, updates: Partial<Note>) => Promise<void>;
  onDeleteNote: (id: string) => Promise<void>;
  onGenerateSummary: (id: string) => Promise<void>;
  onAddNote: (note: Omit<Note, "id" | "createdAt">) => Promise<void>;
}

export function NotesGrid({
  notes,
  availableTags,
  onUpdateNote,
  onDeleteNote,
  onGenerateSummary,
  onAddNote,
}: NotesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <NoteAdder onAddNote={onAddNote} availableTags={availableTags} />
      {notes
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            availableTags={availableTags}
            onUpdate={onUpdateNote}
            onDelete={onDeleteNote}
            onGenerateSummary={onGenerateSummary}
          />
        ))}
    </div>
  );
}
