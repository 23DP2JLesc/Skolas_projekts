import Header from "@/components/Header";
import SearchFilter from "@/components/SearchFilter";
import Footer from "@/components/Footer";

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SearchFilter />
      </main>
      <Footer />
    </div>
  );
};

export default Products;
