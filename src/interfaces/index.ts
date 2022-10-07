export interface IProduct {
  id?: number,
  name?: string,
  amount?: string,
  orderId?: number,
}

export interface IUser {
  id?: number,
  username?: string,
  classe?: string,
  level?: 10,
  password?: string,
}

export interface IOrder {
  id: number,
  userId: number,
  productsIds: number[],
}