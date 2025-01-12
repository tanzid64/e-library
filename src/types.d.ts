export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  total_copies: number;
  available_copies: number;
  description: string;
  color: string;
  cover: string;
  video: string;
  summary: string;
  isLoanedBook?: boolean;
}

export interface AuthCredentials {
  email: string;
  password: string;
  fullName: string;
  universityId: number;
  universityCard: string;
}
