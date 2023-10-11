import { ElementStates } from "../../types/element-states";

class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  constructor(value: T, next: LinkedListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

interface ILinkedList<T> {
  append: (value: T) => void;
  prepend: (value: T) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  delete: (value: T) => void;
  insertAfter: (value: T, prevNode: LinkedListNode<T>) => void;
  insertAt: (value: T, index: number) => void;
  deleteAt: (index: number) => void;
  getArray: () => T[];
  getColorArray: () => Array<{ value: T; color: ElementStates }>;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private tail: LinkedListNode<T> | null;
  private size: number;

  constructor(elements: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    elements.forEach((element) => this.append(element));
  }

  append(value: T) {
    const newNode = new LinkedListNode(value);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    this.size++;
  }

  prepend(value: T) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    this.size++;
  }

  delete(value: T) {
    if (!this.head) {
      return null;
    }

    let deleteNode = null;
    while (this.head && this.head.value === value) {
      deleteNode = this.head;
      this.head = this.head.next;
    }
    let currentNode = this.head;
    if (currentNode !== null) {
      while (currentNode?.next) {
        if (currentNode.next.value === value) {
          deleteNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }
    if (this.tail?.value === value) {
      this.tail = currentNode;
    }
    return deleteNode;
  }

  deleteHead() {
    if (!this.head) return null;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.size--;
  }

  deleteTail() {
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    }

    let current = this.head;
    while (current?.next) {
      if (!current.next.next) {
        current.next = null;
      } else {
        current = current.next;
      }
    }

    this.tail = current;
    this.size--;
  }

  insertAfter(value: T, prevNode: LinkedListNode<T>) {
    if (prevNode === null) {
      return this;
    }

    const newNode = new LinkedListNode(value);
    newNode.next = prevNode.next;
    prevNode.next = newNode;
    if (newNode.next === null) {
      this.tail = newNode;
    }
    return this;
  }

  insertAt(value: T, index: number) {
    if (index < 0 || index > this.size) {
      return null;
    } else {
      const newNode = new LinkedListNode(value);

      if (index === 0) {
        newNode.next = this.head;
        this.head = newNode;
      } else {
        let curr = this.head;
        let currIndex = 0;

        while (currIndex < index) {
          currIndex++;
          if (curr?.next && currIndex !== index) {
            curr = curr?.next;
          }
        }
        if (curr) {
          newNode.next = curr.next;
          curr.next = newNode;
        }
      }
      this.size++;
    }
  }

  deleteAt(index: number) {
    if (index < 0 || index >= this.size) {
      return null;
    } else {
      if (index === 0) {
        return this.deleteHead();
      } else if (index === this.size - 1) {
        return this.deleteTail();
      }
      let curr = this.head;
      let currIndex = 0;
      while (currIndex < index - 1) {
        if (curr) {
          curr = curr?.next;
          currIndex++;
        }
      }
      if (curr && curr.next) {
        curr.next = curr.next.next;
        this.size--;
      }
    }
  }
  get getSize() {
    return this.size;
  }
  getArray() {
    let current = this.head;
    const res = [];
    while (current) {
      res.push(current.value);
      current = current.next;
    }
    return [...res];
  }

  getColorArray() {
    return this.getArray().map((item) => ({
      value: item,
      color: ElementStates.Default,
    }));
  }
}
