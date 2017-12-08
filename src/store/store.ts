export class Store {
  private subscribers: Function[];
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any };

  constructor(reducers = {}, initialState = {}) {
    this.subscribers = [];
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
  }

  get value() {
    return this.state;
  }

  subscribe(fn) {
    this.subscribers = [...this.subscribers, fn];
    this.notify();
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== fn);
    };
  }

  dispatch(action) {
    this.state = this.reduce(this.state, action);
    sessionStorage.setItem('state', JSON.stringify(this.state));
    this.notify();
    console.log('STATE:::', this.state);
  }

  private notify() {
    for (const fn of this.subscribers) {
      fn(this.value);
    }
  }

  private reduce(state, action) {
    return Object.entries(this.reducers).reduce((acc, reducer) => {
      const [name, fn] = reducer;
      return { ...acc, [name]: fn(state[name], action) };
    }, {});
    // // alternative
    // const newState = {};
    // for(const prop in this.reducers) {
    //   newState[prop] = this.reducers[prop](state[prop], action);
    // }
    // return newState;
  }
}
