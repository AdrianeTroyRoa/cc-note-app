const { PrismaClient } = require("../../../generated/prisma");
const db = new PrismaClient();

export async function getNotes() {
  try {
    const allNotes = await db.note.findMany();
    console.log(allNotes);
    return allNotes;
  } catch (err) {
    console.error("getNotes error:", err);
    return [];
  }
}

export async function getNotesById(userId) {
  try {
    const allNotes = await db.note.findMany({
      where: {
        authorId: userId,
      },
    });
    console.log(allNotes);
    return allNotes;
  } catch (err) {
    console.error("getNotes error:", err);
    return [];
  }
}

export async function postNote(newNote) {
  try {
    await db.note.create({
      data: {
        title: newNote.title,
        content: newNote.content,
        authorId: newNote.authorId,
      },
    });
  } catch (err) {
    console.error("postNote error:", err);
  }
}

export async function updateTheNote(noteToUpdate) {
  try {
    await db.note.update({
      where: {
        id: noteToUpdate.id,
      },
      data: {
        title: noteToUpdate.title,
        content: noteToUpdate.content,
      },
    });
  } catch (err) {
    console.error("updateNote error:", err);
  }
}

export async function deleteTheNote(noteId) {
  try {
    await db.note.delete({
      where: {
        id: noteId,
      },
    });
  } catch (err) {
    console.error("deleteNote error:", err);
  }
}

// Optionally: Disconnect on app shutdown only, if needed
process.on("beforeExit", async () => {
  await db.$disconnect();
});
