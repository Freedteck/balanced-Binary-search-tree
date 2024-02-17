# Binary Search Tree (BST) Implementation in JavaScript

This repository contains a simple implementation of a Balanced Binary Search Tree (BST) in JavaScript. The code provides functionality for creating, inserting, deleting, and searching for nodes in the tree. Additionally, it includes a method to pretty print the tree for better visualization.

## Table of Contents
- [Overview](#overview)
- [Usage](#usage)
- [Methods](#methods)
- [Example](#example)

## Overview

A Binary Search Tree is a data structure that maintains a sorted set of elements. Each node in the tree has a value, a left child, and a right child. The left child's value is less than its parent, and the right child's value is greater. This implementation ensures balance during construction to optimize search, insertion, and deletion operations.

## Usage

1. **Create a new BST:**

    ```bash
    const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
    const bst = new Tree(arr);
    ```

2. **Insert a value:**

    ```bash
    bst.insert(10);
    ```

3. **Delete a value:**

    ```bash
    bst.delete(7);
    ```

4. **Search for a value:**

    ```bash
    const foundNode = bst.find(23);
    ```

5. **Pretty print the tree:**

    ```bash
    prettyPrint(bst.root);
    ```

## Methods

- **insert(value):** Inserts a new node with the given value into the BST.
- **delete(value):** Deletes the node with the specified value from the BST.
- **find(value):** Searches for a node with the given value in the BST and returns the node if found.
- **prettyPrint(node, prefix, isLeft):** Recursively prints the tree in a visually appealing format.

## Example

```bash
const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const bst = new Tree(arr);

bst.insert(10);
bst.delete(7);

const foundNode = bst.find(23);

prettyPrint(bst.root);
