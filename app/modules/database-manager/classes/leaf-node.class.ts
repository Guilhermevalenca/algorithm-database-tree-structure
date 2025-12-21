import { BPlusNode } from "./b-plus-node.class";

export class LeafNode<K, V> extends BPlusNode<K, V> {
  values: V[] = [];
  next: LeafNode<K, V> | null = null;
}
