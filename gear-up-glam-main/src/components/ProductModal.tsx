import { X, ShoppingCart, Heart, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id?: number;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    image: string;
    description?: string;
  } | null;
}

const ProductModal = ({ isOpen, onClose, product }: ProductModalProps) => {
  const { addToCart } = useCart();
  
  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (product.id) {
      addToCart({
        id: product.id,
        image: product.image,
        name: product.name,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice,
      });
      onClose();
    }
  };

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-card border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="relative aspect-square bg-secondary overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded">
                  -{discount}% OFF
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-8 flex flex-col">
              <span className="text-primary uppercase tracking-wider text-sm font-medium">
                {product.category}
              </span>
              
              <h2 className="font-display text-3xl mt-2">{product.name}</h2>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-4 w-4 ${star <= 4 ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(128 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mt-4">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground mt-4 leading-relaxed">
                {product.description || 
                  "Premium quality motorcycle part designed for maximum performance. Manufactured with precision engineering and tested under extreme conditions to ensure reliability on the track and street."}
              </p>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mt-6 py-4 border-t border-b border-border">
                <div className="flex flex-col items-center text-center">
                  <Truck className="h-5 w-5 text-primary mb-1" />
                  <span className="text-xs text-muted-foreground">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="h-5 w-5 text-primary mb-1" />
                  <span className="text-xs text-muted-foreground">2 Year Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <RotateCcw className="h-5 w-5 text-primary mb-1" />
                  <span className="text-xs text-muted-foreground">30 Day Returns</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <Button 
                  className="flex-1 btn-racing"
                  onClick={handleAddToCart}
                  disabled={!product.id}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="border-border hover:border-primary">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Stock Status */}
              <p className="text-sm text-green-500 mt-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                In Stock - Ships within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
