class Node {
    constructor(data = null, left = null, right = null){
        this.data = data
        this.left = left
        this.right = right
    }
}

class Tree {
    constructor(array){
        this.root = this.buildTree(array)
    }

    buildTree(array){
        const unique = Array.from(new Set(array), Number)
        const sorted = unique.sort((a,b) => a - b)
        return this.createBST(sorted, 0, sorted.length)
    }

    createBST(array, start, end) {
        if (start > end) return null
        const mid = Math.ceil((start + end) / 2)
        const current = new Node(array[mid])

        current.left = this.createBST(array, start, mid-1)
        current.right = this.createBST(array, mid+1, end)

        return current
    }

    insert(key){
        this.root = this.insertRec(this.root, key)
    }

    insertRec(root, key){
        if (root == null) {
            root = new Node(key)
            return root
        }
        
        if (key < root.data){
            root.left = this.insertRec(root.left, key)
        }
        else if (key > root.data){
            root.right = this.insertRec(root.right, key)
        }

        return root
    }

    delete(k){
        this.root = this.deleteNode(this.root, k)
    }

    deleteNode(root, k){
        if (root === null) {
            return root
        }

        if (root.data > k){
            root.left = this.deleteNode(root.left, k)
            return root
        }
        else if (root.data < k){
            root.right = this.deleteNode(root.right, k)
            return root
        }

        //We reach here when root is the node to be deleted
        //If one child is empty
        if (root.left == null){
            let temp = root.right
            //delete root
            return temp
        } else if (root.right === null) {
            let temp = root.left
            return temp
        }

        //if both children exist
        else {
            let succParent = root

            //find successor
            let succ = root.right
            while (succ.left !== null){
                succParent = succ;
                succ = succ.left
            }

            //delete successor
            if (succParent !== root){
                succParent.left = succ.right
            }
            else {
                succParent.right = succ.right
            }

            //copy successor data to root
            root.data = succ.data

            return root
        }

    }

    find(value){
        return this.findRec(this.root, value)
    }
    findRec(node, value){
        if (node === null) {
            return
        }

        if (node.data == value) {
            return node
        }

        else if (value < node.data){
            node = this.findRec(node.left, value)
        }

        else if (value > node.data){
            node = this.findRec(node.right, value)
        }

        return node
    }

    levelOrder(callback){
        
    }
}

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

const myArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const myTree = new Tree(myArray)
myTree.insert(2)
myTree.insert(13)
myTree.insert(14)
myTree.insert(15)
myTree.delete(13)
myTree.delete(1)
myTree.delete(15)
prettyPrint(myTree.root)
console.log(myTree.find(23))
