import { makeAutoObservable } from "mobx";

class PageStore {
  token = "";
  user_info = {};
  shop_format = 0;
  products = [];
  news = [];
  companys = [];
  cart = [];
  sort_type = 0;
  search_str = "";
  chars = [];
  selected_chars = [];
  selected_companys = [];
  min_max = ["", ""];

  delivery_type = "";
  user_name = "";
  phone_number = "";
  adress_delivery = "";

  constructor() {
    makeAutoObservable(this);
  }

  updateShopFormat = (new_format) => {
    this.shop_format = new_format;
  };

  updateCart = (new_cart) => {
    this.cart = new_cart;
  };
  updateSortType = (new_sort_type) => {
    this.sort_type = new_sort_type;
  };
  updateSearchStr = (new_search_str) => {
    this.search_str = new_search_str;
  };
  updateChars = (new_chars) => {
    this.chars = new_chars;
  };
  updateSelectedChars = (new_selected_chars) => {
    this.selected_chars = new_selected_chars;
  };
  updateMinMax = (new_min_max) => {
    this.min_max = new_min_max;
  };
  updateSelectedCompanys = (new_selected_companys) => {
    this.selected_companys = new_selected_companys;
  };
  updateTypeDelivery = (new_delivery) => {
    this.delivery_type = new_delivery;
  };
  updateAdressDelivery = (new_adress) => {
    this.adress_delivery = new_adress;
  };
  updatePhoneNumber = (new_number) => {
    this.phone_number = new_number;
  };
  updateUsername = (new_user_name) => {
    this.user_name = new_user_name;
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
  getChars = async () => {
    const response = await fetch(
      "https://reed-shop.ru:8088/product_characteristics/",
      { method: "GET", headers: { accept: "application/json" } }
    );
    const result = await response.json();
    this.chars = result;
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
