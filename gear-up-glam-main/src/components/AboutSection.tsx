import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getFeaturedProducts } from "@/data/products";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary uppercase tracking-wider text-sm font-medium">
            Our Story
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-2">About Gear Up Glam</h2>
        </div>

        {/* About Text */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Welcome to <strong className="text-foreground">Gear Up Glam</strong>, your premier destination for high-performance motorcycle parts and accessories. Since our founding, we've been dedicated to providing riders with the finest quality components that combine racing excellence with everyday reliability.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Our passion for motorcycles drives everything we do. We understand that whether you're dominating the track or cruising the open road, you demand nothing but the best. That's why we carefully curate our inventory, partnering with world-renowned manufacturers like Brembo, Öhlins, and leading exhaust specialists.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              From state-of-the-art titanium exhaust systems to precision-engineered suspension components, every product in our catalog is selected to meet the highest standards of performance and durability. Our team consists of experienced riders and technicians who test every part before it reaches our shelves.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We're not just a parts supplier—we're your partner in achieving peak performance. Whether you're building a race bike or upgrading your daily rider, Gear Up Glam is here to help you gear up and ride with confidence.
            </p>
          </div>
        </div>

        {/* Glow Line */}
        <div className="glow-line mb-12" />

        {/* Featured Products Grid */}
        <div className="mb-16">
          <h3 className="font-display text-3xl mb-8 text-center">Featured Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getFeaturedProducts().slice(0, 4).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>

        {/* Glow Line */}
        <div className="glow-line mb-12" />

        {/* Product Carousel / Checkout Slide */}
        <div className="mt-16">
          <h3 className="font-display text-3xl mb-8 text-center">Popular Picks</h3>
          <div className="max-w-6xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {getFeaturedProducts().slice(4, 8).map((product) => (
                  <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="card-racing h-full">
                      <div className="relative aspect-square overflow-hidden bg-secondary rounded-t-lg">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        {product.originalPrice && (
                          <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">
                            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <span className="text-xs text-primary uppercase tracking-wider font-medium">
                          {product.category}
                        </span>
                        <h4 className="font-display text-lg mt-1 line-clamp-1">{product.name}</h4>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12" />
              <CarouselNext className="hidden md:flex -right-12" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
