import { FaExclamationTriangle } from "react-icons/fa";
import Logo from "./Logo";

export const ERROR_ACTION_CLASS =
  "inline-flex items-center gap-2 py-3 px-8 rounded-full bg-brand hover:bg-brand-hover text-white font-bold text-sm tracking-wide shadow-glow transition-all duration-300 hover:scale-105 active:scale-95";

// Full page message for a missing page or a crash. Children are the actions.
const ErrorScreen = ({ code, title, message, children }) => (
  <div className="min-h-screen w-full bg-dark-950 flex flex-col items-center justify-center p-6 text-white font-sans relative overflow-hidden">
    {/* Background glow */}
    <div className="absolute w-96 h-96 bg-brand/10 rounded-full blur-3xl pointer-events-none" />

    {/* Flixora Brand Logo */}
    <div className="mb-8">
      <Logo size="lg" />
    </div>

    <main className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 max-w-lg w-full text-center shadow-2xl relative z-10 animate-fadeInUp">
      <div className="w-16 h-16 rounded-2xl bg-brand/20 text-brand flex items-center justify-center text-3xl mx-auto mb-4">
        <FaExclamationTriangle />
      </div>

      {code && (
        <p className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white mb-2">
          {code}
        </p>
      )}

      <h1 className="text-lg font-semibold text-gray-200 mb-2">{title}</h1>

      <p className="text-sm text-gray-400 mb-6 leading-relaxed">{message}</p>

      {children}
    </main>
  </div>
);

export default ErrorScreen;
