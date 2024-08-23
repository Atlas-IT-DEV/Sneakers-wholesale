import { makeAutoObservable } from "mobx";

class PageStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default PageStore;
