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

  insert(value) {
    this.root = this.insertRecursive(this.root, value);
  }

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

  delete(value) {
    this.root = this.deleteRecursive(this.root, value);
  }

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

  find(value) {
    return this.findRecursive(this.root, value);
  }

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

  getMinValue(root) {
    let minValue = root.data;

    while (root.left !== null) {
      minValue = root.left.data;
      root = root.left;
    }

    return minValue;
  }
}

// function to sort Array
const sortArray = (arr) => {
  let uniqueArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (!uniqueArray.includes(arr[i])) {
      uniqueArray.push(arr[i]);
    }
  }
  return uniqueArray.sort((a, b) => a - b);
};

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

console.log(sortArray(arr));
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
