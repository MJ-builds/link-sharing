import crypto from "crypto";

import { prisma } from "~/db/prisma";

export async function accountExists(email: string) {
  let account = await prisma.user.findUnique({
    where: { email: email },
    select: { id: true },
  });

  return Boolean(account);
}

export async function createAccount(email: string, password: string) {
  let salt = crypto.randomBytes(16).toString("hex");
  let hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha256")
    .toString("hex");

  return prisma.user.create({
    data: {
      email: email,
      Password: { create: { hash, salt } },
    },
  });
}

export async function login(email: string, password: string) {
  let user = await prisma.user.findUnique({
    where: { email: email },
    include: { Password: true },
  });

  if (!user || !user.Password) {
    return false;
  }

  let hash = crypto
    .pbkdf2Sync(password, user.Password.salt, 1000, 64, "sha256")
    .toString("hex");

  if (hash !== user.Password.hash) {
    return false;
  }
  return user.id;
}
