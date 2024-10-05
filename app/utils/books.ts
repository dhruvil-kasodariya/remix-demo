import { Book } from "@prisma/client";
import { db } from "./db.server";

type CreateBookInput = Omit<Book, "id">;

export async function getBooks(): Promise<Book[]> {
  return db.book.findMany();
}

export async function getBookById(id: string): Promise<Book | null> {
  return db.book.findUnique({
    where: { id: parseInt(id) },
  });
}

export async function createBook(book: CreateBookInput): Promise<Book> {
  return db.book.create({
    data: book,
  });
}

export async function updateBook(
  id: string,
  book: Partial<CreateBookInput>
): Promise<Book> {
  return db.book.update({
    where: { id: parseInt(id) },
    data: book,
  });
}

export async function deleteBook(id: string): Promise<Book> {
  return db.book.delete({
    where: { id: parseInt(id) },
  });
}
