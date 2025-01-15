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
import FilterPage from "./pages/filter_page/filter_page";
import ProfilePage from "./pages/profile_page/profile_page";
import CheckoutPage from "./pages/checkout_page/checkout_page";
import CopyPage from "./pages/copy_page/copy_page";
import { ApolloProvider } from "@apollo/client";
import client from "./appoloClient";

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
        <CatalogPage />
      </PageContainer>
    ),
  },
  {
    path: "/favourites",
    element: (
      <PageContainer>
        <FavouritesPage />
      </PageContainer>
    ),
  },
  {
    path: "/filters",
    element: (
      <PageContainer>
        <FilterPage />
      </PageContainer>
    ),
  },
  {
    path: "/profile",
    element: (
      <PageContainer>
        <ProfilePage />
      </PageContainer>
    ),
  },
  {
    path: "/checkout",
    element: (
      <PageContainer>
        <CheckoutPage />
      </PageContainer>
    ),
  },
  {
    path: "/copy",
    element: (
      <PageContainer>
        <CopyPage />
      </PageContainer>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RootStoreContext.Provider value={new RootStore()}>
        <ApolloProvider client={client}>
          <RouterProvider router={router} />
        </ApolloProvider>
      </RootStoreContext.Provider>
    </ChakraProvider>
  </React.StrictMode>
);
