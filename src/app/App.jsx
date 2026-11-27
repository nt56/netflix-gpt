import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./store";
import router from "./router";
import AuthProvider from "../features/auth/AuthProvider";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  );
}

export default App;
