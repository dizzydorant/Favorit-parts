import { useSelector } from "react-redux";

export default function PriceTable() {
  const { offers, loading, error, selectedBrand } = useSelector(
    (state) => state.details,
  );
  const { number } = useSelector((state) => state.search);

  if (!selectedBrand) return null;

  if (loading) {
    return (
      <div className="text-center my-5">
        <div
          className="spinner-border text-success"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Загрузка аналогов...</span>
        </div>
        <p className="mt-2 text-muted">
          Запрашиваем предложения складов и аналоги для бренда {selectedBrand}
          ...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Ошибка загрузки цен:</strong> {error}
      </div>
    );
  }

  const tableRows = [];

  offers.forEach((good) => {
    const isOriginal =
      good.brand.toLowerCase() === selectedBrand.toLowerCase() &&
      good.number.toLowerCase() === number.trim().toLowerCase();

    if (good.warehouses && good.warehouses.length > 0) {
      good.warehouses.forEach((wh) => {
        tableRows.push({
          goodsID: good.goodsID,
          brand: good.brand,
          number: good.number,
          name: good.name,
          warehouseCode: wh.code || "Без кода",
          warehouseId: wh.id,
          price: wh.price,
          stock: wh.stock,
          notRefund: wh.notRefund || good.notRefund,
          isOriginal: isOriginal,
        });
      });
    } else {
      tableRows.push({
        goodsID: good.goodsID,
        brand: good.brand,
        number: good.number,
        name: good.name,
        warehouseCode: "—",
        warehouseId: "none",
        price: 0,
        stock: 0,
        notRefund: good.notRefund,
        isOriginal: isOriginal,
      });
    }
  });

  if (tableRows.length === 0) {
    return (
      <div className="alert alert-info">
        Для выбранного бренда предложения и аналоги отсутствуют.
      </div>
    );
  }

  return (
    <div className="card p-4 shadow-sm">
      <h5 className="card-title mb-3 text-success">
        Этап 2: Итоговые предложения для бренда {selectedBrand} и аналоги
      </h5>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Тип</th>
              <th>Производитель / Артикул</th>
              <th>Наименование запчасти</th>
              <th>Склад</th>
              <th className="text-end">Доступный остаток</th>
              <th className="text-end">Стоимость</th>
              <th className="text-center">Возврат</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, index) => (
              <tr
                key={`${row.goodsID}-${row.warehouseId}-${index}`}
                className={row.isOriginal ? "table-success-light" : ""}
              >
                <td>
                  {row.isOriginal ? (
                    <span className="badge bg-success">Искомый</span>
                  ) : (
                    <span className="badge bg-info text-dark">Аналог</span>
                  )}
                </td>
                <td>
                  <strong className="text-uppercase">{row.brand}</strong>
                  <div className="text-muted small">{row.number}</div>
                </td>
                <td>
                  {row.name || <span className="text-muted">Не указано</span>}
                </td>
                <td>
                  <span className="badge bg-secondary">
                    {row.warehouseCode}
                  </span>
                </td>
                <td className="text-end fw-bold">
                  {row.stock > 0 ? (
                    <span className="text-dark">{row.stock} шт.</span>
                  ) : (
                    <span className="text-danger">Нет в наличии</span>
                  )}
                </td>
                <td className="text-end fw-bold text-primary text-nowrap">
                  {row.price > 0
                    ? `${row.price.toLocaleString("ru-RU")} ₽`
                    : "—"}
                </td>
                <td className="text-center">
                  {row.notRefund ? (
                    <span
                      className="text-danger small"
                      title="Нельзя вернуть по причине Отказ"
                    >
                      Невозвратный
                    </span>
                  ) : (
                    <span className="text-success small"> Возвратный</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .table-success-light {
          background-color: rgba(25, 135, 84, 0.05) !important;
        }
      `}</style>
    </div>
  );
}
