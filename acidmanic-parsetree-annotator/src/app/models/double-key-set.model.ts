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

  public clear(){
    this.innerMap.clear();
  }

}
