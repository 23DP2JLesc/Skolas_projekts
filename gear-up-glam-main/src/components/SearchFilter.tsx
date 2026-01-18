import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, Clock, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import ProductCard from "./ProductCard";
import { allProducts, categories, type Product } from "@/data/products";

const SEARCH_HISTORY_KEY = "motoparts_search_history";
const MAX_HISTORY = 5;

type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc" | "rating-desc" | "newest";

const SearchFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Get min and max prices from products
  const priceBounds = useMemo(() => {
    const prices = allProducts.map(p => p.price);
    return [Math.min(...prices), Math.max(...prices)] as [number, number];
  }, []);

  // Initialize price range to actual bounds
  useEffect(() => {
    setPriceRange(priceBounds);
  }, [priceBounds]);

  // Read category from URL params on mount
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const category = decodeURIComponent(categoryParam);
      // Check if the category exists in our categories list (excluding "All")
      if (categories.includes(category as any)) {
        setSelectedCategories([category]);
        setShowFilters(true); // Auto-expand filters to show the selected category
      }
    }
  }, [searchParams]);

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (e) {
        localStorage.removeItem(SEARCH_HISTORY_KEY);
      }
    }
  }, []);

  // Save search to history
  const saveToHistory = (term: string) => {
    if (!term.trim()) return;
    
    const newHistory = [
      term,
      ...searchHistory.filter(h => h.toLowerCase() !== term.toLowerCase())
    ].slice(0, MAX_HISTORY);
    
    setSearchHistory(newHistory);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  };

  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    let filtered: Product[] = [...allProducts];

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term) ||
          product.brand?.toLowerCase().includes(term)
      );
    }

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes("All")) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "rating-desc":
          return (b.rating || 0) - (a.rating || 0);
        case "newest":
          return b.id - a.id; // Higher ID = newer
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategories, priceRange, sortBy]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchBlur = () => {
    if (searchTerm.trim()) {
      saveToHistory(searchTerm.trim());
    }
    setTimeout(() => setShowHistory(false), 200);
  };

  const handleHistoryClick = (term: string) => {
    setSearchTerm(term);
    setShowHistory(false);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      if (category === "All") {
        return prev.length === 1 && prev[0] === "All" ? [] : ["All"];
      }
      if (prev.includes("All")) {
        return [category];
      }
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      }
      return [...prev, category];
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setPriceRange(priceBounds);
    setSortBy("newest");
  };

  const hasActiveFilters = searchTerm || selectedCategories.length > 0 || 
    priceRange[0] !== priceBounds[0] || priceRange[1] !== priceBounds[1] || sortBy !== "newest";

  return (
    <section id="search" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary uppercase tracking-wider text-sm font-medium">
            Find What You Need
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-2">Shop Products</h2>
        </div>

        {/* Search and Filter Controls */}
        <div className="max-w-6xl mx-auto mb-8 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, category, or brand..."
              value={searchTerm}
              onChange={handleSearch}
              onFocus={() => setShowHistory(true)}
              onBlur={handleSearchBlur}
              className="w-full pl-12 pr-12 py-6 bg-card border-border focus:border-primary text-lg"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}

            {/* Search History Dropdown */}
            {showHistory && searchHistory.length > 0 && !searchTerm && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-20 overflow-hidden animate-fade-in">
                <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Recent Searches
                  </span>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                <ul>
                  {searchHistory.map((term, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleHistoryClick(term)}
                        className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center gap-2"
                      >
                        <Search className="h-4 w-4 text-muted-foreground" />
                        {term}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Filter Toggle and Sort */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {selectedCategories.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                  {selectedCategories.length}
                </span>
              )}
            </Button>

            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
              <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                  <SelectItem value="rating-desc">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="border border-border rounded-lg p-6 bg-card animate-fade-in space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center space-x-2 cursor-pointer hover:text-primary transition-colors"
                    >
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-4">
                  Price Range: ${priceRange[0].toFixed(0)} - ${priceRange[1].toFixed(0)}
                </h3>
                <Slider
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  min={priceBounds[0]}
                  max={priceBounds[1]}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>${priceBounds[0].toFixed(0)}</span>
                  <span>${priceBounds[1].toFixed(0)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-8 text-center">
          <p className="text-muted-foreground">
            {hasActiveFilters ? (
              <>
                Found <span className="text-primary font-semibold">{filteredProducts.length}</span> 
                {filteredProducts.length === 1 ? " product" : " products"}
                {searchTerm && ` matching "${searchTerm}"`}
              </>
            ) : (
              <>Showing all <span className="text-primary font-semibold">{allProducts.length}</span> products</>
            )}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="animate-fade-in">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-2xl font-display text-muted-foreground mb-2">No products found</p>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or browse our categories.
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchFilter;
