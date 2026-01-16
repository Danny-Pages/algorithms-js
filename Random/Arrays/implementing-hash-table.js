console.clear();

class HashTable {
  constructor(size = 10) {
    this.size = size; // Size of the hash table
    this.buckets = Array.from({ length: size }, () => []); // Initialize buckets for chaining
  }

  // Hash function to map keys to bucket indices --- O(1) O(1)
  _hash(key) {
    return key % this.size;
  }

  // Set a key-value pair --- O(n) O(1)
  set(key, value) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    // Check if key already exists and update
    for (let i = 0; i < bucket.length; i++) {
      const [storedKey, storedValue] = bucket[i];
      if (storedKey === key) {
        bucket[i] = [key, value]; // Update the value
        return;
      }
    }

    // If key does not exist, add new key-value pair
    bucket.push([key, value]);
  }

  // Get the value for a given key --- O(n) O(1)
  get(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    // Search for the key in the bucket
    for (let [storedKey, storedValue] of bucket) {
      if (storedKey === key) {
        return storedValue;
      }
    }

    // Key not found, throw error
    throw new Error("KeyError: Key not found");
  }

  // Remove a key-value pair --- O(n) O(1)
  remove(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    // Search for the key in the bucket and remove
    for (let i = 0; i < bucket.length; i++) {
      const [storedKey, storedValue] = bucket[i];
      if (storedKey === key) {
        bucket.splice(i, 1); // Remove the key-value pair
        return;
      }
    }

    // Key not found, throw error
    throw new Error("KeyError: Key not found");
  }
}

// Test cases
const hashTable = new HashTable();

try {
  console.log(hashTable.get(1)); // Throws KeyError
} catch (e) {
  console.log(e.message); // KeyError: Key not found
}

hashTable.set(1, "value1");
console.log(hashTable.get(1)); // 'value1'

hashTable.set(1, "updatedValue1");
console.log(hashTable.get(1)); // 'updatedValue1'

hashTable.set(2, "value2");
console.log(hashTable.get(2)); // 'value2'

try {
  hashTable.remove(3); // Throws KeyError
} catch (e) {
  console.log(e.message); // KeyError: Key not found
}

hashTable.remove(1);
try {
  console.log(hashTable.get(1)); // Throws KeyError
} catch (e) {
  console.log(e.message); // KeyError: Key not found
}
