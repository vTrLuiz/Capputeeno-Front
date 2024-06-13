export interface Product {
    id: any,
    name: string,
    price_in_cents : number,
    image_url: string,
    description?: string,
    category?: string,
}

export interface ProductInCart extends Product {
    image: string | undefined
    quantity: number
}
export interface ProductFetchResponse {
    data: {
        Product: Product
    }
}