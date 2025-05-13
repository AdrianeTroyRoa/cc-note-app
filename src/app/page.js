"use client";

import { useState } from "react";
import { logout } from "./logout/actions";

export default function Home() {
  const [username, setUsername] = useState("Hector");
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");

  const addNote = () => {
    if (heading.trim() && content.trim()) {
      setNotes([
        ...notes,
        {
          heading,
          content,
          dateSaved: new Date().toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }),
        },
      ]);
      setHeading("");
      setContent("");
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
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

        {/* Add Note Button */}
        {username && (
          <button
            onClick={() => setShowModal(true)}
            className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Note
          </button>
        )}

        {/* Notes Display */}
        {username && (
          <div className="space-y-4">
            {notes.map((note, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded shadow">
                <h3 className="text-lg font-bold">{note.heading}</h3>
                <p className="text-gray-800">{note.content}</p>
                <br />
                <p className="text-sm text-gray-400">
                  Published: <span className="font-bold">{note.dateSaved}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">New Note</h2>

            <input
              type="text"
              placeholder="Heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded"
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={addNote}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
