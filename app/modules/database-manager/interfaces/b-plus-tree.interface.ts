export interface BPlusTree<K, V> {
  insert(key: K, value: V): void;
  search(key: K): V | null;
  delete(key: K): void;
  rangeSearch(from: K, to: K): V[];
}
