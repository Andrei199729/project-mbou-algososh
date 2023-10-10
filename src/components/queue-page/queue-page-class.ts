interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  reset: () => void;
  isEmpty: () => boolean;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  public head = 0;
  public tail = 0;
  public readonly size: number = 0;
  public length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.length < this.size + 1) {
      this.container[this.head % this.size] = null;
      this.head++;
      this.length--;
    }
    console.log(this.length);
    console.log(this.size);
    console.log(this.container);
    console.log(this.head);
  };

  reset = () => {
    this.container = [];
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  isEmpty = () => this.length === 0;
}
