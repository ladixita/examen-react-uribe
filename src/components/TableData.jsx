import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

/**
 * TableData – Componente reutilizable para tablas
 *
 * Props:
 * - columns: ["ID", "Producto", "Precio", "Acciones"]
 * - data: array de objetos
 * - onView(row)
 * - onEdit(row)
 * - onDelete(row)
 */
const TableData = ({
  columns = [],
  data = [],
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg border border-slate-200">
      <table className="w-full text-sm">
        {/* ENCABEZADOS */}
        <thead className="bg-slate-100 border-b">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left font-semibold text-slate-700"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {/* ---- SIN DATOS ---- */}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-slate-500"
              >
                No hay datos disponibles
              </td>
            </tr>
          )}

          {/* ---- FILAS ---- */}
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-b hover:bg-slate-50 transition"
            >
              {/* ID */}
              <td className="px-4 py-3">{row.id}</td>

              {/* Nombre */}
              <td className="px-4 py-3">{row.nombre}</td>

              {/* Precio */}
              <td className="px-4 py-3">S/ {row.precio}</td>

              {/* ACCIONES */}
              <td className="px-4 py-3">
                <div className="flex gap-2 flex-wrap">

                  {/* Ver */}
                  {onView && (
                    <button
                      type="button"
                      onClick={() => onView(row)}
                      className="
                        flex items-center gap-2 bg-slate-700 hover:bg-slate-800
                        text-white px-3 py-1.5 rounded-md text-xs
                      "
                      title="Ver producto"
                    >
                      <FaEye className="text-xs" />
                      Ver
                    </button>
                  )}

                  {/* Editar */}
                  {onEdit && (
                    <button
                      type="button"
                      onClick={() => onEdit(row)}
                      className="
                        flex items-center gap-2 bg-green-600 hover:bg-green-700
                        text-white px-3 py-1.5 rounded-md text-xs
                      "
                      title="Editar producto"
                    >
                      <FaEdit className="text-xs" />
                      Editar
                    </button>
                  )}

                  {/* Eliminar */}
                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(row)}
                      className="
                        flex items-center gap-2 bg-red-600 hover:bg-red-700
                        text-white px-3 py-1.5 rounded-md text-xs
                      "
                      title="Eliminar producto"
                    >
                      <FaTrash className="text-xs" />
                      Eliminar
                    </button>
                  )}

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;