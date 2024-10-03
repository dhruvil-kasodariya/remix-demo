import { PrismaClient, Book } from "@prisma/client";

const prisma = new PrismaClient();

type CreateBookInput = Omit<Book, "id">;

export async function getBooks(): Promise<Book[]> {
  return prisma.book.findMany();
}

export async function getBookById(id: string): Promise<Book | null> {
  return prisma.book.findUnique({
    where: { id: parseInt(id) },
  });
}

export async function createBook(book: CreateBookInput): Promise<Book> {
  return prisma.book.create({
    data: book,
  });
}

export async function updateBook(
  id: string,
  book: Partial<CreateBookInput>
): Promise<Book> {
  return prisma.book.update({
    where: { id: parseInt(id) },
    data: book,
  });
}

export async function deleteBook(id: string): Promise<Book> {
  return prisma.book.delete({
    where: { id: parseInt(id) },
  });
}
