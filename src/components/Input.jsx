/**
 * Props:
 * - label: texto del label
 * - name: nombre del campo
 * - type: text, number, email, password, textarea
 * - placeholder: texto del placeholder
 * - value: valor actual
 * - onChange: función para actualizar
 * - error: mensaje de error opcional
 * - required: boolean
 * - disabled: boolean
 * - icon: componente de react-icons opcional
 */
const Input = ({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error = "",
  required = false,
  disabled = false,
  icon: Icon,
}) => {
  const isTextarea = type === "textarea";

  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label */}
      {label && (
        <label htmlFor={name} className="text-sm font-semibold text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* ICON + INPUT */}
      <div className="relative flex items-start">
        {Icon && !isTextarea && (
          <Icon className="absolute left-3 top-3 text-slate-400 text-sm" />
        )}

        {/* INPUT NORMAL O TEXTAREA */}
        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            rows={3}
            className={`w-full border rounded-md px-3 py-2 text-sm outline-none 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              ${error ? "border-red-400" : "border-slate-300"}
              resize-none
            `}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            required={required}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full border rounded-md px-3 py-2 text-sm 
    text-slate-800 bg-white
    outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    ${Icon ? "pl-10" : "pl-3"}
    ${error ? "border-red-400" : "border-slate-300"}
  `}
          />
        )}
      </div>

      {/* ERROR */}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
