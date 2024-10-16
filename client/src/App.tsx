import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import { NextUIProvider } from "@nextui-org/system";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import DefaultLayout from "./layouts/default";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "sonner";
import FriendRequest from "./pages/FriendRequest";
import Error from "./pages/Error";
function App() {
  return (
    <NextUIProvider>
      <DefaultLayout>
        <Provider store={store}>
          <Toaster />
          <Routes>
            <Route element={<Signup />} path="/register" />
            <Route element={<Login />} path="/login" />
            <Route element={<ProtectedRoutes />}>
              <Route element={<Chat />} path="/">
                <Route path=":chatid" />
              </Route>
              <Route element={<FriendRequest />} path={"requests"} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </Provider>
      </DefaultLayout>
    </NextUIProvider>
  );
}

export default App;
