// Balanced Binary Search Tree
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root = this.buildTree(arr);
  }

  // Function to build a balanced BST from a sorted array
  buildTree(array) {
    const sortArr = sortArray(array);

    if (sortArr.length === 0) {
      return null;
    }

    const mid = Math.floor(sortArr.length / 2);
    const root = new Node(sortArr[mid]);
    root.left = this.buildTree(sortArr.slice(0, mid));
    root.right = this.buildTree(sortArr.slice(mid + 1));

    return root;
  }

  // Function to insert a value into the BST
  insert(value) {
    this.root = this.insertRecursive(this.root, value);
  }

  // Recursive helper function for insert operation
  insertRecursive(root, value) {
    if (root === null) {
      return new Node(value);
    }

    if (value < root.data) {
      root.left = this.insertRecursive(root.left, value);
    } else if (value > root.data) {
      root.right = this.insertRecursive(root.right, value);
    }

    return root;
  }

  // Function to delete a value from the BST
  delete(value) {
    this.root = this.deleteRecursive(this.root, value);
  }

  // Recursive helper function for delete operation
  deleteRecursive(root, value) {
    if (root === null) {
      return null;
    }

    if (value < root.data) {
      root.left = this.deleteRecursive(root.left, value);
    } else if (value > root.data) {
      root.right = this.deleteRecursive(root.right, value);
    } else {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      } else {
        root.data = this.getMinValue(root.right);
        root.right = this.deleteRecursive(root.right, root.data);
      }
    }

    return root;
  }

  // Function to find a value in the BST
  find(value) {
    return this.findRecursive(this.root, value);
  }

  // Recursive helper function for find operation
  findRecursive(root, value) {
    if (root === null || root.data === value) {
      return root;
    }

    if (value > root.data) {
      return this.findRecursive(root.right, value);
    } else {
      return this.findRecursive(root.left, value);
    }
  }

  // Function to perform level order traversal
  levelOrder(callback) {
    if (!this.root) {
      return [];
    }

    let result = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift();
      result.push(callback ? callback(currentNode) : currentNode.data);

      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
    return result;
  }

  // Function to perform in-order traversal
  inOrder(root, callback) {
    if (!root) {
      return [];
    }

    const result = [];

    function traverse(node) {
      if (node.left) {
        traverse(node.left);
      }
      result.push(callback ? callback(node) : node.data);
      if (node.right) {
        traverse(node.right);
      }
    }

    traverse(root);
    return result;
  }

  // Function to perform pre-order traversal
  preOrder(root, callback) {
    if (!root) {
      return [];
    }

    const result = [];

    function traverse(node) {
      result.push(callback ? callback(node) : node.data);
      if (node.left) {
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
    }

    traverse(root);
    return result;
  }

  // Function to perform post-order traversal
  postOrder(root, callback) {
    if (!root) {
      return [];
    }

    const result = [];

    function traverse(node) {
      if (node.left) {
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
      result.push(callback ? callback(node) : node.data);
    }

    traverse(root);
    return result;
  }

  // Function to calculate the height of a node
  height(node) {
    if (!node) {
      return 0;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Function to calculate the depth of a node
  depth(node) {
    return this.depthRecursive(this.root, node, 0);
  }

  // Recursive helper function for depth calculation
  depthRecursive(root, targetNode, currentDepth) {
    if (!root) {
      return -1;
    }

    if (root === targetNode) {
      return currentDepth;
    }

    const leftDepth = this.depthRecursive(
      root.left,
      targetNode,
      currentDepth + 1
    );
    if (leftDepth !== -1) {
      return leftDepth;
    }

    const rightDepth = this.depthRecursive(
      root.right,
      targetNode,
      currentDepth + 1
    );
    return rightDepth;
  }

  // Function to check if the tree is balanced
  isBalanced() {
    return this.isBalancedRecursive(this.root);
  }

  // Recursive helper function for balance check
  isBalancedRecursive(node) {
    if (!node) {
      return true;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    return (
      this.isBalancedRecursive(node.left) &&
      this.isBalancedRecursive(node.right)
    );
  }

  // Function to rebalance the tree
  rebalance() {
    const nodes = this.inOrder(this.root);
    this.root = this.buildTree(nodes);
  }

  // Function to get the minimum value in a subtree
  getMinValue(root) {
    let minValue = root.data;

    while (root.left !== null) {
      minValue = root.left.data;
      root = root.left;
    }

    return minValue;
  }

  // Static function to generate an array of random numbers
  static getRandomNumbers(count, max) {
    const randomNumbers = [];
    for (let i = 0; i < count; i++) {
      randomNumbers.push(Math.floor(Math.random() * max));
    }
    return randomNumbers;
  }
}

// Function to sort an array and remove duplicates
const sortArray = (arr) => {
  let uniqueArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (!uniqueArray.includes(arr[i])) {
      uniqueArray.push(arr[i]);
    }
  }
  return uniqueArray.sort((a, b) => a - b);
};

// Driver script
const randomNumbers = Tree.getRandomNumbers(10, 100);

// Function to pretty print the tree
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Creating an instance of the Tree with random numbers
const test = new Tree(randomNumbers);

// Pretty printing the tree and displaying the level order traversal
prettyPrint(test.root);
console.log(test.levelOrder());
