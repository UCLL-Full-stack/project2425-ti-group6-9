import React from 'react';
import { Book } from '@types';
import Link from 'next/link';

type Props = {
  books: Book[];
  selectBook: (book: Book) => void;
};

const BookOverviewTable: React.FC<Props> = ({ books, selectBook }: Props) => {
  return (
    <>
      {books && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Length</th>
              <th scope="col">Synopsis</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index} onClick={() => selectBook(book)} role="button">
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.length}</td>
                <td>{book.synopsis}</td>
                <td>
                  <Link href={`/review/${book.id}`}>
                    <button>Write Review</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default BookOverviewTable;
