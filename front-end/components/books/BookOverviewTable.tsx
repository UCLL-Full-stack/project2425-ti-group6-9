import React from 'react';
import { Book } from '@types';

type Props = {
  books: Book[];
};

const BookOverviewTable: React.FC<Props> = ({ books }: Props) => {
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
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index} onClick={() => {}} role="button">
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.length}</td>
                <td>{book.synopsis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default BookOverviewTable;
