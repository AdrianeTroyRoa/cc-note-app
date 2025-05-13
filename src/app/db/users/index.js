const { PrismaClient } = require("../../../generated/prisma");

const db = new PrismaClient();

export async function getUsers() {
  try {
    const allUsers = await db.user.findMany();
    console.log(allUsers);
    return allUsers;
  } catch (err) {
    console.error("getUsers error:", err);
    return [];
  }
}

export async function getUser(userEmail) {
  try {
    const user = await db.user.findFirst({
      where: {
        email: userEmail,
      },
    });
    return user;
  } catch (err) {
    console.error("getUser error:", err);
    return null;
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
  } catch (err) {
    console.error("postUser error:", err);
  }
}

export async function updateUser(userToUpdate) {
  try {
    const existingUser = await db.user.findUnique({
      where: { id: userToUpdate.id },
    });

    if (!existingUser) {
      console.warn("User not found");
      return;
    }

    await db.user.update({
      where: { id: userToUpdate.id },
      data: {
        email: userToUpdate.email ?? existingUser.email,
        name: userToUpdate.name ?? existingUser.name,
      },
    });
  } catch (err) {
    console.error("updateUser error:", err);
  }
}

export async function deleteUser(userToDelete) {
  try {
    await db.user.delete({
      where: {
        id: userToDelete.id,
      },
    });
  } catch (err) {
    console.error("deleteUser error:", err);
  }
}

// Disconnect Prisma on shutdown
process.on("beforeExit", async () => {
  await db.$disconnect();
});
