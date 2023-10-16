import {Key} from "@ng-bootstrap/ng-bootstrap/util/key";

export class DoubleKeyEntry<TKey1, TKey2> {

  constructor(public key1: TKey1, public key2: TKey2) {
  }

}


export class DoubleKeySetModel<TKey1, TKey2> {

  private readonly innerMap: Map<TKey1, Set<TKey2>> = new Map<TKey1, Set<TKey2>>();

  public has(k1: TKey1, k2: TKey2): boolean {

    if (!this.innerMap.has(k1)) return false;

    return this.innerMap.get(k1)!.has(k2);
  }


  public add(k1: TKey1, k2: TKey2) {

    if (!this.innerMap.has(k1)) {
      this.innerMap.set(k1, new Set<TKey2>());
    }

    this.innerMap.get(k1)!.add(k2);
  }

  public delete(k1: TKey1, k2: TKey2) {

    if (this.innerMap.has(k1)) {

      this.innerMap.get(k1)!.delete(k2);
    }
  }

  public clear() {
    this.innerMap.clear();
  }

  public key1s(): TKey1[] {

    let k1s: TKey1[] = [];

    for (const key of this.innerMap.keys()) {

      k1s.push(key);
    }


    return k1s;
  }


  public key2s(): TKey2[] {

    let k2s: TKey2[] = [];

    for (const map of this.innerMap.values()) {

      for (const key of map.keys()) {

        k2s.push(key);
      }
    }

    return k2s;
  }


  public entries(): DoubleKeyEntry<TKey1, TKey2>[] {

    let entries: DoubleKeyEntry<TKey1, TKey2>[] = [];

    for (const key1 of this.innerMap.keys()) {

      let map = this.innerMap.get(key1)!;

      for (const key2 of map.keys()) {

        let entry = new DoubleKeyEntry(key1, key2);

        entries.push(entry);
      }
    }
    return entries;
  }


}
