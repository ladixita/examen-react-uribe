/**
 * Props:
 * - text: mensaje debajo del spinner
 * - size: sm | md | lg
 * - fullScreen: boolean
 */
const Loader = ({
  text = "Cargando...",
  size = "md",
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`
        flex flex-col items-center justify-center text-slate-600
        ${fullScreen ? "fixed inset-0 bg-white/70 z-50" : "py-10"}
      `}
      role="status"
      aria-live="polite"
    >
      {/* SPINNER */}
      <div
        className={`
          ${sizeClasses[size]}
          border-blue-500 border-t-transparent rounded-full animate-spin
        `}
      ></div>

      {/* TEXTO */}
      {text && <p className="mt-3 text-sm text-slate-700">{text}</p>}
    </div>
  );
};

export default Loader;