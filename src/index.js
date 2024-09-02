import React from "react";
import ReactDOM from "react-dom/client";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { RootStoreContext } from "./store/store_context";
import RootStore from "./store/root_store";
import { ChakraProvider } from "@chakra-ui/react";
import PageContainer from "./components/page_container";
import MainPage from "./pages/main_page/main_page";
import CartPage from "./pages/cart_page/cart_page";
import CatalogPage from "./pages/catalog_page/catalog_page";
import FavouritesPage from "./pages/favourites_page/favourites_page";

const router = createMemoryRouter([
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
  {
    path: "/catalog",
    element: (
      <PageContainer>
      <CatalogPage/>
      </PageContainer>
    ),
  },
  {
    path: "/favourites",
    element: (
      <PageContainer>
        <FavouritesPage/>
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
