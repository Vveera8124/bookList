import { Provider } from "react-redux";
import { store } from "./store/store";
import ToastHandler from "./lib/toastHandler";
import { ToastContainer } from "react-toastify";
import Layout from "./pages";
function App() {
  return (
    <Provider store={store}>
      <main className="container mx-auto p-4 w-full h-[100vh]">
        <ToastHandler />
        <ToastContainer />
        <header>
          <h1 className="text-2xl font-bold mb-4">Books List</h1>
        </header>
        <Layout />
      </main>
    </Provider>
  );
}

export default App;
