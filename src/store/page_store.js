import { makeAutoObservable } from "mobx";

class PageStore {
  shop_format = null;
  products = [];
  constructor() {
    makeAutoObservable(this);
  }
  updateShopFormat = (new_format) => {
    this.shop_format = new_format;
  };
  getProducts = async () => {
    const response = await fetch("http://5.180.174.189:8088/products/full", {
      method: "GET",
      headers: { accept: "application/json" },
    });
    const result = await response.json();
    this.products = result;
  };
}

export default PageStore;
