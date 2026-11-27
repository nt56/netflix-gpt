import { createContext, useContext } from "react";

export const ToastContext = createContext(null);

// Returns showToast(message, type) where type is "info" or "error"
export const useToast = () => useContext(ToastContext);
