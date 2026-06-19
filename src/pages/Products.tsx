import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";

import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

import ProductFilter from "../features/products/components/ProductFilter";
import ProductGrid from "../features/products/components/ProductGrid";

function Products() {

  const { products, loading, error, searchTerm, selectedCategory, categories, updateSearch, updateCategory, resetFilters } = useProducts();

  const { items: cartItems, addItem, increaseItem, decreaseItem, removeItem } = useCart();

  if (loading) {return <Loader />;}
  if (error) {return <ErrorMessage message={error} />;}

  return (
    <>
      <div className="products_page">
        <div className="app_container">
          <h1 className="app_page_title">Products</h1>

          <ProductFilter
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            categories={categories}
            onSearchChange={updateSearch}
            onCategoryChange={updateCategory}
            onClearFilters={resetFilters}
          />

          <ProductGrid
            products={products}
            cartItems={cartItems}
            onAddToCart={addItem}
            onIncrease={increaseItem}
            onDecrease={decreaseItem}
            onRemove={removeItem}
          />
        </div>
      </div>
    </>
  );
}

export default Products;