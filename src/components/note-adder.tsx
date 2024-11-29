"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type Note, type Tag } from "@/types/note";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface NoteAdderProps {
  onAddNote: (note: Omit<Note, "id" | "createdAt">) => Promise<void>;
  availableTags: Tag[];
}

export function NoteAdder({ onAddNote, availableTags }: NoteAdderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [newNote, setNewNote] = React.useState({
    title: "",
    content: "",
    tags: [] as Tag[],
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onAddNote(newNote);
      setNewNote({ title: "", content: "", tags: [] });
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Card
          className="relative flex h-full cursor-pointer flex-col items-center justify-center overflow-hidden bg-white p-6 text-black"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="mb-2 h-8 w-8 text-gray-400" />
          <p className="text-sm font-medium text-gray-600">Add New Note</p>
        </Card>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newNote.title}
                  onChange={(e) =>
                    setNewNote({ ...newNote, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newNote.content}
                  onChange={(e) =>
                    setNewNote({ ...newNote, content: e.target.value })
                  }
                  rows={8}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {newNote.tags?.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant="secondary"
                      className="flex items-center gap-1 bg-gray-100 text-gray-600"
                    >
                      {tag.name}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setNewNote({
                            ...newNote,
                            tags: newNote.tags?.filter((t) => t.id !== tag.id),
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
                        !newNote.tags?.some((t) => t.id === tagId)
                      ) {
                        setNewNote({
                          ...newNote,
                          tags: [...(newNote.tags || []), selectedTag],
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
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setNewNote({ title: "", content: "", tags: [] });
                  setIsOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white" />
                    Saving...
                  </div>
                ) : (
                  "Add Note"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
