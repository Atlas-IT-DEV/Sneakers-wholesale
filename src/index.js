import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { RootStoreContext } from "./store/store_context";
import RootStore from "./store/root_store";
import { ChakraProvider } from "@chakra-ui/react";
import PageContainer from "./components/page_container";
import MainPage from "./pages/main_page/main_page";
import CartPage from "./pages/cart_page/cart_page";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <PageContainer>
        <MainPage />
      </PageContainer>
    ),
  },
  {
    path: "/cart",
    element: (
      <PageContainer>
        <CartPage />
      </PageContainer>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RootStoreContext.Provider value={new RootStore()}>
        <RouterProvider router={router} />
      </RootStoreContext.Provider>
    </ChakraProvider>
  </React.StrictMode>
);
