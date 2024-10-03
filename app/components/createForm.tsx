import { Form } from "@remix-run/react";

export default function CreateBookForm() {
    return (
        <div className="divide-y max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Add New Book</h2>
            <Form method="post" className="space-y-4">
                <div className="space-y-2">
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                 placeholder-gray-400 dark:placeholder-gray-500"
                        placeholder="Enter book title"
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="author"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                        Author
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                 placeholder-gray-400 dark:placeholder-gray-500"
                        placeholder="Enter author name"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 
                             dark:bg-blue-600 dark:hover:bg-blue-700
                             rounded-md transition-colors duration-200
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                             dark:focus:ring-offset-gray-800"
                >
                    Create Book
                </button>
            </Form>
        </div>
    );
}