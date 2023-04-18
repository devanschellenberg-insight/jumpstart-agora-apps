import React, { useEffect } from "react";
import { Product, useGlobalContext } from "../providers/GlobalContext";
import Header from "../components/header/Header";
import { IconTrash } from "../images";

function ProductsPage() {
    const { getProducts, products, updateProducts } = useGlobalContext();
    const [productList, setProductList] = React.useState<Product[]>([]);

    //initial data load
    useEffect(() => {
        getProducts && getProducts();
    }, [getProducts]);

    //sets our product list
    useEffect(() => {
        setProductList(products);
    }, [products]);

    const updateProduct = (productId: number, key: string, value: string | number | null) => {
        setProductList((x) => x.map((item) => (item.id === productId ? { ...item, [key]: value } : item)));
    };

    const deleteProduct = (productId: number) => {
        setProductList((x) => x.filter((item) => item.id !== productId));
    };

    const onSaveProducts = () => {
        if (updateProducts) {
            updateProducts(productList);
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col py-4 px-8 px-sm-8 container">
                <h1 className="text-primary mb-2">Product List</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="col-1">
                                ID
                            </th>
                            <th scope="col" className="col-4">
                                Name
                            </th>
                            <th scope="col" className="col-4">
                                Description
                            </th>
                            <th scope="col" className="col-2 text-center">
                                Unit Price
                            </th>
                            <th scope="col" className="col-1 text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {productList.map((item: Product) => {
                            return (
                                <tr key={item.id} className="border-grey border-2 fs-5">
                                    <td className="col-1">{item.id}</td>
                                    <td className="col-4">
                                        <input
                                            className="w-100"
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => updateProduct(item.id, "name", e.currentTarget.value)}
                                        />
                                    </td>
                                    <td className="col-4">
                                        <textarea
                                            className="w-100"
                                            rows={1}
                                            value={item.description}
                                            onChange={(e) =>
                                                updateProduct(item.id, "description", e.currentTarget.value)
                                            }
                                        />
                                    </td>
                                    <td className="col-2 text-center">
                                        <div className="d-flex">
                                            $
                                            <input
                                                className="w-100"
                                                type="number"
                                                value={item.price}
                                                onChange={(e) => updateProduct(item.id, "price", e.currentTarget.value)}
                                            />
                                        </div>
                                    </td>
                                    <td className="col-1 text-center">
                                        <button
                                            className="btn-delete-product border-0"
                                            onClick={() => deleteProduct(item.id)}
                                        >
                                            <IconTrash />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="d-flex">
                    <button
                        id="btn-save-products"
                        className="btn bg-primary text-white px-5 shadow ms-auto"
                        onClick={onSaveProducts}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </>
    );
}

export default ProductsPage;
