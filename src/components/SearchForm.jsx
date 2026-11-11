import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrandsByNumber, setSearchNumber } from "../store/searchSlice";
import { clearDetails } from "../store/detailsSlice";

export default function SearchForm() {
  const [inputNum, setInputNum] = useState("");
  const dispatch = useDispatch();
  const { loading, apiKey } = useSelector((state) => state.search);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!inputNum.trim()) return;

    dispatch(setSearchNumber(inputNum));
    dispatch(clearDetails());
    dispatch(fetchBrandsByNumber({ apiKey, number: inputNum }));
  };

  return (
    <div className="card p-4 shadow-sm mb-4">
      <form onSubmit={handleSearch} className="row g-3 align-items-end">
        <div className="col-md-9">
          <label htmlFor="partNumber" className="form-label fw-bold">
            Артикул автозапчасти
          </label>
          <input
            type="text"
            id="partNumber"
            className="form-control form-control-lg"
            placeholder="Например: 01089, 7160500039S..."
            value={inputNum}
            onChange={(e) => setInputNum(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="col-md-3">
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100"
            disabled={loading || !inputNum.trim()}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Поиск...
              </>
            ) : (
              "Найти бренды"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
