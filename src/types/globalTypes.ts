export interface ProductFormValues {
  id?: number;
  title: string;
  price: number;
  description: string;
  photo?: string;
  status?: string;
  categoryId: string;
  userId: string;
}

  export interface Product {
    id: string;
    image: string;
    title: string;
    price: number;
    photo: string;
    description: string;
    categoryId?: string;
    status?: string;
  };


export interface UserFormsValues {
    name: string;
    email: string;
    password: string;
    phone?: string;
    photo: string
}

export interface LoginPayload {
  email: string,
  password: string
}

export interface LoginResponse {
  token: string,
  user: {
    id: string,
    name: string,
    email: string,
    phone: string,
    photo: string
  }
}

export interface AuthContextProps {
  user: LoginResponse["user"] | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}