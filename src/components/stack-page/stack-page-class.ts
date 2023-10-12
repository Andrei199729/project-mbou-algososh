interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  reset: () => void;
  getSize: () => number;
  getElements: () => T[];
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    let dd7 = [];
    for (let i = 0; i < this.container.length - 1; i++) {
      dd7.push(this.container[i]);
    }
    this.container = dd7;
  };

  reset = (): void => {
    this.container = [];
  };

  getSize = () => this.container.length;
  getElements = () => this.container;
}
