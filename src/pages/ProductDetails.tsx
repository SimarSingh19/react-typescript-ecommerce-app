import { useAppDispatch, useAppSelector } from "../app/hooks";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

import { addToCart } from "../features/cart/cartSlice";

import { fetchProductById, clearSelectedProduct } from "../features/products/productsSlice";

import { selectSelectedProduct, selectProductsLoading, selectProductsError } from "../features/products/productsSelectors";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const product = useAppSelector(selectSelectedProduct);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(clearSelectedProduct());
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!product) {
    return <h2>No product found <Loader /></h2>;
  }

  return (
    <>
      <div className="product_details_page">
        <div className="app_container">
          <div className="product_details_card app_card">
            <div className="row g-4 align-items-center">
              <div className="col-md-6">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product_details_img"
                />
              </div>

              <div className="col-md-6">
                <h1>{product.title}</h1>

                <p className="text-muted text-capitalize">
                  {product.category}
                </p>

                <div className="product_details_price">
                  ₹{product.price}
                </div>

                <p>{product.description}</p>

                <p>
                  <strong>Brand:</strong> {product?.brand || "N/A"}
                </p>

                <button
                  className="app_btn app_btn_primary"
                  onClick={() => dispatch(addToCart(product))}
                >
                  <i className="fa-solid fa-cart-plus"></i> Add to Cart
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;