import Header from "@components/header";
import BookOverviewTable from "@components/books/BookOverviewTable";
import BookService from "@services/BookService";
import { Book } from "@types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Books: React.FC = () => {
    
    const [books, setBooks] = useState<Array<Book>>([]);
    
    const getBooks = async () => {
        const response = await BookService.getAllBooks();
        const json = await response.json();
        setBooks(json);
    };

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <>
            <Head>
                <title>Books</title>
            </Head>
                
            <Header />

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Books</h1>
                <section>
                    <h2>Books overview</h2>
                </section>

                {books && <BookOverviewTable books={books} />}
            </main>
        </>
    );
};

export default Books;