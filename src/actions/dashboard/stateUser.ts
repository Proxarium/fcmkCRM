"use server";
import prisma from "@/lib/client";
import { Prisma } from "@prisma/client";

export interface User {
  id: string;
  username: string;
  avatar: string | null;
  cover: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export async function getUsers(
  skip: number = 0,
  take: number = 10
): Promise<User[]> {
  return await prisma.user.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function updateUser(
  id: string,
  data: Prisma.UserUpdateInput
): Promise<User> {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

export async function getUserById(id: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { id },
  });
}
