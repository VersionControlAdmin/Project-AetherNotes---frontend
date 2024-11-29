"use client";

import { useState } from "react";
import { type Note, type Tag } from "@/types/note";
import { NoteCard } from "@/components/note-card";
import { NoteAdder } from "@/components/note-adder";
import { Button } from "@/components/ui/button";
import { Wand2, Loader2 } from "lucide-react";
import { ActionPlanPopup } from "@/components/action-plan-popup";

interface NotesGridProps {
  notes: Note[];
  availableTags: Tag[];
  onUpdateNote: (id: string, updates: Partial<Note>) => Promise<void>;
  onDeleteNote: (id: string) => Promise<void>;
  onGenerateSummary: (id: string) => Promise<void>;
  onGenerateActionPlan: () => Promise<string>;
  onAddNote: (note: Omit<Note, "id" | "createdAt">) => Promise<void>;
}

export function NotesGrid({
  notes,
  availableTags,
  onUpdateNote,
  onDeleteNote,
  onGenerateSummary,
  onGenerateActionPlan,
  onAddNote,
}: NotesGridProps) {
  const [isGeneratingActionPlan, setIsGeneratingActionPlan] = useState(false);
  const [actionPlan, setActionPlan] = useState<string | null>(null);

  const handleGenerateActionPlan = async () => {
    setIsGeneratingActionPlan(true);
    try {
      const generatedActionPlan = await onGenerateActionPlan();
      setActionPlan(generatedActionPlan);
    } finally {
      setIsGeneratingActionPlan(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
      <div className="flex justify-center py-12">
        <Button
          variant="outline"
          className="gap-2 px-6 py-3 text-lg font-medium bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white border-none shadow-md hover:shadow-lg transition-all duration-200"
          onClick={handleGenerateActionPlan}
          disabled={isGeneratingActionPlan}
        >
          {isGeneratingActionPlan ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Wand2 className="h-5 w-5" />
          )}
          Generate Action Plan for All Notes
        </Button>
      </div>
      <ActionPlanPopup
        isOpen={!!actionPlan}
        onClose={() => setActionPlan(null)}
        actionPlan={actionPlan}
      />
    </div>
  );
}
