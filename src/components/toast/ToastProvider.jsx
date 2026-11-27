import { useCallback, useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { ToastContext } from "./toastContext";

const TOAST_DURATION_MS = 5000;

const STYLES = {
  info: "border-white/15 text-gray-100",
  error: "border-red-500/50 text-red-200",
};

const Toast = ({ id, message, type, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={`pointer-events-auto w-full max-w-sm flex items-center gap-3 p-4 rounded-2xl glass-dropdown border text-sm shadow-2xl animate-scaleIn ${STYLES[type]}`}
    >
      <p className="flex-1">{message}</p>
      <button
        type="button"
        aria-label="Dismiss message"
        onClick={() => onDismiss(id)}
        className="p-1 text-gray-400 hover:text-white"
      >
        <FaTimes />
      </button>
    </div>
  );
};

// Short messages shown at the bottom of the screen
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(0);

  const showToast = useCallback((message, type = "info") => {
    nextId.current += 1;
    const id = nextId.current;
    setToasts((current) => [...current, { id, message, type }]);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="fixed inset-x-4 bottom-4 z-[60] flex flex-col items-center sm:items-end gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
