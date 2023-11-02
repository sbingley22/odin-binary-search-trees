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
        const mid = Math.floor((start + end) / 2)
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

    getValue = (node) =>{
        return node.data
    }

    levelOrder(callback = this.getValue){
        if (this.root == null) return

        const values = []

        let queue = [this.root]
        while (queue.length > 0){
            const nextQueue = []
            for (let i = 0; i < queue.length; i++) {
                const node = queue[i];
                if (node == null) continue

                nextQueue.push(node.left)
                nextQueue.push(node.right)

                values.push(callback(node))
            }
            queue = nextQueue
        }

        return values
    }

    inOrder(callback){
        if (typeof callback === "function"){
            this.inOrderRec(this.root, callback)
        }
        else{
            const values = [];
            this.inOrderRec(this.root, (node) => {
                values.push(node.data);
            });
            return values
        }
    }
    inOrderRec(node, callback){
        if (node == null) return

        this.inOrderRec(node.left, callback)
        callback(node)
        this.inOrderRec(node.right, callback)
    }

    preOrder(callback){
        if (typeof callback === "function"){
            this.preOrderRec(this.root, callback)
        }
        else{
            const values = [];
            this.preOrderRec(this.root, (node) => {
                values.push(node.data);
            });
            return values
        }
    }
    preOrderRec(node, callback){
        if (node == null) return

        callback(node)
        this.preOrderRec(node.left, callback)
        this.preOrderRec(node.right, callback)
    }

    postOrder(callback){
        if (typeof callback === "function"){
            this.postOrderRec(this.root, callback)
        }
        else{
            const values = [];
            this.postOrderRec(this.root, (node) => {
                values.push(node.data);
            });
            return values
        }
    }
    postOrderRec(node, callback){
        if (node == null) return

        this.postOrderRec(node.left, callback)
        this.postOrderRec(node.right, callback)
        callback(node)
    }

    height(node){
        return this.heightRec(node, 0)
    }
    heightRec(node, h){
        if (node === null) return h-1

        h += 1
        
        const l = this.heightRec(node.left, h)
        const r = this.heightRec(node.right, h)

        if (l > r) return l
        else return r
    }

    depth(target){
        return this.depthRec(this.root, target, 0)
    }
    depthRec(node, target, h){
        if (node === null) return -1
        if (node === target){
            return h
        }
        h += 1
        
        const l = this.depthRec(node.left, target, h)
        const r = this.depthRec(node.right, target, h)

        if (l > r) return l
        else return r
    }

    isBalanced(){
        const l = this.isBalancedRec(this.root.left)
        const r = this.isBalancedRec(this.root.right)
        if (l === r) return true
        else return false
    }
    isBalancedRec(node){
        if (node === null) return -1
        
        let n = 2
        n += this.isBalancedRec(node.left)
        n += this.isBalancedRec(node.right)

        return n
    }

    rebalance(){
        const values = [];
        this.rebalanceRec(this.root, (node) => {
            if (node.data !== null) values.push(node.data);
        })
        this.root = this.buildTree(values)
    }
    rebalanceRec(node, callback){
        if (node == null) return

        this.postOrderRec(node.left, callback)
        this.postOrderRec(node.right, callback)
        callback(node)
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

const addOneLog = (node) => {
    node.data += 1
    console.log(node.data)
}
const addLog = (node) => {
    console.log(node.data)
}

const myArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const myTree = new Tree(myArray)
myTree.insert(2)
myTree.insert(15)
prettyPrint(myTree.root)
console.log(myTree.inOrder())
console.log(myTree.postOrder())
console.log(myTree.preOrder())
console.log(myTree.isBalanced())
myTree.rebalance()
prettyPrint(myTree.root)