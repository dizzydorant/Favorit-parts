import { useDispatch, useSelector } from "react-redux";
import { setApiKey } from "../store/searchSlice";

export default function Header() {
  const dispatch = useDispatch();
  const apiKey = useSelector((state) => state.search.apiKey);

  return (
    <header className="pb-4 mb-4 border-bottom d-flex flex-wrap justify-content-between align-items-center gap-3">
      <div>
        <h1 className="h3 text-dark fw-bold">Сервис «Проценка»</h1>
        <p className="text-muted mb-0">
          Интеграция с API поиска автозапчастей Favorit Parts
        </p>
      </div>
      <div className="col-12 col-md-4">
        <label
          htmlFor="apiKeyInput"
          className="form-label small fw-bold text-muted mb-1"
        >
          Тестовый API-Ключ (GUID)
        </label>
        <input
          id="apiKeyInput"
          type="text"
          className="form-control form-control-sm font-monospace"
          value={apiKey}
          onChange={(e) => dispatch(setApiKey(e.target.value))}
          placeholder="Вставьте ваш уникальный ключ покупателя"
        />
      </div>
    </header>
  );
}
