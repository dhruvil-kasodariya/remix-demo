import { Form, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";

export default function CreateBookForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    useEffect(() => {
        if (!isSubmitting && formRef.current) {
            formRef.current.reset();
        }
    }, [isSubmitting]);

    return (
        <div className="divide-y max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Add New Book</h2>
            <Form ref={formRef} method="post" className="space-y-4">
                <div className="space-y-2 mt-2">
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
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2 text-white rounded-md transition-colors duration-200
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                             dark:focus:ring-offset-gray-800
                             ${isSubmitting
                            ? 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                        }`}
                >
                    {isSubmitting ? 'Creating...' : 'Create Book'}
                </button>
            </Form>
        </div>
    );
}