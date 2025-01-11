import { Book } from "@/types";
import { FC } from "react";
import { BookCard } from "./book-card";

interface BookListProps {
  title: string;
  books: Book[];
  containerClassName?: string;
}
export const BookList: FC<BookListProps> = ({
  title,
  books,
  containerClassName,
}) => {
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      <ul className="book-list">
        {books.map((book) => (
          <BookCard {...book} key={book.id} />
        ))}
      </ul>
    </section>
  );
};
