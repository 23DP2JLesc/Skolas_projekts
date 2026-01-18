import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { getFeaturedProducts } from "@/data/products";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  
  return (
    <section id="products" className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-primary uppercase tracking-wider text-sm font-medium">
              Featured Collection
            </span>
            <h2 className="font-display text-4xl md:text-5xl mt-2">Top Sellers</h2>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/products");
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
          >
            View All Products
            <span className="text-primary">→</span>
          </button>
        </div>

        {/* Glow Line */}
        <div className="glow-line mb-12" />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {getFeaturedProducts().slice(0, 4).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
