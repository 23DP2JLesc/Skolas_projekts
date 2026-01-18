import { Minus, Plus, Trash2, ShoppingCart as CartIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { Separator } from "./ui/separator";

const Cart = () => {
  const { cartItems, isOpen, setIsOpen, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <CartIcon className="h-5 w-5" />
            Shopping Cart
            {getTotalItems() > 0 && (
              <span className="ml-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                {getTotalItems()}
              </span>
            )}
          </SheetTitle>
          <SheetDescription>
            {cartItems.length > 0
              ? `You have ${getTotalItems()} item${getTotalItems() !== 1 ? "s" : ""} in your cart`
              : "Your cart is empty"}
          </SheetDescription>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <CartIcon className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
            <p className="text-lg font-semibold mb-2">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">
              Start shopping to add items to your cart
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-secondary">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold line-clamp-2 mb-1">{item.name}</h3>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                        {item.category}
                      </p>
                      <p className="text-lg font-bold">
                        ${item.price.toFixed(2)}
                        {item.originalPrice && (
                          <span className="ml-2 text-sm text-muted-foreground line-through font-normal">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-auto text-destructive hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Cart Summary */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 btn-racing"
                  onClick={() => {
                    // In a real app, this would navigate to checkout
                    console.log("Checkout clicked");
                  }}
                >
                  Checkout
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="px-4"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
