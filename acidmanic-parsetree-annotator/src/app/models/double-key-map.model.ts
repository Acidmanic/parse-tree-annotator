export class DoubleKeyMapModel<TKey1, TKey2, TValue> {


  private readonly innerMap: Map<TKey1, Map<TKey2, TValue>> = new Map<TKey1, Map<TKey2, TValue>>();

  public has(k1: TKey1, k2: TKey2): boolean {

    if (!this.innerMap.has(k1)) return false;

    return this.innerMap.get(k1)!.has(k2);
  }


  public set(k1: TKey1, k2: TKey2, value: TValue) {

    if (!this.innerMap.has(k1)) {
      this.innerMap.set(k1, new Map<TKey2, TValue>());
    }

    this.innerMap.get(k1)!.set(k2, value);
  }

  public delete(k1: TKey1, k2: TKey2) {

    if (!this.innerMap.has(k1)) return false;

    return this.innerMap.get(k1)!.delete(k2);
  }

  public values(): TValue[] {

    let allValues: TValue[] = []

    for (const valuesByK2 of this.innerMap.values()) {

      for (const value of valuesByK2.values()) {

        allValues.push(value);
      }
    }
    return allValues
  }


  public key1s(): TKey1[] {

    let key1: TKey1[] = [];

    for (const key of this.innerMap.keys()) {
      key1.push(key);
    }

    return key1;
  }

  public key2s(): TKey2[] {

    let key2: TKey2[] = [];

    for (const valuesByK2 of this.innerMap.values()) {

      for (const k2 of valuesByK2.keys()) {

        key2.push(k2);
      }
    }

    return key2;
  }

  public get(k1: TKey1, k2: TKey2): TValue | undefined {

    if (this.innerMap.has(k1)) {

      let keyV2 = this.innerMap.get(k1)!;

      if (keyV2.has(k2)) {

        return keyV2.get(k2);
      }
    }

    return;
  }

}
