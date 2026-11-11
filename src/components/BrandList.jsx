import { useDispatch, useSelector } from "react-redux";
import {
  fetchAnaloguesAndPrices,
  setSelectedBrand,
} from "../store/detailsSlice";

export default function BrandList() {
  const dispatch = useDispatch();
  const { brands, loading, error, number, apiKey } = useSelector(
    (state) => state.search,
  );
  const { selectedBrand } = useSelector((state) => state.details);

  if (loading) return null;

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h5 className="alert-heading">Ошибка при поиске артикула!</h5>
        <p className="mb-0">{error}</p>
      </div>
    );
  }

  if (brands.length === 0 && number) {
    return (
      <div className="alert alert-warning" role="alert">
        По артикулу <strong>{number}</strong> ничего не найдено в базе данных
        поставщика.
      </div>
    );
  }

  if (brands.length === 0) return null;

  const handleBrandSelect = (brandName) => {
    dispatch(setSelectedBrand(brandName));
    dispatch(fetchAnaloguesAndPrices({ apiKey, number, brand: brandName }));
  };

  return (
    <div className="card p-4 shadow-sm mb-4">
      <h5 className="card-title mb-3 text-secondary">
        Этап 1: Выберите производителя детали ({number})
      </h5>
      <div className="d-flex flex-wrap gap-2">
        {brands.map((item, idx) => {
          if (!item.brand) return null;

          const isSelected = selectedBrand === item.brand;
          return (
            <button
              key={`${item.brand}-${idx}`}
              type="button"
              className={`btn ${isSelected ? "btn-success" : "btn-outline-secondary"} btn-md`}
              onClick={() => handleBrandSelect(item.brand)}
            >
              {item.brand} {item.name ? `(${item.name})` : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}
