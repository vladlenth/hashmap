class HashMap {
  constructor() {
    this.buckets = [];
    this.size = 0;
  }

  hash(key) {
    let hash = 0;
    const keyString = String(key);
    for (let i = 0; i < keyString.length; i++) {
      hash += keyString.charCodeAt(i);
    }
    return hash % 100;
  }

  set(key, value) {
    const index = this.hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const pair = bucket[i];
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;
  }


  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (!bucket) return undefined;

    for (let i=0; i<bucket.length; i++) {
      const pair = bucket[i];
      if (pair[0] === key) {
        return pair[1];
      }
    }
    return undefined;
  }


  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (!bucket) return false;

    for (let i=0; i<bucket.length; i++) {
      if (bucket[i][0] === key) {
        return true;
      }
    }
    return false;
  }


  delete(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (!bucket) return false;

    for (let i=0; i<bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i,1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  clear() {
    this.buckets = [];
    this.size=0;
  }

  keys() {
     const keysArray= [];
     for (const bucket of this.buckets) {
       if (bucket) {
         for (const [k] of bucket) keysArray.push(k);
       }
     }
     return keysArray;
   }

   values() {
     const valuesArray= [];
     for (const bucket of this.buckets) {
       if (bucket) {
         for (const [_, v] of bucket) valuesArray.push(v);
       }
     }
     return valuesArray;
   }

   entries() {
     const entriesArray= [];
     for (const bucket of this.buckets) {
       if (bucket) {
         for (const [k,v] of bucket){
           entriesArray.push([k,v]);
         }
       }
     }
     return entriesArray;
   }

   *[Symbol.iterator]() { 
     for (const [k] of this.entries()) { 
       yield k; 
     } 
   } 
}

const myMap = new HashMap();

// myMap.set('яблоко', 'фрукт');
// myMap.set('картошка', 'овощ');

// console.log(myMap.get('яблоко'));

// console.log(myMap.has('картошка'));

// for (let key of myMap) { 
//   console.log('Ключ:', key); 
// }

// console.log('Все значения:', myMap.values());

// console.log('Все пары:', myMap.entries());

// myMap.delete('яблоко');
// console.log('После удаления:', myMap.keys()); 

// myMap.clear();
// console.log('После очистки:', myMap.keys()); 