import type { BPlusNode } from "./b-plus-node.class";
import { InternalNode } from "./internal-node.class";
import { LeafNode } from "./leaf-node.class";

export class SimpleBPlusTree<K extends number, V> {
  private root: BPlusNode<K, V>;
  private readonly order = 3;

  constructor() {
    this.root = new LeafNode<K, V>();
  }

  search(key: K): V | null {
    let node = this.root;

    while (node instanceof InternalNode) {
      let i = 0;
      while (i < node.keys.length && key >= node.keys[i]) {
        i++;
      }
      node = node.children[i];
    }

    const leaf = node as LeafNode<K, V>;
    const index = leaf.keys.indexOf(key);

    return index !== -1 ? leaf.values[index] : null;
  }

  insert(key: K, value: V): void {
    const split = this.insertRecursive(this.root, key, value);

    if (split) {
      const newRoot = new InternalNode<K, V>();
      newRoot.keys = [split.key];
      newRoot.children = [this.root, split.right];
      this.root = newRoot;
    }
  }

  private insertRecursive(
    node: BPlusNode<K, V>,
    key: K,
    value: V
  ): { key: K; right: BPlusNode<K, V> } | null {
    if (node instanceof LeafNode) {
      const idx = this.findInsertIndex(node.keys, key);

      node.keys.splice(idx, 0, key);
      node.values.splice(idx, 0, value);

      if (node.keys.length < this.order) {
        return null;
      }

      return this.splitLeaf(node);
    }

    const internal = node as InternalNode<K, V>;
    const idx = this.findInsertIndex(internal.keys, key);

    const split = this.insertRecursive(internal.children[idx], key, value);

    if (!split) return null;

    internal.keys.splice(idx, 0, split.key);
    internal.children.splice(idx + 1, 0, split.right);

    if (internal.keys.length < this.order) {
      return null;
    }

    return this.splitInternal(internal);
  }

  private splitLeaf(leaf: LeafNode<K, V>): { key: K; right: LeafNode<K, V> } {
    const mid = Math.ceil(this.order / 2);

    const right = new LeafNode<K, V>();
    right.keys = leaf.keys.splice(mid);
    right.values = leaf.values.splice(mid);

    right.next = leaf.next;
    leaf.next = right;

    return { key: right.keys[0], right };
  }

  private splitInternal(node: InternalNode<K, V>): {
    key: K;
    right: InternalNode<K, V>;
  } {
    const mid = Math.floor(this.order / 2);

    const promotedKey = node.keys[mid];

    const right = new InternalNode<K, V>();
    right.keys = node.keys.splice(mid + 1);
    right.children = node.children.splice(mid + 1);

    node.keys.splice(mid);

    return { key: promotedKey, right };
  }

  rangeSearch(from: K, to: K): V[] {
    const result: V[] = [];

    let node = this.root;
    while (node instanceof InternalNode) {
      let i = 0;
      while (i < node.keys.length && from >= node.keys[i]) {
        i++;
      }
      node = node.children[i];
    }

    let leaf = node as LeafNode<K, V>;

    while (leaf) {
      for (let i = 0; i < leaf.keys.length; i++) {
        const key = leaf.keys[i];
        if (key > to) return result;
        if (key >= from) {
          result.push(leaf.values[i]);
        }
      }
      //@ts-expect-error
      leaf = leaf.next;
    }

    return result;
  }

  delete(key: K): void {
    let node = this.root;

    while (node instanceof InternalNode) {
      let i = 0;
      while (i < node.keys.length && key >= node.keys[i]) {
        i++;
      }
      node = node.children[i];
    }

    const leaf = node as LeafNode<K, V>;
    const idx = leaf.keys.indexOf(key);

    if (idx !== -1) {
      leaf.keys.splice(idx, 1);
      leaf.values.splice(idx, 1);
    }
  }

  private findInsertIndex(keys: K[], key: K): number {
    let i = 0;
    while (i < keys.length && key > keys[i]) i++;
    return i;
  }
}
