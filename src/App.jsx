import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import BrandList from "./components/BrandList";
import PriceTable from "./components/PriceTable";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="container py-5" style={{ maxWidth: "1200px" }}>
      <Header />

      <main>
        <SearchForm />
        <BrandList />
        <PriceTable />
      </main>

      <Footer />
    </div>
  );
}
