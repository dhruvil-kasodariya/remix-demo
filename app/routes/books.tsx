import { Form, json, redirect, useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { getBooks, deleteBook, createBook, updateBook } from "../../utils/books";
import CreateBookForm from "~/components/createForm";
import UpdateBookForm from "~/components/updateForm";
import { useState } from "react";
import Navbar from "~/components/navbar";
import DeleteConfirmation from "~/components/deleteConfirmation";

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
    const [deleteConfirmation, setDeleteConfirmation] = useState<{
        isOpen: boolean;
        book: Book | null;
    }>({
        isOpen: false,
        book: null,
    });

    const handleUpdateClick = (book: Book) => {
        setSelectedBook(book);
        setShowUpdateForm(true);
    };

    const handleDeleteClick = (book: Book) => {
        setDeleteConfirmation({
            isOpen: true,
            book,
        });
    };

    const closeDeleteConfirmation = () => {
        setDeleteConfirmation({
            isOpen: false,
            book: null,
        });
    };
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                {/* Main content container with responsive layout */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Create Form Section */}
                    <div className="lg:w-1/3 w-full">
                        <div className="sticky top-6">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Add New Book</h2>
                                <CreateBookForm />
                            </div>
                        </div>
                    </div>

                    {/* Books Table Section */}
                    <div className="lg:w-2/3 w-full">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Book List</h2>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Author
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {books.map((book) => (
                                            <tr key={book.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                    {book.title}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                    {book.author}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                    <div className="flex justify-end space-x-2">
                                                        <button
                                                            onClick={() => handleUpdateClick(book)}
                                                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md
                                                                     transition-colors duration-200 text-sm"
                                                        >
                                                            Update
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteClick(book)}
                                                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md
                                                                     transition-colors duration-200 text-sm"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Update Form Modal */}
                {showUpdateForm && selectedBook && (
                    <UpdateBookForm
                        book={selectedBook}
                        onClose={() => setShowUpdateForm(false)}
                    />
                )}
                {deleteConfirmation.book && (
                    <DeleteConfirmation
                        isOpen={deleteConfirmation.isOpen}
                        bookTitle={deleteConfirmation.book.title}
                        bookId={deleteConfirmation.book.id}
                        onClose={closeDeleteConfirmation}
                    />
                )}
            </div>
        </div>
    );

}