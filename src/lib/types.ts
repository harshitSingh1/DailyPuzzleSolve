// src\lib\types.ts
export interface Puzzle {
  _id: string;
  heading: string;
  gameType: "Pinpoint" | "Queens" | "Tango" | "Crossclimb" | "Zip" | "Mini Sudoku";
  ytVideo: string;
  screenshots: string[];
  createdAt: string;
}

export interface ShopItem {
  _id: string;
  image: string;
  productName: string;
  description: string;
  rating: number;
  buttonText: string;
  url: string;
}

export interface Tool {
  _id: string;
  title: string;
  subheading: string;
  image: string;
  url: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
