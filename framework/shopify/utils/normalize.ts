import { Product as ShopifyProduct, ImageEdge } from "../schema"
import { Product } from "@common/types/product"

const normalizeProductImage = ({ edges }: { edges: ImageEdge[] }) =>
    edges.map(({ node: { originalSrc: url, ...rest } }) => ({
        url: `/images/${url}`,
        ...rest,
    }))

export function normalizeProduct(productNode: ShopifyProduct): Product {
    const { id, title: name, handle, vendor, images: imageConnection, description, ...rest } = productNode

    const product = {
        id,
        name,
        vendor,
        description,
        path: `/${handle}`,
        slug: handle.replace(/^\/+|\/+$/g, ""),
        images: normalizeProductImage(imageConnection),

        ...rest,
    }
    return product
}
