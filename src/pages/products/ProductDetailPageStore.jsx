import { useGetProductById } from "../../api/products/getProductById";
import { useUpdateProduct } from "../../api/products/createProducts";

export const ProductDetailPageStore = (productId, initialProduct = null) => {
    const { data: fetchedProduct, isPending: fetchPending } = useGetProductById(productId, { enabled: !initialProduct });
    const product = initialProduct ?? fetchedProduct;
    const isPending = !initialProduct && fetchPending;
    const { mutate: updateProduct } = useUpdateProduct();

    return { isPending, product, updateProduct };
};
