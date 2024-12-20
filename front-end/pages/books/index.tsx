import Header from "@components/header";
import BookOverviewTable from "@components/books/BookOverviewTable";
import ReviewOverviewTable from "@components/reviews/ReviewOverviewTable";
import BookService from "@services/BookService";
import ReviewService from "@services/ReviewService";
import { Book, Review } from "@types";
import Head from "next/head";
import { useEffect, useState } from "react";
import AddBookForm from "@components/books/AddBookForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Books: React.FC = () => {
    
    const { t } = useTranslation();
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    
    const getBooks = async () => {
        const response = await BookService.getAllBooks();
        console.log(response);
        const json = await response.json();
        setBooks(json);
    };

    const getReviews = async (bookId: number) => {
        const response = await ReviewService.getAllReviewsByBookId(bookId);
        const json = await response.json();
        console.log(json);
        setReviews(json);
    };

    const handleAddBook = (newBook: Book) => {
        setBooks((prevBooks) => [...prevBooks, newBook]);
      };

    useEffect(() => {
        getBooks();
    }, []);

    useEffect(() => {
        if (selectedBook) {
            if (selectedBook.id !== undefined) {
                getReviews(selectedBook.id);
            }
        }
    }, [selectedBook]);

    return (
        <>
            <Head>
                <title>Books</title>
            </Head>
                
            <Header />

            <main className="d-flex flex-column justify-content-center align-items-center bg-white">
                <h1>Books</h1>
                <section>
                    <h2>Books overview</h2>
                </section>

                <AddBookForm />

                {books && <BookOverviewTable books={books} selectBook={setSelectedBook} />}
                {selectedBook && (
                    <section className="mt-5">
                        <h2 className="text-center">
                            {t('review.by')} {selectedBook.title}
                        </h2>
                        {reviews && (
                            <ReviewOverviewTable reviews={reviews} />
                        )}
                    </section>
                )}
            </main>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any}) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default Books;