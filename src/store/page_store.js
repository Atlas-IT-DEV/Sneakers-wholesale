import { makeAutoObservable } from "mobx";

class PageStore {
  shop_format = 0;
  products = [];
  news = [];
  companys = [];
  company_filter = null;
  cart = [];
  constructor() {
    makeAutoObservable(this);
  }
  updateShopFormat = (new_format) => {
    this.shop_format = new_format;
  };
  updateCompanyFilter = (new_filter) => {
    this.company_filter = new_filter;
  };
  updateCart = (new_cart) => {
    this.cart = new_cart;
  };
  getProducts = async () => {
    const response = await fetch("https://reed-shop.ru:8088/products/full", {
      method: "GET",
      headers: { accept: "application/json" },
    });
    const result = await response.json();
    this.products = result;
  };
  getNews = async () => {
    const response = await fetch("https://reed-shop.ru:8088/news/full", {
      method: "GET",
      headers: { accept: "application/json" },
    });
    const result = await response.json();
    this.news = result;
  };
  getCompanys = async () => {
    const response = await fetch("https://reed-shop.ru:8088/companies/", {
      method: "GET",
      headers: { accept: "application/json" },
    });
    const result = await response.json();
    this.companys = result;
  };
  // getCart = async () => {

  // }
}

export default PageStore;
