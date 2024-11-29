"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Loader2, Plus, Trash2, Wand2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Shimmer } from "@/components/ui/shimmer";
import { type Note, type Tag } from "@/types/note";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActionPlanPopup } from "@/components/action-plan-popup";

interface NoteCardProps {
  note: Note;
  availableTags: Tag[];
  onUpdate: (id: string, updates: Partial<Note>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onGenerateSummary: (id: string) => Promise<void>;
  isNewNoteTemplate?: boolean;
}

export function NoteCard({
  note,
  availableTags,
  onUpdate,
  onDelete,
  onGenerateSummary,
  isNewNoteTemplate = false,
}: NoteCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(isNewNoteTemplate);
  const [isGeneratingSummary, setIsGeneratingSummary] = React.useState(false);
  const [actionPlan, setActionPlan] = React.useState<string | null>(null);
  const [editedNote, setEditedNote] = React.useState(note);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (isNewNoteTemplate) {
        const { isNew, ...noteWithoutIsNew } = editedNote;
        await onUpdate(note.id, {
          ...noteWithoutIsNew,
          createdAt: new Date().toISOString(),
        });
      } else {
        await onUpdate(note.id, editedNote);
      }
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    await onGenerateSummary(note.id);
    setIsGeneratingSummary(false);
  };

  // Handle opening the dialog for new note
  React.useEffect(() => {
    if (isNewNoteTemplate && note.isNew) {
      setIsOpen(true);
      setIsEditing(true);
    }
  }, [isNewNoteTemplate, note.isNew]);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {isNewNoteTemplate ? (
          <Card
            className="relative flex h-full cursor-pointer flex-col items-center justify-center overflow-hidden bg-white p-6 text-black"
            onClick={() => setIsOpen(true)}
          >
            <Plus className="mb-2 h-8 w-8 text-gray-400" />
            <p className="text-sm font-medium text-gray-600">Add New Note</p>
          </Card>
        ) : (
          <Card
            className="relative cursor-pointer overflow-hidden bg-white text-black"
            onClick={() => setIsOpen(true)}
          >
            {isGeneratingSummary && <Shimmer />}
            <CardHeader>
              <h3 className="text-lg font-semibold">{note.title}</h3>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-sm text-gray-600">
                {note.content}
              </p>
              {note.summary && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-900">Summary</p>
                  <p className="line-clamp-2 text-sm text-gray-600">
                    {note.summary}
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="flex flex-wrap gap-2">
                {note.tags?.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="bg-gray-100 text-gray-600"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        )}
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEditing
                ? isNewNoteTemplate
                  ? "Add New Note"
                  : "Edit Note"
                : note.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editedNote.title}
                    onChange={(e) =>
                      setEditedNote({ ...editedNote, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={editedNote.content}
                    onChange={(e) =>
                      setEditedNote({ ...editedNote, content: e.target.value })
                    }
                    rows={8}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {editedNote.tags?.map((tag) => (
                      <Badge
                        key={tag.id}
                        variant="secondary"
                        className="flex items-center gap-1 bg-gray-100 text-gray-600"
                      >
                        {tag.name}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setEditedNote({
                              ...editedNote,
                              tags: editedNote.tags?.filter(
                                (t) => t.id !== tag.id
                              ),
                            });
                          }}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    <Select
                      onValueChange={(tagId) => {
                        const selectedTag = availableTags.find(
                          (t) => t.id === tagId
                        );
                        if (
                          selectedTag &&
                          !editedNote.tags?.some((t) => t.id === tagId)
                        ) {
                          setEditedNote({
                            ...editedNote,
                            tags: [...(editedNote.tags || []), selectedTag],
                          });
                        }
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Add tag..." />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTags.map((tag) => (
                          <SelectItem key={tag.id} value={tag.id}>
                            {tag.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="whitespace-pre-wrap text-gray-600">
                  {note.content}
                </p>
                {note.summary && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-2 font-medium">AI Summary</h4>
                    <p className="text-sm text-gray-600">{note.summary}</p>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {note.tags?.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant="secondary"
                      className="bg-gray-100 text-gray-600"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Created on {new Date(note.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
            <div className="flex justify-between">
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white" />
                          Saving...
                        </div>
                      ) : (
                        "Save"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditedNote(note);
                        setIsEditing(false);
                        if (isNewNoteTemplate) {
                          setIsOpen(false);
                        }
                      }}
                      disabled={isSaving}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => setIsEditing(true)}>Edit</Button>
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={handleGenerateSummary}
                      disabled={isGeneratingSummary}
                    >
                      {isGeneratingSummary ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Wand2 className="h-4 w-4" />
                      )}
                      {note.summary ? "Regenerate Summary" : "Generate Summary"}
                    </Button>
                  </>
                )}
              </div>
              {!isNewNoteTemplate && (
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    onDelete(note.id);
                    setIsOpen(false);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ActionPlanPopup
        isOpen={!!actionPlan}
        onClose={() => setActionPlan(null)}
        actionPlan={actionPlan}
      />
    </>
  );
}
