import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./store";
import router from "./router";
import AuthProvider from "../features/auth/AuthProvider";
import ErrorBoundary from "../components/ErrorBoundary";
import ToastProvider from "../components/toast/ToastProvider";

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AuthProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
