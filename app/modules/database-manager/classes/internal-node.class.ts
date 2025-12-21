import { BPlusNode } from "./b-plus-node.class";

export class InternalNode<K, V> extends BPlusNode<K, V> {
  children: BPlusNode<K, V>[] = [];
}
