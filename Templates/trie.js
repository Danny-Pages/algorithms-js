/* 
    Prefix Tree

    When to use:
    - Implementing autocomplete features
    - Solving word search problems
    - Efficiently storing and searching strings

    Key concept: Use a tree-like data structure to store and retrieve strings based on their prefixes.
*/

class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;

    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }

    node.isEnd = true;
  }

  search(word) {
    let node = this.root;

    for (const char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }

    return node.isEnd;
  }
}

// Minimal inline version (more common in interviews)

class Trie {
  constructor() {
    this.root = { children: {}, end: false };
  }

  insert(word) {
    let node = this.root;
    for (const c of word) {
      node = node.children[c] ??= { children: {}, end: false };
    }
    node.end = true;
  }

  search(word) {
    let node = this.root;
    for (const c of word) {
      if (!(c in node.children)) return false;
      node = node.children[c];
    }
    return node.end;
  }
}
