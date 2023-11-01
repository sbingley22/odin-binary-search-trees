class LinkedList {
    constructor(){
        this.nodeStart = null
    }

    append(value){
        if (this.nodeStart == null){
            this.nodeStart = new Node(value)
        }
        else {
            const lastnode = this.tail()
            lastnode.nextNode = new Node(value)
        }
    }

    prepend(value){
        if (this.nodeStart == null){
            this.nodeStart = new Node(value)
        }
        else {
            let temp = new Node(this.nodeStart.value, this.nodeStart.nextNode)
            this.nodeStart = new Node(value, temp)
        }
    }

    size(){
        let size = 0
        let nd = this.nodeStart
        while(nd != null){
            size += 1
            nd = nd.nextNode
        }
        return size
    }

    head(){
        return this.nodeStart
    }

    tail(){
        let node = this.nodeStart
        let nextNode = this.nodeStart
        while (nextNode != null){
            node = nextNode
            nextNode = node.nextNode
        }
        return node
    }

    at(index){
        let node = this.nodeStart
        let count = 0
        while(node != null && count != index){
            count += 1
            node = node.nextNode
        }
        return node
    }

    pop(){
        if (this.nodeStart == null) {
            return; // Nothing to pop if the list is empty
        }

        if (this.nodeStart.nextNode == null) {
            this.nodeStart = null; // If there's only one node in the list, remove it
            return;
        }

        let node = this.nodeStart;
        let nextNode = node.nextNode;

        while (nextNode.nextNode != null){
            node = nextNode;
            nextNode = node.nextNode;
        }

        node.nextNode = null;
    }

    contains(value){
        let node = this.nodeStart
        while (node != null){
            if (node.value == value) return true
            node = node.nextNode
        }
        return false
    }

    find(value){
        let node = this.nodeStart
        let index = 0
        while (node != null){
            if (node.value == value) return index
            node = node.nextNode
            index += 1
        }
        return null
    }

    toString(){
        let node = this.nodeStart
        let string = ""
        while (node != null){
            string += `( ${node.value} ) -> `
            node = node.nextNode
        }
        string += "null"
        return string
    }

}

class Node {
    constructor(value = null, nextNode = null){
        this.value = value
        this.nextNode = nextNode
    }
}

const linkedList = new LinkedList()
//console.log(linkedList)
linkedList.append("hello")
//console.log(linkedList)
linkedList.append("there")
//console.log(linkedList.tail())
//console.log(linkedList.head())
linkedList.prepend("Well")
//console.log(linkedList.head())
linkedList.pop()
console.log(linkedList.find("hello"))
console.log(linkedList.toString())
