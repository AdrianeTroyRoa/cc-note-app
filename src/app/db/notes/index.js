const { PrismaClient } = require("../../../generated/prisma");

const db = new PrismaClient();

async function getNotes() {
  try {
    const allNotes = await db.note.findMany();
    await db.$disconnect();
    console.log(allNotes);
    return allNotes;
  } catch (err) {
    console.error(err);
    await db.$disconnect();
    return;
  }
}

async function postNote() {
  try {
    await db.note.create({
      data: {
        title: "Goodbye",
        content: "this is a sentiment of goodbye...",
        authorId: 1,
      },
    });
    await db.$disconnect();
    await getNotes();
  } catch (err) {
    console.error(err);
    await db.$disconnect();
    return;
  }
}

async function updateNote(noteToUpdate) {
  await db.note.update({
    where: {
      id: noteToUpdate.id,
    },
    data: {
      title: noteToUpdate.title,
      content: noteToUpdate.content,
    },
  });
}

async function deleteNote(noteToDelete) {
  await db.note.delete({
    where: {
      id: noteToDelete.id,
    },
  });
}

//postNote(); -- for testing purposes
