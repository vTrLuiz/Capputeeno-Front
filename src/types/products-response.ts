import { Product } from "./products"

export interface ProductsFetchResponse {
    data: {
        allProducts: Product []
    }
}
