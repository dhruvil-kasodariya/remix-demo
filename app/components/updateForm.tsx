import { Form, useSubmit } from "@remix-run/react";
import { useState } from "react";

type Book = {
    id: string;
    title: string;
    author: string;
};

export default function UpdateBookForm({
    book,
    onClose,
}: {
    book: Book;
    onClose: () => void;
}) {
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const submit = useSubmit();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        submit(formData, {
            method: "PATCH",
            action: `/books?id=${book.id}`,
        });

        onClose();
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (

        <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleOverlayClick}
        >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl transform transition-all">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Update Book</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <Form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Author
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                    </div>
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md
                                     transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
                                     dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800
                                     dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200
                                     rounded-md transition-colors duration-200
                                     focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

