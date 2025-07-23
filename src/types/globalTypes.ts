export interface ProductFormValues {
  id?: number;
  title: string;
  price: number;
  description: string;
  image?: string;
  status?: string;
  categoryId: string;
}


export interface UserFormsValues {
    name: string;
    email: string;
    password: string;
    phone?: string;
    photo: string
}