import { Form, json, redirect, useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { getBooks, deleteBook, createBook, updateBook } from "../../utils/books";
import CreateBookForm from "~/components/createForm";
import UpdateBookForm from "~/components/updateForm";
import { useState } from "react";

type Book = {
    id: string;
    title: string;
    author: string;
};

type BookData = Omit<Book, 'id'>;

export async function action({ request }: ActionFunctionArgs) {
    if (request.method === "DELETE") {
        const url = new URL(request.url);
        const bookId = url.searchParams.get("id");
        if (!bookId) throw new Error("Book ID is required");
        await deleteBook(bookId);
    } else if (request.method === "PATCH") {
        const url = new URL(request.url);
        const bookId = url.searchParams.get("id");
        if (!bookId) throw new Error("Book ID is required");
        const formData = await request.formData();
        const bookData = Object.fromEntries(formData) as BookData;
        await updateBook(bookId, bookData);
    } else {
        const formData = await request.formData();
        const bookData = Object.fromEntries(formData) as BookData;
        await createBook(bookData);
    }
    return redirect("/books");
}

export const loader: LoaderFunction = async () => {
    const books = await getBooks();
    return json(books);
};

export default function Book() {
    const books = useLoaderData<typeof loader>() as Book[];
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const handleUpdateClick = (book: Book) => {
        setSelectedBook(book);
        setShowUpdateForm(true);
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-extrabold">Books</h1>
            <div className="h-fit flex justify-center items-center flex-col max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">

                <CreateBookForm />
            </div>
            <div>
                <ul className="books-list">
                    {books.map((book: Book) => (
                        <li key={book.id} className="book-item">
                            <div className="book-title">{book.title}</div>
                            <div className="book-author">by {book.author}</div>
                            <div className="book-buttons">
                                <Form method="delete" action={`/books?id=${book.id}`}>
                                    <button type="submit">Delete</button>
                                </Form>
                                <button onClick={() => handleUpdateClick(book)}>Update</button>
                            </div>
                        </li>
                    ))}
                </ul>
                {showUpdateForm && selectedBook && (
                    <UpdateBookForm
                        book={selectedBook}
                        onClose={() => setShowUpdateForm(false)}
                    />
                )}
            </div>
        </div>
    );
}