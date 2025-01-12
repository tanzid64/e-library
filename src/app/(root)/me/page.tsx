import { signOut } from "@/auth";
import { BookList } from "@/components/HomePage/book-list";
import { Button } from "@/components/ui/button";
import { SAMPLE_BOOKS } from "@/constants/dummy-data";
import { FC } from "react";

interface MyProfileProps {}

const MyProfile: FC<MyProfileProps> = ({}) => {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>

      <BookList title="Borrowed Books" books={SAMPLE_BOOKS} />
    </>
  );
};

export default MyProfile;
