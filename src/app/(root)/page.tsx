import { BookList } from "@/components/HomePage/book-list";
import { BookOverview } from "@/components/HomePage/book-overview";
import { SAMPLE_BOOKS } from "@/constants/dummy-data";
import { FC } from "react";

const HomePage: FC = () => {
  return (
    <>
      <BookOverview {...SAMPLE_BOOKS[0]} />
      <BookList
        title="Latest Books"
        books={SAMPLE_BOOKS}
        containerClassName="mt-28"
      />
    </>
  );
};

export default HomePage;
