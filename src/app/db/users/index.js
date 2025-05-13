const { PrismaClient } = require("../../../generated/prisma");

const db = new PrismaClient();

export async function getUsers() {
  try {
    const allUsers = await db.user.findMany();
    await db.$disconnect();
    console.log(allUsers);
    return allUsers;
  } catch (err) {
    console.error(err);
    await db.$disconnect();
    return;
  }
}

export async function postUser(userInfo) {
  try {
    await db.user.create({
      data: {
        email: userInfo.email,
        name: userInfo.name,
      },
    });
    await db.$disconnect();
    await getUsers();
  } catch (err) {
    console.error(err);
    await db.$disconnect();
    return;
  }
}

export async function updateUser(userToUpdate) {
  await db.note.update({
    where: {
      id: userToUpdate.id,
    },
    data: {
      email:
        userToUpdate.title ??
        db.note.findUnique({ where: { id: userToUpdate.id } }).email,
      name:
        userToUpdate.title ??
        db.note.findUnique({ where: { id: userToUpdate.id } }).name,
    },
  });
}

export async function deleteUser(userToUpdate) {
  await db.note.delete({
    where: {
      id: userToUpdate.id,
    },
  });
}

getUsers();
//postNote(); -- for testing purposes
