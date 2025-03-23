import store, { StoreEvents } from "../store/store";
import { AppStore } from "../types/AppStore";
import Block, { BlockProps } from "./Block";
import { isEqual } from "./isEqual";

export function connect<T extends object>(
  mapStateToProps: (state: Partial<AppStore>) => T
) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props: BlockProps) {
        // сохраняем начальное состояние

        super({ ...props });
        let state = mapStateToProps(store.getState());
        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());
          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          // не забываем сохранить новое состояние
          state = newState;
        });
      }
    };
  };
}
