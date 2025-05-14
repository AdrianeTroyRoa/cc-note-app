"use client";

import { useState } from "react";
import { logout } from "./logout/actions";
import { createNote, updateNote, deleteNote } from "./actions/notes";

export default function Home({ username, userId, oldNotes }) {
  const [notes, setNotes] = useState(oldNotes || []);
  const [showModal, setShowModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCurrentNote(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (note) => {
    setCurrentNote(note);
    setTitle(note.title);
    setContent(note.content);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    const noteData = {
      title,
      content,
      authorId: userId,
    };
    const now = new Date().toISOString();

    try {
      if (currentNote) {
        // Optimistically update local state
        const updatedNote = {
          ...currentNote,
          title,
          content,
          updatedAt: now,
        };

        setNotes((prev) =>
          prev.map((note) => (note.id === currentNote.id ? updatedNote : note)),
        );

        // Fire-and-forget the DB update
        updateNote({
          ...noteData,
          id: currentNote.id,
          updatedAt: now,
        }).catch((error) => {
          console.error("Update failed:", error);
          // Rollback on error
          setNotes((prev) =>
            prev.map((note) =>
              note.id === currentNote.id ? currentNote : note,
            ),
          );
        });
      } else {
        // Generate temporary ID for optimistic update
        const tempId = `temp-${crypto.randomUUID()}`;

        // Create full note object locally
        const localNote = {
          id: tempId,
          title,
          content,
          createdAt: now,
          updatedAt: now,
          authorId: userId,
          isTemp: true,
        };

        // Optimistically add to local state
        setNotes((prev) => [...prev, localNote]);

        // Create in DB and replace temp note when response comes
        createNote(noteData)
          .then((savedNote) => {
            setNotes((prev) =>
              prev.map((note) =>
                note.id === tempId
                  ? {
                      ...note, // keep local title, content, etc.
                      ...savedNote, // apply server-confirmed fields (e.g., real id)
                      isTemp: false, // mark as saved
                    }
                  : note,
              ),
            );
          })
          .catch((error) => {
            console.error("Creation failed:", error);
            // Mark as failed instead of removing
            setNotes((prev) =>
              prev.map((note) =>
                note.id === tempId
                  ? { ...note, error: true, isTemp: false }
                  : note,
              ),
            );
          });
      }

      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Operation failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (noteId) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      // Optimistically remove from local state
      const deletedNote = notes.find((note) => note.id === noteId);
      setNotes((prev) => prev.filter((note) => note.id !== noteId));

      // Only call deleteNote if it's not a temp note
      if (!deletedNote?.isTemp) {
        deleteNote(noteId).catch((error) => {
          console.error("Deletion failed:", error);
          // Rollback if delete fails
          setNotes((prev) => [...prev, deletedNote]);
        });
      }
    } catch (error) {
      console.error("Deletion failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{`Welcome, ${username}!`}</h1>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </form>
        </div>

        <button
          onClick={openAddModal}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Note
        </button>

        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`bg-gray-100 p-4 rounded shadow relative transition-all ${
                note.error ? "border-2 border-red-500" : ""
              } ${note.isTemp ? "opacity-80" : ""}`}
            >
              {note.isTemp && (
                <div className="absolute top-2 right-2 text-xs bg-yellow-500 text-white px-2 py-1 rounded">
                  Saving...
                </div>
              )}
              {note.error && (
                <div className="text-red-500 text-sm mb-2">
                  Failed to save note
                </div>
              )}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{note.title}</h3>
                  <p className="text-gray-800">{note.content}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {note.createdAt &&
                      `Created: ${new Date(note.createdAt).toLocaleString()}`}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      !note.isTemp && !note.error && openEditModal(note)
                    }
                    disabled={note.isTemp || note.error}
                    className={`px-2 py-1 text-white rounded text-sm ${
                      note.isTemp || note.error
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    }`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => !note.error && handleDelete(note.id)}
                    disabled={note.error}
                    className={`px-2 py-1 text-white rounded text-sm ${
                      note.error
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {currentNote ? "Edit Note" : "New Note"}
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded"
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded"
              rows={5}
            />
            <div className="flex justify-between">
              {currentNote && (
                <button
                  onClick={() => handleDelete(currentNote.id)}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300"
                >
                  {isSubmitting ? "Deleting..." : "Delete"}
                </button>
              )}
              <div className="flex space-x-2 ml-auto">
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !title.trim() || !content.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {isSubmitting
                    ? currentNote
                      ? "Updating..."
                      : "Saving..."
                    : currentNote
                      ? "Update"
                      : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
