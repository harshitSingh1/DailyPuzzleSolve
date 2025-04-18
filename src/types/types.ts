export interface Puzzle {
  _id: string;
  heading: string;
  ytVideo: string;
  screenshots: string[];
  createdAt: Date;
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