import EventBus from "../services/EventBus";
import set from "../services/set";
import { Indexed } from "../services/types";
import { AppStore } from "../types/AppStore";

export enum StoreEvents {
  Updated = "updated",
}

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
  private state: Partial<AppStore> = {};
  constructor() {
    super();
    this.on(StoreEvents.Updated, () => {});
  }
  public set(path: string, value: unknown) {
    set(this.state, path, value);

    // метод EventBus
    this.emit(StoreEvents.Updated);
  }
  public getState(): Partial<AppStore> {
    return this.state;
  }
}

export default new Store();
