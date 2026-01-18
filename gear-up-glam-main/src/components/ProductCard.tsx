import { ShoppingCart, Heart, Eye } from "lucide-react";
import { useState } from "react";
import ProductModal from "./ProductModal";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
}

const ProductCard = ({ id, image, name, category, price, originalPrice }: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    addToCart({ id, image, name, category, price, originalPrice });
  };

  return (
    <>
      <div className="card-racing group overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">
              -{discount}%
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
              <Heart className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>

          {/* Add to Cart Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button 
              onClick={handleAddToCart}
              className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-md flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <span className="text-xs text-primary uppercase tracking-wider font-medium">
            {category}
          </span>
          <h3 className="font-display text-lg mt-1 line-clamp-1">{name}</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xl font-bold">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Learn More Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-4 py-2 px-4 border border-primary text-primary font-semibold rounded-md hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={{ id, name, category, price, originalPrice, image }}
      />
    </>
  );
};

export default ProductCard;
