import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Exhaust Systems", category: "Exhaust", count: 124, color: "from-orange-600 to-red-600" },
  { name: "Brakes & Rotors", category: "Brakes", count: 89, color: "from-red-600 to-pink-600" },
  { name: "Suspension", category: "Suspension", count: 67, color: "from-amber-500 to-orange-600" },
  { name: "Engine Parts", category: "Engine", count: 234, color: "from-orange-500 to-amber-500" },
  { name: "Bodywork", category: "Bodywork", count: 156, color: "from-gray-600 to-gray-800" },
  { name: "Wheels & Tires", category: "Wheels", count: 78, color: "from-zinc-600 to-zinc-800" },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <section id="categories" className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary uppercase tracking-wider text-sm font-medium">
            Browse by Category
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-2">Find Your Parts</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            From race-spec exhaust systems to precision-engineered suspension components, 
            we've got everything you need to dominate the track.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((categoryItem) => (
            <button
              key={categoryItem.name}
              onClick={() => handleCategoryClick(categoryItem.category)}
              className="group relative overflow-hidden rounded-lg p-6 bg-card border border-border hover:border-primary/50 transition-all duration-500 w-full text-left"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${categoryItem.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl group-hover:text-primary transition-colors">
                    {categoryItem.name}
                  </h3>
                  <span className="text-sm text-muted-foreground mt-1">
                    {categoryItem.count} Products
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full border border-border group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-300">
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
