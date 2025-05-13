"use server";

import { deleteTheNote, postNote, updateTheNote } from "../db/notes";

export async function createNote(formData) {
  const newNote = {
    title: formData.title,
    content: formData.content,
    authorId: formData.authorId,
  };

  try {
    await postNote(newNote);
    return { success: true };
  } catch (error) {
    console.error("Error creating note:", error);
    return { error: "Failed to create note" };
  }
}

export async function updateNote(noteData) {
  try {
    await updateTheNote(noteData);
    return { success: true };
  } catch (error) {
    console.error("Error updating note:", error);
    return { error: "Failed to update note" };
  }
}

export async function deleteNote(noteId) {
  try {
    await deleteTheNote(noteId);
  } catch (error) {
    console.error("Error deleting note:", error);
    return { error: "Failed to delete note" };
  }
}
