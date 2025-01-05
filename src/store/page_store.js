import { makeAutoObservable } from "mobx";

class PageStore {
  token = "";
  user_info = {};
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

  signUp = async (first_name, last_name, tg_id) => {
    const response = await fetch("https://reed-shop.ru:8088/signup/", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 0,
        first_name: first_name,
        last_name: last_name || "empty",
        telegram_id: tg_id,
        type_id: 1,
        role: "user",
      }),
    });
    const result = await response.json();
    this.token = result.access_token;
    console.log(response);
  };

  signIn = async (tg_id) => {
    const response = await fetch("https://reed-shop.ru:8088/signin/", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        telegram_id: tg_id,
      }),
    });
    const result = await response.json();
    this.token = result.access_token;
    console.log(response);
  };

  getCurrentAuthUser = async () => {
    const response = await fetch(
      `https://reed-shop.ru:8088/get_current_auth_user/?token=${this.token}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
    const result = await response.json();
    this.user_info = result;
    console.log("auth user", result);
  };
}

export default PageStore;
