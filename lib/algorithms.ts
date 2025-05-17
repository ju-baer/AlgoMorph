// Data structure categories and definitions
export const dataStructureCategories = [
  {
    key: "linear",
    name: "Linear Data Structures",
    dataStructures: [
      {
        key: "linkedList",
        name: "Linked List",
        category: "linear",
        description:
          "A linked list is a linear data structure where elements are stored in nodes, each pointing to the next node.",
        timeComplexity: "Access: O(n), Insert/Delete: O(1) at head, O(n) elsewhere",
        spaceComplexity: "O(n)",
        bestFor: "Dynamic collections with frequent insertions/deletions",
        code: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  // Insert at the beginning
  insertAtHead(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
    return this;
  }
  
  // Insert at the end
  insertAtTail(value) {
    const newNode = new Node(value);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    
    this.size++;
    return this;
  }
  
  // Delete a node with given value
  delete(value) {
    if (!this.head) return null;
    
    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;
      return this;
    }
    
    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }
    
    if (current.next) {
      current.next = current.next.next;
      this.size--;
    }
    
    return this;
  }
  
  // Search for a value
  search(value) {
    let current = this.head;
    let index = 0;
    
    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.next;
      index++;
    }
    
    return -1;
  }
}`,
        generateSteps: (array: number[]) => {
          const steps = []
          const arr = [...array].slice(0, 7) // Limit to 7 elements for visualization

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting Linked List Operations",
            codeLine: 1,
            dataStructure: "linkedList",
            nodes: [],
            operation: "initialize",
          })

          // Initialize an empty linked list
          const linkedList = { head: null, nodes: [] }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Created an empty linked list",
            codeLine: 7,
            dataStructure: "linkedList",
            nodes: [...linkedList.nodes],
            operation: "initialize",
          })

          // Insert elements at the head
          for (let i = 0; i < Math.min(3, arr.length); i++) {
            steps.push({
              array: [...arr],
              comparisons: [i],
              swaps: [],
              message: `Inserting ${arr[i]} at the head`,
              codeLine: 14,
              dataStructure: "linkedList",
              nodes: [...linkedList.nodes],
              operation: "insertAtHead",
              currentValue: arr[i],
            })

            // Create new node
            const newNode = {
              value: arr[i],
              next: linkedList.head ? linkedList.nodes.findIndex((n) => n.id === linkedList.head) : null,
              id: i,
            }
            linkedList.nodes.unshift(newNode)
            linkedList.head = 0

            // Update next pointers after insertion
            linkedList.nodes = linkedList.nodes.map((node, idx) => {
              if (idx > 0 && node.next !== null) {
                return { ...node, next: node.next + 1 }
              }
              return node
            })

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Inserted ${arr[i]} at the head`,
              codeLine: 17,
              dataStructure: "linkedList",
              nodes: [...linkedList.nodes],
              operation: "insertAtHead",
            })
          }

          // Insert elements at the tail
          for (let i = 3; i < Math.min(6, arr.length); i++) {
            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Inserting ${arr[i]} at the tail`,
              codeLine: 22,
              dataStructure: "linkedList",
              nodes: [...linkedList.nodes],
              operation: "insertAtTail",
              currentValue: arr[i],
            })

            // Find the last node
            let lastNodeIdx = null
            let currentIdx = linkedList.head

            while (currentIdx !== null) {
              const currentNode = linkedList.nodes[currentIdx]
              if (currentNode.next === null) {
                lastNodeIdx = currentIdx
                break
              }
              currentIdx = currentNode.next
            }

            // Create new node
            const newNode = { value: arr[i], next: null, id: linkedList.nodes.length }
            linkedList.nodes.push(newNode)

            // Update the last node's next pointer
            if (lastNodeIdx !== null) {
              linkedList.nodes[lastNodeIdx].next = linkedList.nodes.length - 1

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Traversing to the end of the list`,
                codeLine: 27,
                dataStructure: "linkedList",
                nodes: [...linkedList.nodes],
                operation: "insertAtTail",
                highlightNodes: [lastNodeIdx],
              })
            } else {
              // If the list was empty
              linkedList.head = linkedList.nodes.length - 1
            }

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Inserted ${arr[i]} at the tail`,
              codeLine: 30,
              dataStructure: "linkedList",
              nodes: [...linkedList.nodes],
              operation: "insertAtTail",
            })
          }

          // Search for a value
          if (arr.length > 0) {
            const valueToSearch = arr[Math.floor(arr.length / 2)]

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Searching for value ${valueToSearch}`,
              codeLine: 58,
              dataStructure: "linkedList",
              nodes: [...linkedList.nodes],
              operation: "search",
              currentValue: valueToSearch,
            })

            // Simulate search
            let currentIdx = linkedList.head
            let index = 0
            let found = false

            while (currentIdx !== null) {
              const currentNode = linkedList.nodes[currentIdx]

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Checking node with value ${currentNode.value}`,
                codeLine: 61,
                dataStructure: "linkedList",
                nodes: [...linkedList.nodes],
                operation: "search",
                highlightNodes: [currentIdx],
              })

              if (currentNode.value === valueToSearch) {
                found = true

                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Found ${valueToSearch} at index ${index}`,
                  codeLine: 62,
                  dataStructure: "linkedList",
                  nodes: [...linkedList.nodes],
                  operation: "search",
                  highlightNodes: [currentIdx],
                })

                break
              }

              currentIdx = currentNode.next
              index++
            }

            if (!found) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Value ${valueToSearch} not found in the list`,
                codeLine: 69,
                dataStructure: "linkedList",
                nodes: [...linkedList.nodes],
                operation: "search",
              })
            }
          }

          // Delete a value
          if (arr.length > 0) {
            const valueToDelete = arr[0]

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Deleting value ${valueToDelete}`,
              codeLine: 38,
              dataStructure: "linkedList",
              nodes: [...linkedList.nodes],
              operation: "delete",
              currentValue: valueToDelete,
            })

            // Check if head has the value
            if (linkedList.nodes[linkedList.head].value === valueToDelete) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Value ${valueToDelete} found at the head`,
                codeLine: 41,
                dataStructure: "linkedList",
                nodes: [...linkedList.nodes],
                operation: "delete",
                highlightNodes: [linkedList.head],
              })

              // Update head
              const newHead = linkedList.nodes[linkedList.head].next
              linkedList.head = newHead

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Deleted ${valueToDelete} from the head`,
                codeLine: 42,
                dataStructure: "linkedList",
                nodes: [...linkedList.nodes],
                operation: "delete",
                deletedNode: 0,
              })
            } else {
              // Search for the node before the one to delete
              let currentIdx = linkedList.head
              let prevIdx = null
              let found = false

              while (currentIdx !== null) {
                const currentNode = linkedList.nodes[currentIdx]

                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Checking node with value ${currentNode.value}`,
                  codeLine: 48,
                  dataStructure: "linkedList",
                  nodes: [...linkedList.nodes],
                  operation: "delete",
                  highlightNodes: [currentIdx],
                })

                if (currentNode.next !== null && linkedList.nodes[currentNode.next].value === valueToDelete) {
                  found = true

                  steps.push({
                    array: [...arr],
                    comparisons: [],
                    swaps: [],
                    message: `Found ${valueToDelete} at the next node`,
                    codeLine: 49,
                    dataStructure: "linkedList",
                    nodes: [...linkedList.nodes],
                    operation: "delete",
                    highlightNodes: [currentNode.next],
                  })

                  // Update next pointer to skip the node to delete
                  const nodeToDelete = currentNode.next
                  const nextNode = linkedList.nodes[nodeToDelete].next
                  linkedList.nodes[currentIdx].next = nextNode

                  steps.push({
                    array: [...arr],
                    comparisons: [],
                    swaps: [],
                    message: `Deleted ${valueToDelete} by updating next pointer`,
                    codeLine: 53,
                    dataStructure: "linkedList",
                    nodes: [...linkedList.nodes],
                    operation: "delete",
                    deletedNode: nodeToDelete,
                  })

                  break
                }

                prevIdx = currentIdx
                currentIdx = currentNode.next
              }

              if (!found) {
                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Value ${valueToDelete} not found in the list`,
                  codeLine: 56,
                  dataStructure: "linkedList",
                  nodes: [...linkedList.nodes],
                  operation: "delete",
                })
              }
            }
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Linked List operations complete!",
            codeLine: 71,
            dataStructure: "linkedList",
            nodes: [...linkedList.nodes],
            operation: "complete",
          })

          return steps
        },
      },
      {
        key: "stack",
        name: "Stack",
        category: "linear",
        description:
          "A stack is a LIFO (Last In, First Out) data structure where elements are added and removed from the same end.",
        timeComplexity: "Push/Pop: O(1)",
        spaceComplexity: "O(n)",
        bestFor: "Function call management, undo operations, expression evaluation",
        code: `class Stack {
  constructor() {
    this.items = [];
    this.size = 0;
  }
  
  // Add an element to the top
  push(element) {
    this.items.push(element);
    this.size++;
    return this;
  }
  
  // Remove and return the top element
  pop() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    this.size--;
    return this.items.pop();
  }
  
  // Return the top element without removing it
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.size - 1];
  }
  
  // Check if stack is empty
  isEmpty() {
    return this.size === 0;
  }
  
  // Clear the stack
  clear() {
    this.items = [];
    this.size = 0;
    return this;
  }
}`,
        generateSteps: (array: number[]) => {
          const steps = []
          const arr = [...array].slice(0, 7) // Limit to 7 elements for visualization

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting Stack Operations",
            codeLine: 1,
            dataStructure: "stack",
            items: [],
            operation: "initialize",
          })

          // Initialize an empty stack
          const stack = { items: [] }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Created an empty stack",
            codeLine: 3,
            dataStructure: "stack",
            items: [...stack.items],
            operation: "initialize",
          })

          // Push elements onto the stack
          for (let i = 0; i < Math.min(5, arr.length); i++) {
            steps.push({
              array: [...arr],
              comparisons: [i],
              swaps: [],
              message: `Pushing ${arr[i]} onto the stack`,
              codeLine: 8,
              dataStructure: "stack",
              items: [...stack.items],
              operation: "push",
              currentValue: arr[i],
            })

            stack.items.push(arr[i])

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Pushed ${arr[i]} onto the stack`,
              codeLine: 10,
              dataStructure: "stack",
              items: [...stack.items],
              operation: "push",
            })
          }

          // Peek at the top element
          if (stack.items.length > 0) {
            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: "Peeking at the top element",
              codeLine: 22,
              dataStructure: "stack",
              items: [...stack.items],
              operation: "peek",
            })

            const topElement = stack.items[stack.items.length - 1]

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Top element is ${topElement}`,
              codeLine: 25,
              dataStructure: "stack",
              items: [...stack.items],
              operation: "peek",
              highlightIndex: stack.items.length - 1,
            })
          }

          // Pop elements from the stack
          for (let i = 0; i < Math.min(3, stack.items.length); i++) {
            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: "Popping element from the stack",
              codeLine: 15,
              dataStructure: "stack",
              items: [...stack.items],
              operation: "pop",
            })

            const poppedElement = stack.items.pop()

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Popped ${poppedElement} from the stack`,
              codeLine: 19,
              dataStructure: "stack",
              items: [...stack.items],
              operation: "pop",
              poppedValue: poppedElement,
            })
          }

          // Check if stack is empty
          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Checking if stack is empty",
            codeLine: 29,
            dataStructure: "stack",
            items: [...stack.items],
            operation: "isEmpty",
          })

          const isEmpty = stack.items.length === 0

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: `Stack is ${isEmpty ? "empty" : "not empty"}`,
            codeLine: 30,
            dataStructure: "stack",
            items: [...stack.items],
            operation: "isEmpty",
          })

          // Clear the stack if not empty
          if (!isEmpty) {
            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: "Clearing the stack",
              codeLine: 34,
              dataStructure: "stack",
              items: [...stack.items],
              operation: "clear",
            })

            stack.items = []

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: "Stack cleared",
              codeLine: 36,
              dataStructure: "stack",
              items: [...stack.items],
              operation: "clear",
            })
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Stack operations complete!",
            codeLine: 38,
            dataStructure: "stack",
            items: [...stack.items],
            operation: "complete",
          })

          return steps
        },
      },
      {
        key: "queue",
        name: "Queue",
        category: "linear",
        description:
          "A queue is a FIFO (First In, First Out) data structure where elements are added at the rear and removed from the front.",
        timeComplexity: "Enqueue/Dequeue: O(1)",
        spaceComplexity: "O(n)",
        bestFor: "Task scheduling, breadth-first search, print job management",
        code: `class Queue {
  constructor() {
    this.items = [];
    this.size = 0;
  }
  
  // Add an element to the rear
  enqueue(element) {
    this.items.push(element);
    this.size++;
    return this;
  }
  
  // Remove and return the front element
  dequeue() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    this.size--;
    return this.items.shift();
  }
  
  // Return the front element without removing it
  front() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[0];
  }
  
  // Check if queue is empty
  isEmpty() {
    return this.size === 0;
  }
  
  // Clear the queue
  clear() {
    this.items = [];
    this.size = 0;
    return this;
  }
}`,
        generateSteps: (array: number[]) => {
          const steps = []
          const arr = [...array].slice(0, 7) // Limit to 7 elements for visualization

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting Queue Operations",
            codeLine: 1,
            dataStructure: "queue",
            items: [],
            operation: "initialize",
          })

          // Initialize an empty queue
          const queue = { items: [] }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Created an empty queue",
            codeLine: 3,
            dataStructure: "queue",
            items: [...queue.items],
            operation: "initialize",
          })

          // Enqueue elements
          for (let i = 0; i < Math.min(5, arr.length); i++) {
            steps.push({
              array: [...arr],
              comparisons: [i],
              swaps: [],
              message: `Enqueuing ${arr[i]} to the queue`,
              codeLine: 8,
              dataStructure: "queue",
              items: [...queue.items],
              operation: "enqueue",
              currentValue: arr[i],
            })

            queue.items.push(arr[i])

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Enqueued ${arr[i]} to the queue`,
              codeLine: 10,
              dataStructure: "queue",
              items: [...queue.items],
              operation: "enqueue",
            })
          }

          // Check front element
          if (queue.items.length > 0) {
            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: "Checking the front element",
              codeLine: 22,
              dataStructure: "queue",
              items: [...queue.items],
              operation: "front",
            })

            const frontElement = queue.items[0]

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Front element is ${frontElement}`,
              codeLine: 25,
              dataStructure: "queue",
              items: [...queue.items],
              operation: "front",
              highlightIndex: 0,
            })
          }

          // Dequeue elements
          for (let i = 0; i < Math.min(3, queue.items.length); i++) {
            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: "Dequeuing element from the queue",
              codeLine: 15,
              dataStructure: "queue",
              items: [...queue.items],
              operation: "dequeue",
            })

            const dequeuedElement = queue.items.shift()

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Dequeued ${dequeuedElement} from the queue`,
              codeLine: 19,
              dataStructure: "queue",
              items: [...queue.items],
              operation: "dequeue",
              dequeuedValue: dequeuedElement,
            })
          }

          // Check if queue is empty
          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Checking if queue is empty",
            codeLine: 29,
            dataStructure: "queue",
            items: [...queue.items],
            operation: "isEmpty",
          })

          const isEmpty = queue.items.length === 0

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: `Queue is ${isEmpty ? "empty" : "not empty"}`,
            codeLine: 30,
            dataStructure: "queue",
            items: [...queue.items],
            operation: "isEmpty",
          })

          // Clear the queue if not empty
          if (!isEmpty) {
            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: "Clearing the queue",
              codeLine: 34,
              dataStructure: "queue",
              items: [...queue.items],
              operation: "clear",
            })

            queue.items = []

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: "Queue cleared",
              codeLine: 36,
              dataStructure: "queue",
              items: [...queue.items],
              operation: "clear",
            })
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Queue operations complete!",
            codeLine: 38,
            dataStructure: "queue",
            items: [...queue.items],
            operation: "complete",
          })

          return steps
        },
      },
    ],
  },
  {
    key: "nonlinear",
    name: "Non-Linear Data Structures",
    dataStructures: [
      {
        key: "binaryTree",
        name: "Binary Tree",
        category: "nonlinear",
        description:
          "A binary tree is a tree data structure in which each node has at most two children, referred to as the left child and the right child.",
        timeComplexity: "Average: O(log n) for search, insert, delete; Worst: O(n)",
        spaceComplexity: "O(n)",
        bestFor: "Hierarchical data representation, efficient searching and sorting",
        code: `class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }
  
  // Insert a value into the binary search tree
  insert(value) {
    const newNode = new TreeNode(value);
    
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    
    function insertNode(node, newNode) {
      // If value is less than node value, go left
      if (newNode.value < node.value) {
        // If left is null, insert here
        if (node.left === null) {
          node.left = newNode;
        } else {
          // Otherwise, continue traversing left
          insertNode(node.left, newNode);
        }
      } else {
        // If right is null, insert here
        if (node.right === null) {
          node.right = newNode;
        } else {
          // Otherwise, continue traversing right
          insertNode(node.right, newNode);
        }
      }
    }
    
    insertNode(this.root, newNode);
    return this;
  }
  
  // Search for a value in the binary search tree
  search(value) {
    if (this.root === null) return false;
    
    let current = this.root;
    let found = false;
    
    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }
    
    return found;
  }
  
  // Traverse the tree in-order (left, root, right)
  inOrderTraversal(callback) {
    function traverse(node) {
      if (node !== null) {
        traverse(node.left);
        callback(node.value);
        traverse(node.right);
      }
    }
    
    traverse(this.root);
  }
}`,
        generateSteps: (array: number[]) => {
          // For tree visualization, we'll use a proper tree representation
          const steps = []
          const arr = [...array].slice(0, 7) // Limit to 7 elements for visualization

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting Binary Tree Operations",
            codeLine: 1,
            dataStructure: "binaryTree",
            treeNodes: [],
          })

          // Build the tree step by step
          const treeNodes = []

          for (let i = 0; i < arr.length; i++) {
            steps.push({
              array: [...arr],
              comparisons: [i],
              swaps: [],
              message: `Inserting value: ${arr[i]}`,
              codeLine: 13,
              dataStructure: "binaryTree",
              treeNodes: [...treeNodes],
              currentValue: arr[i],
            })

            // If tree is empty, create root
            if (treeNodes.length === 0) {
              treeNodes.push({
                value: arr[i],
                position: 1, // Root position (1-indexed for easier math)
                left: null,
                right: null,
              })

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Created root node with value ${arr[i]}`,
                codeLine: 17,
                dataStructure: "binaryTree",
                treeNodes: [...treeNodes],
              })
            } else {
              // Insert into the tree
              let currentPos = 1 // Start at root (position 1)
              let inserted = false

              while (!inserted) {
                // Find the node at current position
                const currentNode = treeNodes.find((node) => node.position === currentPos)

                if (!currentNode) break // Safety check

                if (arr[i] < currentNode.value) {
                  steps.push({
                    array: [...arr],
                    comparisons: [],
                    swaps: [],
                    message: `${arr[i]} < ${currentNode.value}, going to left child`,
                    codeLine: 24,
                    dataStructure: "binaryTree",
                    treeNodes: [...treeNodes],
                    highlightNodes: [currentPos],
                  })

                  const leftChildPos = currentPos * 2 // Left child position

                  // Check if left child exists
                  const leftChild = treeNodes.find((node) => node.position === leftChildPos)

                  if (!leftChild) {
                    // Create new node as left child
                    treeNodes.push({
                      value: arr[i],
                      position: leftChildPos,
                      left: null,
                      right: null,
                    })

                    // Update parent's left pointer
                    const parentIndex = treeNodes.findIndex((node) => node.position === currentPos)
                    treeNodes[parentIndex].left = leftChildPos

                    steps.push({
                      array: [...arr],
                      comparisons: [],
                      swaps: [],
                      message: `Inserted ${arr[i]} as left child of ${currentNode.value}`,
                      codeLine: 26,
                      dataStructure: "binaryTree",
                      treeNodes: [...treeNodes],
                      highlightNodes: [leftChildPos],
                    })

                    inserted = true
                  } else {
                    // Continue traversal to left child
                    currentPos = leftChildPos
                  }
                } else {
                  steps.push({
                    array: [...arr],
                    comparisons: [],
                    swaps: [],
                    message: `${arr[i]} >= ${currentNode.value}, going to right child`,
                    codeLine: 32,
                    dataStructure: "binaryTree",
                    treeNodes: [...treeNodes],
                    highlightNodes: [currentPos],
                  })

                  const rightChildPos = currentPos * 2 + 1 // Right child position

                  // Check if right child exists
                  const rightChild = treeNodes.find((node) => node.position === rightChildPos)

                  if (!rightChild) {
                    // Create new node as right child
                    treeNodes.push({
                      value: arr[i],
                      position: rightChildPos,
                      left: null,
                      right: null,
                    })

                    // Update parent's right pointer
                    const parentIndex = treeNodes.findIndex((node) => node.position === currentPos)
                    treeNodes[parentIndex].right = rightChildPos

                    steps.push({
                      array: [...arr],
                      comparisons: [],
                      swaps: [],
                      message: `Inserted ${arr[i]} as right child of ${currentNode.value}`,
                      codeLine: 34,
                      dataStructure: "binaryTree",
                      treeNodes: [...treeNodes],
                      highlightNodes: [rightChildPos],
                    })

                    inserted = true
                  } else {
                    // Continue traversal to right child
                    currentPos = rightChildPos
                  }
                }
              }
            }
          }

          // Search for a value
          if (arr.length > 0) {
            const valueToSearch = arr[0]

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Searching for value ${valueToSearch}`,
              codeLine: 45,
              dataStructure: "binaryTree",
              treeNodes: [...treeNodes],
              currentValue: valueToSearch,
            })

            let currentPos = 1 // Start at root
            let found = false

            while (currentPos) {
              const currentNode = treeNodes.find((node) => node.position === currentPos)
              if (!currentNode) break

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Checking node with value ${currentNode.value}`,
                codeLine: 51,
                dataStructure: "binaryTree",
                treeNodes: [...treeNodes],
                highlightNodes: [currentPos],
              })

              if (valueToSearch < currentNode.value) {
                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `${valueToSearch} < ${currentNode.value}, going to left child`,
                  codeLine: 52,
                  dataStructure: "binaryTree",
                  treeNodes: [...treeNodes],
                  highlightNodes: [currentPos],
                })

                currentPos = currentNode.left
              } else if (valueToSearch > currentNode.value) {
                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `${valueToSearch} > ${currentNode.value}, going to right child`,
                  codeLine: 54,
                  dataStructure: "binaryTree",
                  treeNodes: [...treeNodes],
                  highlightNodes: [currentPos],
                })

                currentPos = currentNode.right
              } else {
                found = true

                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Found value ${valueToSearch}!`,
                  codeLine: 56,
                  dataStructure: "binaryTree",
                  treeNodes: [...treeNodes],
                  highlightNodes: [currentPos],
                })

                break
              }
            }

            if (!found) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Value ${valueToSearch} not found in the tree`,
                codeLine: 59,
                dataStructure: "binaryTree",
                treeNodes: [...treeNodes],
              })
            }
          }

          // In-order traversal
          if (treeNodes.length > 0) {
            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: "Starting in-order traversal (Left, Root, Right)",
              codeLine: 64,
              dataStructure: "binaryTree",
              treeNodes: [...treeNodes],
            })

            const traversalResult: number[] = []

            // Helper function for in-order traversal
            const inOrderTraversal = (position: number) => {
              if (!position) return

              const node = treeNodes.find((n) => n.position === position)
              if (!node) return

              // First traverse left subtree
              if (node.left) {
                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Traversing left subtree of ${node.value}`,
                  codeLine: 66,
                  dataStructure: "binaryTree",
                  treeNodes: [...treeNodes],
                  highlightNodes: [position],
                })

                inOrderTraversal(node.left)
              }

              // Visit the node
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Visiting node ${node.value}`,
                codeLine: 67,
                dataStructure: "binaryTree",
                treeNodes: [...treeNodes],
                highlightNodes: [position],
              })

              traversalResult.push(node.value)

              // Then traverse right subtree
              if (node.right) {
                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Traversing right subtree of ${node.value}`,
                  codeLine: 68,
                  dataStructure: "binaryTree",
                  treeNodes: [...treeNodes],
                  highlightNodes: [position],
                })

                inOrderTraversal(node.right)
              }
            }

            // Start traversal from root
            inOrderTraversal(1)

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `In-order traversal result: [${traversalResult.join(", ")}]`,
              codeLine: 72,
              dataStructure: "binaryTree",
              treeNodes: [...treeNodes],
            })
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Binary Tree operations complete!",
            codeLine: 73,
            dataStructure: "binaryTree",
            treeNodes: [...treeNodes],
          })

          return steps
        },
      },
      {
        key: "hashTable",
        name: "Hash Table",
        category: "nonlinear",
        description:
          "A hash table is a data structure that implements an associative array abstract data type, a structure that can map keys to values.",
        timeComplexity: "Average: O(1) for search, insert, delete; Worst: O(n)",
        spaceComplexity: "O(n)",
        bestFor: "Fast lookups, insertions, and deletions with key-value pairs",
        code: `class HashTable {
  constructor(size = 10) {
    this.buckets = Array(size).fill().map(() => []);
    this.size = size;
  }
  
  // Hash function to convert key to index
  hash(key) {
    let hashValue = 0;
    
    // Convert string key to a numeric hash value
    if (typeof key === 'string') {
      for (let i = 0; i < key.length; i++) {
        hashValue += key.charCodeAt(i);
      }
    } else if (typeof key === 'number') {
      hashValue = key;
    } else {
      hashValue = String(key).length;
    }
    
    // Ensure hash value is within bucket range
    return hashValue % this.size;
  }
  
  // Insert a key-value pair
  set(key, value) {
    const index = this.hash(key);
    
    // Check if key already exists
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i].key === key) {
        this.buckets[index][i].value = value;
        return;
      }
    }
    
    // Key doesn't exist, add new key-value pair
    this.buckets[index].push({ key, value });
  }
  
  // Retrieve a value by key
  get(key) {
    const index = this.hash(key);
    
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i].key === key) {
        return this.buckets[index][i].value;
      }
    }
    
    return undefined;
  }
  
  // Remove a key-value pair
  delete(key) {
    const index = this.hash(key);
    
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i].key === key) {
        this.buckets[index].splice(i, 1);
        return true;
      }
    }
    
    return false;
  }
  
  // Check if key exists
  has(key) {
    const index = this.hash(key);
    
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i].key === key) {
        return true;
      }
    }
    
    return false;
  }
}`,
        generateSteps: (array: number[]) => {
          const steps = []
          const arr = [...array].slice(0, 7) // Limit to 7 elements for visualization

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting Hash Table Operations",
            codeLine: 1,
            dataStructure: "hashTable",
            hashTable: { buckets: [], size: 0 },
          })

          // Initialize hash table
          const hashTable = {
            buckets: Array(10)
              .fill()
              .map(() => []),
            size: 10,
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Created a hash table with 10 buckets",
            codeLine: 3,
            dataStructure: "hashTable",
            hashTable: { ...hashTable },
          })

          // Hash function
          const hash = (key: number) => {
            return key % hashTable.size
          }

          // Insert elements
          for (let i = 0; i < arr.length; i++) {
            const key = arr[i]
            const value = `Value-${key}`
            const index = hash(key)

            steps.push({
              array: [...arr],
              comparisons: [i],
              swaps: [],
              message: `Hashing key ${key}`,
              codeLine: 8,
              dataStructure: "hashTable",
              hashTable: { ...hashTable },
              currentValue: key,
            })

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Hash value for key ${key} is ${index}`,
              codeLine: 22,
              dataStructure: "hashTable",
              hashTable: { ...hashTable },
              highlightIndex: index,
              currentValue: key,
            })

            // Check if key already exists
            let keyExists = false
            for (let j = 0; j < hashTable.buckets[index].length; j++) {
              if (hashTable.buckets[index][j].key === key) {
                keyExists = true
                hashTable.buckets[index][j].value = value

                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Key ${key} already exists, updating value to ${value}`,
                  codeLine: 29,
                  dataStructure: "hashTable",
                  hashTable: { ...hashTable },
                  highlightIndex: index,
                  currentValue: key,
                })
                break
              }
            }

            // If key doesn't exist, add new key-value pair
            if (!keyExists) {
              hashTable.buckets[index].push({ key, value })

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Added new key-value pair: ${key} -> ${value} at bucket ${index}`,
                codeLine: 35,
                dataStructure: "hashTable",
                hashTable: { ...hashTable },
                highlightIndex: index,
                currentValue: key,
              })
            }
          }

          // Retrieve a value
          if (arr.length > 0) {
            const keyToGet = arr[0]
            const index = hash(keyToGet)

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Retrieving value for key ${keyToGet}`,
              codeLine: 40,
              dataStructure: "hashTable",
              hashTable: { ...hashTable },
              currentValue: keyToGet,
            })

            let found = false
            for (let i = 0; i < hashTable.buckets[index].length; i++) {
              if (hashTable.buckets[index][i].key === keyToGet) {
                found = true
                const value = hashTable.buckets[index][i].value

                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Found value "${value}" for key ${keyToGet}`,
                  codeLine: 44,
                  dataStructure: "hashTable",
                  hashTable: { ...hashTable },
                  highlightIndex: index,
                  currentValue: keyToGet,
                })
                break
              }
            }

            if (!found) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Key ${keyToGet} not found`,
                codeLine: 48,
                dataStructure: "hashTable",
                hashTable: { ...hashTable },
                highlightIndex: index,
                currentValue: keyToGet,
              })
            }
          }

          // Delete a key-value pair
          if (arr.length > 1) {
            const keyToDelete = arr[1]
            const index = hash(keyToDelete)

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Deleting key ${keyToDelete}`,
              codeLine: 52,
              dataStructure: "hashTable",
              hashTable: { ...hashTable },
              currentValue: keyToDelete,
            })

            let found = false
            for (let i = 0; i < hashTable.buckets[index].length; i++) {
              if (hashTable.buckets[index][i].key === keyToDelete) {
                found = true
                hashTable.buckets[index].splice(i, 1)

                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Deleted key ${keyToDelete} from bucket ${index}`,
                  codeLine: 56,
                  dataStructure: "hashTable",
                  hashTable: { ...hashTable },
                  highlightIndex: index,
                  currentValue: keyToDelete,
                })
                break
              }
            }

            if (!found) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Key ${keyToDelete} not found for deletion`,
                codeLine: 60,
                dataStructure: "hashTable",
                hashTable: { ...hashTable },
                highlightIndex: index,
                currentValue: keyToDelete,
              })
            }
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Hash Table operations complete!",
            codeLine: 73,
            dataStructure: "hashTable",
            hashTable: { ...hashTable },
          })

          return steps
        },
      },
    ],
  },
]

// Add this function to get data structures by key
export function getDataStructureByKey(key: string) {
  for (const category of dataStructureCategories) {
    const dataStructure = category.dataStructures.find((ds) => ds.key === key)
    if (dataStructure) {
      return dataStructure
    }
  }
  return null
}

// Algorithm categories and definitions

export const algorithmCategories = [
  {
    key: "sorting",
    name: "Sorting Algorithms",
    algorithms: [
      {
        key: "bubbleSort",
        name: "Bubble Sort",
        category: "sorting",
        description:
          "Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        bestFor: "Small datasets or nearly sorted arrays",
        code: `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    // Flag to optimize if array is already sorted
    let swapped = false;
    
    // Last i elements are already in place
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap them if they are in wrong order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swapping occurred in this pass, array is sorted
    if (!swapped) break;
  }
  
  return arr;
}`,
        generateSteps: (array: number[]) => {
          const steps = []
          const arr = [...array]
          const n = arr.length

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting Bubble Sort",
            codeLine: 1,
          })

          for (let i = 0; i < n; i++) {
            let swapped = false

            for (let j = 0; j < n - i - 1; j++) {
              steps.push({
                array: [...arr],
                comparisons: [j, j + 1],
                swaps: [],
                message: `Comparing ${arr[j]} and ${arr[j + 1]}`,
                codeLine: 11,
              })

              if (arr[j] > arr[j + 1]) {
                ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                swapped = true

                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [j, j + 1],
                  message: `Swapped ${arr[j]} and ${arr[j + 1]}`,
                  codeLine: 13,
                })
              }
            }

            if (!swapped) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: "Array is sorted, no more swaps needed",
                codeLine: 19,
              })
              break
            }

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Completed pass ${i + 1}`,
              codeLine: 7,
            })
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Sorting complete!",
            codeLine: 23,
          })

          return steps
        },
      },
      {
        key: "selectionSort",
        name: "Selection Sort",
        category: "sorting",
        description: "Selection Sort finds the minimum element from the unsorted part and puts it at the beginning.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        bestFor: "Small datasets with minimal memory usage requirements",
        code: `function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    // Find the minimum element in the unsorted part
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap the found minimum element with the first element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  
  return arr;
}`,
        generateSteps: (array: number[]) => {
          const steps = []
          const arr = [...array]
          const n = arr.length

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting Selection Sort",
            codeLine: 1,
          })

          for (let i = 0; i < n - 1; i++) {
            let minIndex = i

            steps.push({
              array: [...arr],
              comparisons: [i],
              swaps: [],
              message: `Finding minimum element starting from index ${i}`,
              codeLine: 5,
            })

            for (let j = i + 1; j < n; j++) {
              steps.push({
                array: [...arr],
                comparisons: [minIndex, j],
                swaps: [],
                message: `Comparing ${arr[minIndex]} and ${arr[j]}`,
                codeLine: 8,
              })

              if (arr[j] < arr[minIndex]) {
                minIndex = j
                steps.push({
                  array: [...arr],
                  comparisons: [minIndex],
                  swaps: [],
                  message: `New minimum found: ${arr[minIndex]} at index ${minIndex}`,
                  codeLine: 9,
                })
              }
            }

            if (minIndex !== i) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [i, minIndex],
                message: `Swapping ${arr[i]} with ${arr[minIndex]}`,
                codeLine: 14,
              })
              ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Placed ${arr[i]} at sorted position ${i}`,
                codeLine: 15,
              })
            } else {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `${arr[i]} is already at its correct position ${i}`,
                codeLine: 13,
              })
            }
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Sorting complete!",
            codeLine: 19,
          })

          return steps
        },
      },
      {
        key: "insertionSort",
        name: "Insertion Sort",
        category: "sorting",
        description:
          "Insertion Sort builds the final sorted array one item at a time, similar to sorting playing cards in your hand.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        bestFor: "Small datasets or nearly sorted arrays",
        code: `function insertionSort(arr) {
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    // Store the current element to be compared
    let current = arr[i];
    let j = i - 1;
    
    // Move elements greater than current to one position ahead
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // Place current in its correct position
    arr[j + 1] = current;
  }
  
  return arr;
}`,
        generateSteps: (array: number[]) => {
          const steps = []
          const arr = [...array]
          const n = arr.length

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting Insertion Sort",
            codeLine: 1,
          })

          for (let i = 1; i < n; i++) {
            const current = arr[i]
            let j = i - 1

            steps.push({
              array: [...arr],
              comparisons: [i],
              swaps: [],
              message: `Current element: ${current} at index ${i}`,
              codeLine: 5,
            })

            while (j >= 0 && arr[j] > current) {
              steps.push({
                array: [...arr],
                comparisons: [j, j + 1],
                swaps: [],
                message: `Comparing ${arr[j]} > ${current}`,
                codeLine: 9,
              })

              arr[j + 1] = arr[j]

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [j, j + 1],
                message: `Shifted ${arr[j]} to position ${j + 1}`,
                codeLine: 10,
              })

              j--
            }

            if (j + 1 !== i) {
              arr[j + 1] = current

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [j + 1],
                message: `Placed ${current} at position ${j + 1}`,
                codeLine: 14,
              })
            } else {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `${current} is already at its correct position`,
                codeLine: 14,
              })
            }
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Sorting complete!",
            codeLine: 17,
          })

          return steps
        },
      },
      {
        key: "quickSort",
        name: "Quick Sort",
        category: "sorting",
        description:
          "Quick Sort uses a divide-and-conquer strategy, picking a 'pivot' element and partitioning the array around it.",
        timeComplexity: "O(n log n) average, O(n²) worst case",
        spaceComplexity: "O(log n)",
        bestFor: "Large datasets with random distribution",
        code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Partition the array and get the pivot index
    const pivotIndex = partition(arr, low, high);
    
    // Recursively sort the sub-arrays
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  
  return arr;
}

function partition(arr, low, high) {
  // Choose the rightmost element as pivot
  const pivot = arr[high];
  
  // Index of smaller element
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      i++;
      // Swap elements
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  // Swap the pivot element with the element at i+1
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
  // Return the pivot index
  return i + 1;
}`,
        generateSteps: (array: number[]) => {
          const steps = []
          const arr = [...array]

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting Quick Sort",
            codeLine: 1,
          })

          // Simplified version for visualization
          const quickSortSteps = (arr: number[], low: number, high: number, depth = 0) => {
            if (low < high) {
              steps.push({
                array: [...arr],
                comparisons: [high],
                swaps: [],
                message: `Choosing pivot: ${arr[high]} at index ${high}`,
                codeLine: 13,
              })

              let i = low - 1

              for (let j = low; j < high; j++) {
                steps.push({
                  array: [...arr],
                  comparisons: [j, high],
                  swaps: [],
                  message: `Comparing ${arr[j]} with pivot ${arr[high]}`,
                  codeLine: 19,
                })

                if (arr[j] < arr[high]) {
                  i++

                  if (i !== j) {
                    steps.push({
                      array: [...arr],
                      comparisons: [],
                      swaps: [i, j],
                      message: `Swapping ${arr[i]} and ${arr[j]}`,
                      codeLine: 22,
                    })
                    ;[arr[i], arr[j]] = [arr[j], arr[i]]
                  }
                }
              }

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [i + 1, high],
                message: `Placing pivot ${arr[high]} at its correct position`,
                codeLine: 27,
              })
              ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]

              const pivotIndex = i + 1

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Pivot ${arr[pivotIndex]} is now at index ${pivotIndex}`,
                codeLine: 30,
              })

              // Only recurse a few levels for visualization
              if (depth < 2) {
                if (low < pivotIndex - 1) {
                  steps.push({
                    array: [...arr],
                    comparisons: [],
                    swaps: [],
                    message: `Recursively sorting left subarray [${low}...${pivotIndex - 1}]`,
                    codeLine: 6,
                  })

                  quickSortSteps(arr, low, pivotIndex - 1, depth + 1)
                }

                if (pivotIndex + 1 < high) {
                  steps.push({
                    array: [...arr],
                    comparisons: [],
                    swaps: [],
                    message: `Recursively sorting right subarray [${pivotIndex + 1}...${high}]`,
                    codeLine: 7,
                  })

                  quickSortSteps(arr, pivotIndex + 1, high, depth + 1)
                }
              }
            }
          }

          quickSortSteps(arr, 0, arr.length - 1)

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Sorting complete!",
            codeLine: 10,
          })

          return steps
        },
      },
      {
        key: "mergeSort",
        name: "Merge Sort",
        category: "sorting",
        description:
          "Merge Sort uses a divide-and-conquer strategy, dividing the array in half, sorting each half, then merging them back together.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        bestFor: "Large datasets with stable sorting requirements",
        code: `function mergeSort(arr) {
  // Base case: array with 0 or 1 element is already sorted
  if (arr.length <= 1) {
    return arr;
  }
  
  // Divide the array into two halves
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  // Recursively sort both halves
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  // Compare elements from both arrays and add the smaller one to result
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // Add remaining elements from either array
  return result.concat(
    leftIndex < left.length ? left.slice(leftIndex) : right.slice(rightIndex)
  );
}`,
        generateSteps: (array: number[]) => {
          const steps = []
          const arr = [...array]

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting Merge Sort",
            codeLine: 1,
          })

          // Track the original indices to visualize the merging process
          const indexMap = arr.map((_, i) => i)

          // Helper function to visualize the merge sort process
          const mergeSortSteps = (start: number, end: number, depth = 0) => {
            if (end - start <= 1) return

            const mid = Math.floor((start + end) / 2)

            steps.push({
              array: [...arr],
              comparisons: [start, end - 1],
              swaps: [],
              message: `Dividing array from index ${start} to ${end - 1}`,
              codeLine: 8,
            })

            // Recursively sort left half
            mergeSortSteps(start, mid, depth + 1)

            // Recursively sort right half
            mergeSortSteps(mid, end, depth + 1)

            // Merge the two halves
            steps.push({
              array: [...arr],
              comparisons: [start, mid - 1, mid, end - 1],
              swaps: [],
              message: `Merging subarrays from index ${start}-${mid - 1} and ${mid}-${end - 1}`,
              codeLine: 15,
            })

            // Create temporary arrays for merging
            const leftArr = arr.slice(start, mid)
            const rightArr = arr.slice(mid, end)
            const leftIndices = indexMap.slice(start, mid)
            const rightIndices = indexMap.slice(mid, end)

            let i = 0,
              j = 0,
              k = start

            // Merge process
            while (i < leftArr.length && j < rightArr.length) {
              steps.push({
                array: [...arr],
                comparisons: [start + i, mid + j],
                swaps: [],
                message: `Comparing ${leftArr[i]} and ${rightArr[j]}`,
                codeLine: 22,
              })

              if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i]
                indexMap[k] = leftIndices[i]
                i++

                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [k],
                  message: `Placing ${arr[k]} at position ${k}`,
                  codeLine: 24,
                })
              } else {
                arr[k] = rightArr[j]
                indexMap[k] = rightIndices[j]
                j++

                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [k],
                  message: `Placing ${arr[k]} at position ${k}`,
                  codeLine: 27,
                })
              }
              k++
            }

            // Copy remaining elements
            while (i < leftArr.length) {
              arr[k] = leftArr[i]
              indexMap[k] = leftIndices[i]

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [k],
                message: `Placing remaining left element ${arr[k]} at position ${k}`,
                codeLine: 34,
              })

              i++
              k++
            }

            while (j < rightArr.length) {
              arr[k] = rightArr[j]
              indexMap[k] = rightIndices[j]

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [k],
                message: `Placing remaining right element ${arr[k]} at position ${k}`,
                codeLine: 34,
              })

              j++
              k++
            }
          }

          mergeSortSteps(0, arr.length)

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Sorting complete!",
            codeLine: 38,
          })

          return steps
        },
      },
      {
        key: "heapSort",
        name: "Heap Sort",
        category: "sorting",
        description: "Heap Sort builds a max heap from the array and repeatedly extracts the maximum element.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        bestFor: "Large datasets with limited memory",
        code: `function heapSort(arr) {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    // Call max heapify on the reduced heap
    heapify(arr, i, 0);
  }
  
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  // Check if left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  // Check if right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  // If largest is not root
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    
    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest);
  }
}`,
        generateSteps: (array: number[]) => {
          const steps = []
          const arr = [...array]
          const n = arr.length

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting Heap Sort",
            codeLine: 1,
          })

          // Helper function to visualize heapify
          const heapifyWithSteps = (arr: number[], n: number, i: number) => {
            let largest = i
            const left = 2 * i + 1
            const right = 2 * i + 2

            steps.push({
              array: [...arr],
              comparisons: [i],
              swaps: [],
              message: `Heapifying subtree rooted at index ${i}`,
              codeLine: 19,
            })

            // Check if left child exists and is greater than root
            if (left < n) {
              steps.push({
                array: [...arr],
                comparisons: [i, left],
                swaps: [],
                message: `Comparing ${arr[i]} with left child ${arr[left]}`,
                codeLine: 24,
              })

              if (arr[left] > arr[largest]) {
                largest = left

                steps.push({
                  array: [...arr],
                  comparisons: [largest],
                  swaps: [],
                  message: `Left child ${arr[left]} is larger than current largest ${arr[i]}`,
                  codeLine: 25,
                })
              }
            }

            // Check if right child exists and is greater than largest so far
            if (right < n) {
              steps.push({
                array: [...arr],
                comparisons: [largest, right],
                swaps: [],
                message: `Comparing ${arr[largest]} with right child ${arr[right]}`,
                codeLine: 29,
              })

              if (arr[right] > arr[largest]) {
                largest = right

                steps.push({
                  array: [...arr],
                  comparisons: [largest],
                  swaps: [],
                  message: `Right child ${arr[right]} is larger than current largest ${arr[largest === i ? arr[i] : arr[left]]}`,
                  codeLine: 30,
                })
              }
            }

            // If largest is not root
            if (largest !== i) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [i, largest],
                message: `Swapping ${arr[i]} with ${arr[largest]}`,
                codeLine: 35,
              })

              // Swap
              ;[arr[i], arr[largest]] = [arr[largest], arr[i]]

              // Recursively heapify the affected sub-tree
              heapifyWithSteps(arr, n, largest)
            }
          }

          // Build max heap
          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Building max heap",
            codeLine: 4,
          })

          for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapifyWithSteps(arr, n, i)
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Max heap built successfully",
            codeLine: 6,
          })

          // Extract elements from heap one by one
          for (let i = n - 1; i > 0; i--) {
            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [0, i],
              message: `Moving root ${arr[0]} to end at position ${i}`,
              codeLine: 10,
            })

            // Move current root to end
            ;[arr[0], arr[i]] = [arr[i], arr[0]]

            // Call max heapify on the reduced heap
            heapifyWithSteps(arr, i, 0)

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Placed ${arr[i]} at its correct position`,
              codeLine: 13,
            })
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Sorting complete!",
            codeLine: 16,
          })

          return steps
        },
      },
    ],
  },
  {
    key: "searching",
    name: "Searching Algorithms",
    algorithms: [
      {
        key: "linearSearch",
        name: "Linear Search",
        category: "searching",
        description:
          "Linear Search sequentially checks each element of the list until it finds the target value or reaches the end.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        bestFor: "Small datasets or unsorted arrays",
        code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    // Check if current element is the target
    if (arr[i] === target) {
      return i; // Return the index if found
    }
  }
  
  return -1; // Return -1 if not found
}`,
        generateSteps: (array: number[]) => {
          const steps = []
          const arr = [...array]
          // Choose a random target from the array or a value not in the array
          const target =
            Math.random() > 0.7 ? Math.floor(Math.random() * 20) + 1 : arr[Math.floor(Math.random() * arr.length)]

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: `Starting Linear Search for target: ${target}`,
            codeLine: 1,
          })

          let found = false

          for (let i = 0; i < arr.length; i++) {
            steps.push({
              array: [...arr],
              comparisons: [i],
              swaps: [],
              message: `Checking if ${arr[i]} === ${target}`,
              codeLine: 3,
            })

            if (arr[i] === target) {
              steps.push({
                array: [...arr],
                comparisons: [i],
                swaps: [],
                message: `Found ${target} at index ${i}!`,
                codeLine: 4,
              })

              found = true
              break
            }
          }

          if (!found) {
            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `${target} not found in the array`,
              codeLine: 8,
            })
          }

          return steps
        },
      },
      {
        key: "binarySearch",
        name: "Binary Search",
        category: "searching",
        description:
          "Binary Search finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        bestFor: "Large sorted datasets",
        code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    // Find the middle index
    const mid = Math.floor((left + right) / 2);
    
    // Check if target is at mid
    if (arr[mid] === target) {
      return mid;
    }
    
    // If target is greater, ignore left half
    if (arr[mid] < target) {
      left = mid + 1;
    } 
    // If target is smaller, ignore right half
    else {
      right = mid - 1;
    }
  }
  
  // Target not found
  return -1;
}`,
        generateSteps: (array: number[]) => {
          // Sort the array for binary search
          const arr = [...array].sort((a, b) => a - b)
          const steps = []

          // Choose a random target from the array or a value not in the array
          const target =
            Math.random() > 0.7 ? Math.floor(Math.random() * 20) + 1 : arr[Math.floor(Math.random() * arr.length)]

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: `Starting Binary Search for target: ${target} in sorted array`,
            codeLine: 1,
          })

          let left = 0
          let right = arr.length - 1

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: `Initial search range: [${left}...${right}]`,
            codeLine: 2,
          })

          while (left <= right) {
            const mid = Math.floor((left + right) / 2)

            steps.push({
              array: [...arr],
              comparisons: [mid],
              swaps: [],
              message: `Checking middle element at index ${mid}: ${arr[mid]}`,
              codeLine: 7,
            })

            if (arr[mid] === target) {
              steps.push({
                array: [...arr],
                comparisons: [mid],
                swaps: [],
                message: `Found ${target} at index ${mid}!`,
                codeLine: 9,
              })

              break
            }

            if (arr[mid] < target) {
              steps.push({
                array: [...arr],
                comparisons: [mid],
                swaps: [],
                message: `${arr[mid]} < ${target}, searching right half`,
                codeLine: 14,
              })

              left = mid + 1

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `New search range: [${left}...${right}]`,
                codeLine: 15,
              })
            } else {
              steps.push({
                array: [...arr],
                comparisons: [mid],
                swaps: [],
                message: `${arr[mid]} > ${target}, searching left half`,
                codeLine: 18,
              })

              right = mid - 1

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `New search range: [${left}...${right}]`,
                codeLine: 19,
              })
            }

            if (left > right) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `${target} not found in the array`,
                codeLine: 24,
              })
            }
          }

          return steps
        },
      },
    ],
  },
  {
    key: "tree",
    name: "Tree Algorithms",
    algorithms: [
      {
        key: "bstInsertion",
        name: "BST Insertion",
        category: "tree",
        description:
          "Binary Search Tree insertion adds a new node while maintaining the BST property: left child < parent < right child.",
        timeComplexity: "O(log n) average, O(n) worst case",
        spaceComplexity: "O(h) where h is the height of the tree",
        bestFor: "Ordered data storage with fast lookups",
        code: `class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function insertIntoBST(root, value) {
  // If the tree is empty, create a new node
  if (root === null) {
    return new TreeNode(value);
  }
  
  // Otherwise, recur down the tree
  if (value < root.value) {
    // Insert into the left subtree
    root.left = insertIntoBST(root.left, value);
  } else if (value > root.value) {
    // Insert into the right subtree
    root.right = insertIntoBST(root.right, value);
  }
  
  // Return the unchanged node pointer
  return root;
}`,
        generateSteps: (array: number[]) => {
          // For tree visualization, we'll use a proper tree representation
          const steps = []
          const arr = [...array].slice(0, 7) // Limit to 7 elements for visualization

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting BST Insertion",
            codeLine: 1,
            dataStructure: "binaryTree",
            treeNodes: [],
          })

          // Build the tree step by step
          const treeNodes = []

          for (let i = 0; i < arr.length; i++) {
            steps.push({
              array: [...arr],
              comparisons: [i],
              swaps: [],
              message: `Inserting value: ${arr[i]}`,
              codeLine: 9,
              dataStructure: "binaryTree",
              treeNodes: [...treeNodes],
              currentValue: arr[i],
            })

            // If tree is empty, create root
            if (treeNodes.length === 0) {
              treeNodes.push({
                value: arr[i],
                position: 1, // Root position (1-indexed for easier math)
                left: null,
                right: null,
              })

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Created root node with value ${arr[i]}`,
                codeLine: 11,
                dataStructure: "binaryTree",
                treeNodes: [...treeNodes],
              })
            } else {
              // Insert into the tree
              let currentPos = 1 // Start at root (position 1)
              let inserted = false

              while (!inserted) {
                // Find the node at current position
                const currentNode = treeNodes.find((node) => node.position === currentPos)

                if (!currentNode) break // Safety check

                if (arr[i] < currentNode.value) {
                  steps.push({
                    array: [...arr],
                    comparisons: [],
                    swaps: [],
                    message: `${arr[i]} < ${currentNode.value}, going to left child`,
                    codeLine: 15,
                    dataStructure: "binaryTree",
                    treeNodes: [...treeNodes],
                    highlightNodes: [currentPos],
                  })

                  const leftChildPos = currentPos * 2 // Left child position

                  // Check if left child exists
                  const leftChild = treeNodes.find((node) => node.position === leftChildPos)

                  if (!leftChild) {
                    // Create new node as left child
                    treeNodes.push({
                      value: arr[i],
                      position: leftChildPos,
                      left: null,
                      right: null,
                    })

                    // Update parent's left pointer
                    const parentIndex = treeNodes.findIndex((node) => node.position === currentPos)
                    treeNodes[parentIndex].left = leftChildPos

                    steps.push({
                      array: [...arr],
                      comparisons: [],
                      swaps: [],
                      message: `Inserted ${arr[i]} as left child of ${currentNode.value}`,
                      codeLine: 16,
                      dataStructure: "binaryTree",
                      treeNodes: [...treeNodes],
                      highlightNodes: [leftChildPos],
                    })

                    inserted = true
                  } else {
                    // Continue traversal to left child
                    currentPos = leftChildPos
                  }
                } else if (arr[i] > currentNode.value) {
                  steps.push({
                    array: [...arr],
                    comparisons: [],
                    swaps: [],
                    message: `${arr[i]} > ${currentNode.value}, going to right child`,
                    codeLine: 18,
                    dataStructure: "binaryTree",
                    treeNodes: [...treeNodes],
                    highlightNodes: [currentPos],
                  })

                  const rightChildPos = currentPos * 2 + 1 // Right child position

                  // Check if right child exists
                  const rightChild = treeNodes.find((node) => node.position === rightChildPos)

                  if (!rightChild) {
                    // Create new node as right child
                    treeNodes.push({
                      value: arr[i],
                      position: rightChildPos,
                      left: null,
                      right: null,
                    })

                    // Update parent's right pointer
                    const parentIndex = treeNodes.findIndex((node) => node.position === currentPos)
                    treeNodes[parentIndex].right = rightChildPos

                    steps.push({
                      array: [...arr],
                      comparisons: [],
                      swaps: [],
                      message: `Inserted ${arr[i]} as right child of ${currentNode.value}`,
                      codeLine: 19,
                      dataStructure: "binaryTree",
                      treeNodes: [...treeNodes],
                      highlightNodes: [rightChildPos],
                    })

                    inserted = true
                  } else {
                    // Continue traversal to right child
                    currentPos = rightChildPos
                  }
                } else {
                  // Value already exists in the tree
                  steps.push({
                    array: [...arr],
                    comparisons: [],
                    swaps: [],
                    message: `Value ${arr[i]} already exists in the tree, not inserting`,
                    codeLine: 22,
                    dataStructure: "binaryTree",
                    treeNodes: [...treeNodes],
                    highlightNodes: [currentPos],
                  })

                  inserted = true
                }
              }
            }
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "BST construction complete!",
            codeLine: 24,
            dataStructure: "binaryTree",
            treeNodes: [...treeNodes],
          })

          return steps
        },
      },
      {
        key: "bstTraversal",
        name: "BST Traversal",
        category: "tree",
        description:
          "Binary Search Tree traversal visits all nodes in a specific order: inorder, preorder, or postorder.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(h) where h is the height of the tree",
        bestFor: "Processing tree nodes in a specific order",
        code: `function inorderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (node === null) return;
    
    // First recur on left child
    traverse(node.left);
    
    // Then visit the node
    result.push(node.value);
    
    // Finally recur on right child
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}

function preorderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (node === null) return;
    
    // First visit the node
    result.push(node.value);
    
    // Then recur on left child
    traverse(node.left);
    
    // Finally recur on right child
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}

function postorderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (node === null) return;
    
    // First recur on left child
    traverse(node.left);
    
    // Then recur on right child
    traverse(node.right);
    
    // Finally visit the node
    result.push(node.value);
  }
  
  traverse(root);
  return result;
}`,
        generateSteps: (array: number[]) => {
          // First build a BST from the array
          const steps = []
          const arr = [...array].slice(0, 7) // Limit to 7 elements for visualization

          // Build the tree
          const treeNodes = []

          // Helper function to insert a value into the BST
          const insertIntoBST = (value: number) => {
            // If tree is empty, create root
            if (treeNodes.length === 0) {
              treeNodes.push({
                value: value,
                position: 1, // Root position (1-indexed for easier math)
                left: null,
                right: null,
              })
              return
            }

            // Insert into the tree
            let currentPos = 1 // Start at root (position 1)
            let inserted = false

            while (!inserted) {
              // Find the node at current position
              const currentNode = treeNodes.find((node) => node.position === currentPos)

              if (!currentNode) break // Safety check

              if (value < currentNode.value) {
                const leftChildPos = currentPos * 2 // Left child position

                // Check if left child exists
                const leftChild = treeNodes.find((node) => node.position === leftChildPos)

                if (!leftChild) {
                  // Create new node as left child
                  treeNodes.push({
                    value: value,
                    position: leftChildPos,
                    left: null,
                    right: null,
                  })

                  // Update parent's left pointer
                  const parentIndex = treeNodes.findIndex((node) => node.position === currentPos)
                  treeNodes[parentIndex].left = leftChildPos

                  inserted = true
                } else {
                  // Continue traversal to left child
                  currentPos = leftChildPos
                }
              } else if (value > currentNode.value) {
                const rightChildPos = currentPos * 2 + 1 // Right child position

                // Check if right child exists
                const rightChild = treeNodes.find((node) => node.position === rightChildPos)

                if (!rightChild) {
                  // Create new node as right child
                  treeNodes.push({
                    value: value,
                    position: rightChildPos,
                    left: null,
                    right: null,
                  })

                  // Update parent's right pointer
                  const parentIndex = treeNodes.findIndex((node) => node.position === currentPos)
                  treeNodes[parentIndex].right = rightChildPos

                  inserted = true
                } else {
                  // Continue traversal to right child
                  currentPos = rightChildPos
                }
              } else {
                // Value already exists in the tree
                inserted = true
              }
            }
          }

          // Build the tree
          for (const value of arr) {
            insertIntoBST(value)
          }

          // Start the traversal visualization
          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting BST Traversal",
            codeLine: 1,
            dataStructure: "binaryTree",
            treeNodes: [...treeNodes],
          })

          // Perform inorder traversal
          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting Inorder Traversal (Left -> Root -> Right)",
            codeLine: 1,
            dataStructure: "binaryTree",
            treeNodes: [...treeNodes],
          })

          const inorderResult: number[] = []

          // Helper function to perform inorder traversal with visualization
          const inorderTraversal = (position: number) => {
            if (!position) return

            const node = treeNodes.find((n) => n.position === position)
            if (!node) return

            // First recur on left child
            if (node.left) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Visiting left subtree of ${node.value}`,
                codeLine: 6,
                dataStructure: "binaryTree",
                treeNodes: [...treeNodes],
                highlightNodes: [position],
              })

              inorderTraversal(node.left)
            }

            // Then visit the node
            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Visiting node ${node.value}`,
              codeLine: 9,
              dataStructure: "binaryTree",
              treeNodes: [...treeNodes],
              highlightNodes: [position],
            })

            inorderResult.push(node.value)

            // Finally recur on right child
            if (node.right) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Visiting right subtree of ${node.value}`,
                codeLine: 12,
                dataStructure: "binaryTree",
                treeNodes: [...treeNodes],
                highlightNodes: [position],
              })

              inorderTraversal(node.right)
            }
          }

          // Start traversal from root
          inorderTraversal(1)

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: `Inorder Traversal Result: [${inorderResult.join(", ")}]`,
            codeLine: 16,
            dataStructure: "binaryTree",
            treeNodes: [...treeNodes],
          })

          // Perform preorder traversal
          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting Preorder Traversal (Root -> Left -> Right)",
            codeLine: 19,
            dataStructure: "binaryTree",
            treeNodes: [...treeNodes],
          })

          const preorderResult: number[] = []

          // Helper function to perform preorder traversal with visualization
          const preorderTraversal = (position: number) => {
            if (!position) return

            const node = treeNodes.find((n) => n.position === position)
            if (!node) return

            // First visit the node
            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Visiting node ${node.value}`,
              codeLine: 24,
              dataStructure: "binaryTree",
              treeNodes: [...treeNodes],
              highlightNodes: [position],
            })

            preorderResult.push(node.value)

            // Then recur on left child
            if (node.left) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Visiting left subtree of ${node.value}`,
                codeLine: 27,
                dataStructure: "binaryTree",
                treeNodes: [...treeNodes],
                highlightNodes: [position],
              })

              preorderTraversal(node.left)
            }

            // Finally recur on right child
            if (node.right) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Visiting right subtree of ${node.value}`,
                codeLine: 30,
                dataStructure: "binaryTree",
                treeNodes: [...treeNodes],
                highlightNodes: [position],
              })

              preorderTraversal(node.right)
            }
          }

          // Start traversal from root
          preorderTraversal(1)

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: `Preorder Traversal Result: [${preorderResult.join(", ")}]`,
            codeLine: 34,
            dataStructure: "binaryTree",
            treeNodes: [...treeNodes],
          })

          // Perform postorder traversal
          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting Postorder Traversal (Left -> Right -> Root)",
            codeLine: 37,
            dataStructure: "binaryTree",
            treeNodes: [...treeNodes],
          })

          const postorderResult: number[] = []

          // Helper function to perform postorder traversal with visualization
          const postorderTraversal = (position: number) => {
            if (!position) return

            const node = treeNodes.find((n) => n.position === position)
            if (!node) return

            // First recur on left child
            if (node.left) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Visiting left subtree of ${node.value}`,
                codeLine: 42,
                dataStructure: "binaryTree",
                treeNodes: [...treeNodes],
                highlightNodes: [position],
              })

              postorderTraversal(node.left)
            }

            // Then recur on right child
            if (node.right) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Visiting right subtree of ${node.value}`,
                codeLine: 45,
                dataStructure: "binaryTree",
                treeNodes: [...treeNodes],
                highlightNodes: [position],
              })

              postorderTraversal(node.right)
            }

            // Finally visit the node
            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Visiting node ${node.value}`,
              codeLine: 48,
              dataStructure: "binaryTree",
              treeNodes: [...treeNodes],
              highlightNodes: [position],
            })

            postorderResult.push(node.value)
          }

          // Start traversal from root
          postorderTraversal(1)

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: `Postorder Traversal Result: [${postorderResult.join(", ")}]`,
            codeLine: 52,
            dataStructure: "binaryTree",
            treeNodes: [...treeNodes],
          })

          return steps
        },
      },
    ],
  },
  {
    key: "graph",
    name: "Graph Algorithms",
    algorithms: [
      {
        key: "bfs",
        name: "Breadth-First Search",
        category: "graph",
        description:
          "BFS explores all neighbors at the present depth before moving on to nodes at the next depth level.",
        timeComplexity: "O(V + E) where V is vertices and E is edges",
        spaceComplexity: "O(V)",
        bestFor: "Finding shortest path in unweighted graphs",
        code: `function bfs(graph, startNode) {
  // Create a queue for BFS
  const queue = [startNode];
  
  // Mark the start node as visited
  const visited = { [startNode]: true };
  
  // Store the traversal order
  const result = [];
  
  // Loop until queue is empty
  while (queue.length > 0) {
    // Dequeue a vertex from queue
    const currentNode = queue.shift();
    
    // Add to result
    result.push(currentNode);
    
    // Get all adjacent vertices of the dequeued vertex
    // If an adjacent has not been visited, mark it visited and enqueue it
    for (const neighbor of graph[currentNode]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}`,
        generateSteps: (array: number[]) => {
          // For graph visualization, we'll create a simple graph from the array
          const steps = []
          const arr = [...array].slice(0, 6) // Limit to 6 elements for visualization

          // Create a simple graph where each node connects to 2-3 other nodes
          const nodes = arr.map((_, i) => ({ id: i }))
          const edges = []

          // Create adjacency list representation
          const adjacencyList: Record<number, number[]> = {}

          for (let i = 0; i < nodes.length; i++) {
            adjacencyList[i] = []
            // Add 2-3 random connections
            const numConnections = 2 + Math.floor(Math.random() * 2)
            for (let j = 0; j < numConnections; j++) {
              let neighbor
              do {
                neighbor = Math.floor(Math.random() * nodes.length)
              } while (neighbor === i || adjacencyList[i].includes(neighbor))

              adjacencyList[i].push(neighbor)
              edges.push({ source: i, target: neighbor })
            }
          }

          // Create graph object for visualization
          const graph = {
            nodes,
            edges,
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting BFS on graph",
            codeLine: 1,
            dataStructure: "graph",
            graph,
          })

          const startNode = 0
          const queue = [startNode]
          const visited = { [startNode]: true }
          const result = []

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: `Starting at node ${startNode}`,
            codeLine: 3,
            dataStructure: "graph",
            graph,
            visited: [startNode],
            current: startNode,
          })

          while (queue.length > 0) {
            const currentNode = queue.shift()
            result.push(currentNode)

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Visiting node ${currentNode}`,
              codeLine: 12,
              dataStructure: "graph",
              graph,
              visited: Object.keys(visited).map(Number),
              current: currentNode,
            })

            for (const neighbor of adjacencyList[currentNode]) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Checking neighbor ${neighbor} of node ${currentNode}`,
                codeLine: 18,
                dataStructure: "graph",
                graph,
                visited: Object.keys(visited).map(Number),
                current: currentNode,
              })

              if (!visited[neighbor]) {
                visited[neighbor] = true
                queue.push(neighbor)

                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Marking node ${neighbor} as visited and adding to queue`,
                  codeLine: 20,
                  dataStructure: "graph",
                  graph,
                  visited: Object.keys(visited).map(Number),
                  current: currentNode,
                })
              } else {
                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Node ${neighbor} already visited, skipping`,
                  codeLine: 19,
                  dataStructure: "graph",
                  graph,
                  visited: Object.keys(visited).map(Number),
                  current: currentNode,
                })
              }
            }

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Current BFS order: ${result.join(", ")}`,
              codeLine: 15,
              dataStructure: "graph",
              graph,
              visited: Object.keys(visited).map(Number),
              current: currentNode,
            })
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: `BFS traversal complete! Order: ${result.join(", ")}`,
            codeLine: 25,
            dataStructure: "graph",
            graph,
            visited: Object.keys(visited).map(Number),
          })

          return steps
        },
      },
      {
        key: "dfs",
        name: "Depth-First Search",
        category: "graph",
        description: "DFS explores as far as possible along each branch before backtracking.",
        timeComplexity: "O(V + E) where V is vertices and E is edges",
        spaceComplexity: "O(V)",
        bestFor: "Topological sorting, cycle detection, and path finding",
        code: `function dfs(graph, startNode) {
  // Store the traversal order
  const result = [];
  
  // Mark nodes as visited
  const visited = {};
  
  // Recursive function to perform DFS
  function dfsVisit(node) {
    // Mark the current node as visited
    visited[node] = true;
    
    // Add to result
    result.push(node);
    
    // Recur for all adjacent vertices
    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        dfsVisit(neighbor);
      }
    }
  }
  
  // Start DFS from the given node
  dfsVisit(startNode);
  
  return result;
}`,
        generateSteps: (array: number[]) => {
          // For graph visualization, we'll create a simple graph from the array
          const steps = []
          const arr = [...array].slice(0, 6) // Limit to 6 elements for visualization

          // Create a simple graph where each node connects to 2-3 other nodes
          const nodes = arr.map((_, i) => ({ id: i }))
          const edges = []

          // Create adjacency list representation
          const adjacencyList: Record<number, number[]> = {}

          for (let i = 0; i < nodes.length; i++) {
            adjacencyList[i] = []
            // Add 2-3 random connections
            const numConnections = 2 + Math.floor(Math.random() * 2)
            for (let j = 0; j < numConnections; j++) {
              let neighbor
              do {
                neighbor = Math.floor(Math.random() * nodes.length)
              } while (neighbor === i || adjacencyList[i].includes(neighbor))

              adjacencyList[i].push(neighbor)
              edges.push({ source: i, target: neighbor })
            }
          }

          // Create graph object for visualization
          const graph = {
            nodes,
            edges,
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting DFS on graph",
            codeLine: 1,
            dataStructure: "graph",
            graph,
          })

          const startNode = 0
          const result = []
          const visited: Record<number, boolean> = {}

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: `Starting DFS from node ${startNode}`,
            codeLine: 20,
            dataStructure: "graph",
            graph,
            current: startNode,
          })

          // Helper function to perform DFS with visualization
          function dfsVisit(node: number) {
            // Mark the current node as visited
            visited[node] = true

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Marking node ${node} as visited`,
              codeLine: 8,
              dataStructure: "graph",
              graph,
              visited: Object.keys(visited).map(Number),
              current: node,
            })

            // Add to result
            result.push(node)

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Adding node ${node} to result`,
              codeLine: 11,
              dataStructure: "graph",
              graph,
              visited: Object.keys(visited).map(Number),
              current: node,
            })

            // Recur for all adjacent vertices
            for (const neighbor of adjacencyList[node]) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Checking neighbor ${neighbor} of node ${node}`,
                codeLine: 14,
                dataStructure: "graph",
                graph,
                visited: Object.keys(visited).map(Number),
                current: node,
              })

              if (!visited[neighbor]) {
                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Neighbor ${neighbor} not visited, recursively visiting`,
                  codeLine: 15,
                  dataStructure: "graph",
                  graph,
                  visited: Object.keys(visited).map(Number),
                  current: node,
                })

                dfsVisit(neighbor)

                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Backtracking to node ${node} after visiting ${neighbor}`,
                  codeLine: 15,
                  dataStructure: "graph",
                  graph,
                  visited: Object.keys(visited).map(Number),
                  current: node,
                })
              } else {
                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Neighbor ${neighbor} already visited, skipping`,
                  codeLine: 14,
                  dataStructure: "graph",
                  graph,
                  visited: Object.keys(visited).map(Number),
                  current: node,
                })
              }
            }
          }

          // Start DFS from the given node
          dfsVisit(startNode)

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: `DFS traversal complete! Order: ${result.join(", ")}`,
            codeLine: 22,
            dataStructure: "graph",
            graph,
            visited: Object.keys(visited).map(Number),
          })

          return steps
        },
      },
      {
        key: "dijkstra",
        name: "Dijkstra's Algorithm",
        category: "graph",
        description: "Dijkstra's algorithm finds the shortest path between nodes in a weighted graph.",
        timeComplexity: "O(V²) with array, O((V+E)logV) with priority queue",
        spaceComplexity: "O(V)",
        bestFor: "Finding shortest paths in weighted graphs with non-negative weights",
        code: `function dijkstra(graph, startNode) {
  // Set distances to all nodes to infinity
  const distances = {};
  // Set previous nodes in optimal path
  const previous = {};
  // Set of nodes to visit
  const nodes = new Set();
  
  // Initialize
  for (const node in graph) {
    distances[node] = node === startNode ? 0 : Infinity;
    previous[node] = null;
    nodes.add(node);
  }
  
  // While there are nodes to visit
  while (nodes.size > 0) {
    // Find node with minimum distance
    let minNode = null;
    for (const node of nodes) {
      if (minNode === null || distances[node] < distances[minNode]) {
        minNode = node;
      }
    }
    
    // Remove min node from unvisited set
    nodes.delete(minNode);
    
    // For each neighbor of the current node
    for (const neighbor in graph[minNode]) {
      // Calculate tentative distance
      const alt = distances[minNode] + graph[minNode][neighbor];
      
      // If new path is shorter
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = minNode;
      }
    }
  }
  
  return { distances, previous };
}`,
        generateSteps: (array: number[]) => {
          // For graph visualization, we'll create a weighted graph from the array
          const steps = []
          const arr = [...array].slice(0, 6) // Limit to 6 elements for visualization

          // Create a simple weighted graph
          const nodes = arr.map((_, i) => ({ id: i }))
          const edges = []

          // Create adjacency list representation with weights
          const adjacencyList: Record<number, Record<number, number>> = {}

          for (let i = 0; i < nodes.length; i++) {
            adjacencyList[i] = {}
            // Add 2-3 random connections
            const numConnections = 2 + Math.floor(Math.random() * 2)
            for (let j = 0; j < numConnections; j++) {
              let neighbor
              do {
                neighbor = Math.floor(Math.random() * nodes.length)
              } while (neighbor === i || adjacencyList[i][neighbor] !== undefined)

              // Add weight between 1 and 10
              const weight = 1 + Math.floor(Math.random() * 10)
              adjacencyList[i][neighbor] = weight
              edges.push({ source: i, target: neighbor, weight })
            }
          }

          // Create graph object for visualization
          const graph = {
            nodes,
            edges,
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting Dijkstra's Algorithm on weighted graph",
            codeLine: 1,
            dataStructure: "graph",
            graph,
          })

          const startNode = 0

          // Set distances to all nodes to infinity
          const distances: Record<number, number> = {}
          // Set previous nodes in optimal path
          const previous: Record<number, number | null> = {}
          // Set of nodes to visit
          const nodesToVisit = new Set<number>()

          // Initialize
          for (const node in adjacencyList) {
            const nodeNum = Number.parseInt(node)
            distances[nodeNum] = nodeNum === startNode ? 0 : Number.POSITIVE_INFINITY
            previous[nodeNum] = null
            nodesToVisit.add(nodeNum)
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: `Initialized distances: Start node ${startNode} = 0, all others = Infinity`,
            codeLine: 10,
            dataStructure: "graph",
            graph,
            distances,
            current: startNode,
          })

          // While there are nodes to visit
          while (nodesToVisit.size > 0) {
            // Find node with minimum distance
            let minNode: number | null = null
            for (const node of nodesToVisit) {
              if (minNode === null || distances[node] < distances[minNode]) {
                minNode = node
              }
            }

            if (minNode === null) break

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Selected node ${minNode} with minimum distance ${distances[minNode]}`,
              codeLine: 19,
              dataStructure: "graph",
              graph,
              distances,
              current: minNode,
              visited: Object.keys(adjacencyList)
                .filter((n) => !nodesToVisit.has(Number.parseInt(n)))
                .map(Number),
            })

            // Remove min node from unvisited set
            nodesToVisit.delete(minNode)

            // For each neighbor of the current node
            for (const neighborStr in adjacencyList[minNode]) {
              const neighbor = Number.parseInt(neighborStr)
              // Calculate tentative distance
              const alt = distances[minNode] + adjacencyList[minNode][neighbor]

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Checking neighbor ${neighbor}: Current distance = ${distances[neighbor]}, New potential distance = ${alt}`,
                codeLine: 28,
                dataStructure: "graph",
                graph,
                distances,
                current: minNode,
                visited: Object.keys(adjacencyList)
                  .filter((n) => !nodesToVisit.has(Number.parseInt(n)))
                  .map(Number),
              })

              // If new path is shorter
              if (alt < distances[neighbor]) {
                distances[neighbor] = alt
                previous[neighbor] = minNode

                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Updated distance to node ${neighbor} = ${alt}, previous = ${minNode}`,
                  codeLine: 31,
                  dataStructure: "graph",
                  graph,
                  distances,
                  current: minNode,
                  visited: Object.keys(adjacencyList)
                    .filter((n) => !nodesToVisit.has(Number.parseInt(n)))
                    .map(Number),
                })
              }
            }
          }

          // Reconstruct shortest paths for visualization
          const paths: Record<number, number[]> = {}

          for (const node in adjacencyList) {
            const nodeNum = Number.parseInt(node)
            if (nodeNum === startNode) continue

            const path = []
            let current: number | null = nodeNum

            while (current !== null) {
              path.unshift(current)
              current = previous[current]
            }

            if (path.length > 0 && path[0] === startNode) {
              paths[nodeNum] = path
            }
          }

          // Show final shortest paths
          for (const node in paths) {
            const nodeNum = Number.parseInt(node)

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Shortest path to node ${nodeNum}: ${paths[nodeNum].join(" → ")} (distance: ${distances[nodeNum]})`,
              codeLine: 37,
              dataStructure: "graph",
              graph,
              distances,
              path: paths[nodeNum],
              visited: Object.keys(adjacencyList).map(Number),
            })
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Dijkstra's algorithm complete!",
            codeLine: 37,
            dataStructure: "graph",
            graph,
            distances,
            visited: Object.keys(adjacencyList).map(Number),
          })

          return steps
        },
      },
    ],
  },
  {
    key: "dataStructure",
    name: "Data Structures",
    algorithms: [
      {
        key: "hashTable",
        name: "Hash Table",
        category: "dataStructure",
        description:
          "A hash table is a data structure that implements an associative array abstract data type, a structure that can map keys to values.",
        timeComplexity: "Average: O(1) for search, insert, delete; Worst: O(n)",
        spaceComplexity: "O(n)",
        bestFor: "Fast lookups, insertions, and deletions with key-value pairs",
        code: `class HashTable {
  constructor(size = 10) {
    this.buckets = Array(size).fill().map(() => []);
    this.size = size;
  }
  
  // Hash function to convert key to index
  hash(key) {
    let hashValue = 0;
    
    // Convert string key to a numeric hash value
    if (typeof key === 'string') {
      for (let i = 0; i < key.length; i++) {
        hashValue += key.charCodeAt(i);
      }
    } else if (typeof key === 'number') {
      hashValue = key;
    } else {
      hashValue = String(key).length;
    }
    
    // Ensure hash value is within bucket range
    return hashValue % this.size;
  }
  
  // Insert a key-value pair
  set(key, value) {
    const index = this.hash(key);
    
    // Check if key already exists
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i].key === key) {
        this.buckets[index][i].value = value;
        return;
      }
    }
    
    // Key doesn't exist, add new key-value pair
    this.buckets[index].push({ key, value });
  }
  
  // Retrieve a value by key
  get(key) {
    const index = this.hash(key);
    
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i].key === key) {
        return this.buckets[index][i].value;
      }
    }
    
    return undefined;
  }
  
  // Remove a key-value pair
  delete(key) {
    const index = this.hash(key);
    
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i].key === key) {
        this.buckets[index].splice(i, 1);
        return true;
      }
    }
    
    return false;
  }
  
  // Check if key exists
  has(key) {
    const index = this.hash(key);
    
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i].key === key) {
        return true;
      }
    }
    
    return false;
  }
}`,
        generateSteps: (array: number[]) => {
          const steps = []
          const arr = [...array].slice(0, 7) // Limit to 7 elements for visualization

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting Hash Table Operations",
            codeLine: 1,
            dataStructure: "hashTable",
            hashTable: { buckets: [], size: 0 },
          })

          // Initialize hash table
          const hashTable = {
            buckets: Array(10)
              .fill()
              .map(() => []),
            size: 10,
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Created a hash table with 10 buckets",
            codeLine: 3,
            dataStructure: "hashTable",
            hashTable: { ...hashTable },
          })

          // Hash function
          const hash = (key: number) => {
            return key % hashTable.size
          }

          // Insert elements
          for (let i = 0; i < arr.length; i++) {
            const key = arr[i]
            const value = `Value-${key}`
            const index = hash(key)

            steps.push({
              array: [...arr],
              comparisons: [i],
              swaps: [],
              message: `Hashing key ${key}`,
              codeLine: 8,
              dataStructure: "hashTable",
              hashTable: { ...hashTable },
              currentValue: key,
            })

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Hash value for key ${key} is ${index}`,
              codeLine: 22,
              dataStructure: "hashTable",
              hashTable: { ...hashTable },
              highlightIndex: index,
              currentValue: key,
            })

            // Check if key already exists
            let keyExists = false
            for (let j = 0; j < hashTable.buckets[index].length; j++) {
              if (hashTable.buckets[index][j].key === key) {
                keyExists = true
                hashTable.buckets[index][j].value = value

                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Key ${key} already exists, updating value to ${value}`,
                  codeLine: 29,
                  dataStructure: "hashTable",
                  hashTable: { ...hashTable },
                  highlightIndex: index,
                  currentValue: key,
                })
                break
              }
            }

            // If key doesn't exist, add new key-value pair
            if (!keyExists) {
              hashTable.buckets[index].push({ key, value })

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Added new key-value pair: ${key} -> ${value} at bucket ${index}`,
                codeLine: 35,
                dataStructure: "hashTable",
                hashTable: { ...hashTable },
                highlightIndex: index,
                currentValue: key,
              })
            }
          }

          // Retrieve a value
          if (arr.length > 0) {
            const keyToGet = arr[0]
            const index = hash(keyToGet)

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Retrieving value for key ${keyToGet}`,
              codeLine: 40,
              dataStructure: "hashTable",
              hashTable: { ...hashTable },
              currentValue: keyToGet,
            })

            let found = false
            for (let i = 0; i < hashTable.buckets[index].length; i++) {
              if (hashTable.buckets[index][i].key === keyToGet) {
                found = true
                const value = hashTable.buckets[index][i].value

                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Found value "${value}" for key ${keyToGet}`,
                  codeLine: 44,
                  dataStructure: "hashTable",
                  hashTable: { ...hashTable },
                  highlightIndex: index,
                  currentValue: keyToGet,
                })
                break
              }
            }

            if (!found) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Key ${keyToGet} not found`,
                codeLine: 48,
                dataStructure: "hashTable",
                hashTable: { ...hashTable },
                highlightIndex: index,
                currentValue: keyToGet,
              })
            }
          }

          // Delete a key-value pair
          if (arr.length > 1) {
            const keyToDelete = arr[1]
            const index = hash(keyToDelete)

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Deleting key ${keyToDelete}`,
              codeLine: 52,
              dataStructure: "hashTable",
              hashTable: { ...hashTable },
              currentValue: keyToDelete,
            })

            let found = false
            for (let i = 0; i < hashTable.buckets[index].length; i++) {
              if (hashTable.buckets[index][i].key === keyToDelete) {
                found = true
                hashTable.buckets[index].splice(i, 1)

                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Deleted key ${keyToDelete} from bucket ${index}`,
                  codeLine: 56,
                  dataStructure: "hashTable",
                  hashTable: { ...hashTable },
                  highlightIndex: index,
                  currentValue: keyToDelete,
                })
                break
              }
            }

            if (!found) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Key ${keyToDelete} not found for deletion`,
                codeLine: 60,
                dataStructure: "hashTable",
                hashTable: { ...hashTable },
                highlightIndex: index,
                currentValue: keyToDelete,
              })
            }
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Hash Table operations complete!",
            codeLine: 73,
            dataStructure: "hashTable",
            hashTable: { ...hashTable },
          })

          return steps
        },
      },
      {
        key: "linkedList",
        name: "Linked List",
        category: "dataStructure",
        description:
          "A linked list is a linear data structure where elements are stored in nodes, each pointing to the next node.",
        timeComplexity: "Access: O(n), Insert/Delete: O(1) at head, O(n) elsewhere",
        spaceComplexity: "O(n)",
        bestFor: "Dynamic collections with frequent insertions/deletions",
        code: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  // Insert at the beginning
  insertAtHead(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
    return this;
  }
  
  // Insert at the end
  insertAtTail(value) {
    const newNode = new Node(value);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    
    this.size++;
    return this;
  }
  
  // Delete a node with given value
  delete(value) {
    if (!this.head) return null;
    
    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;
      return this;
    }
    
    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }
    
    if (current.next) {
      current.next = current.next.next;
      this.size--;
    }
    
    return this;
  }
  
  // Search for a value
  search(value) {
    let current = this.head;
    let index = 0;
    
    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.next;
      index++;
    }
    
    return -1;
  }
}`,
        generateSteps: (array: number[]) => {
          const steps = []
          const arr = [...array].slice(0, 7) // Limit to 7 elements for visualization

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Starting Linked List Operations",
            codeLine: 1,
            dataStructure: "linkedList",
            nodes: [],
            operation: "initialize",
          })

          // Initialize an empty linked list
          const linkedList = { head: null, nodes: [] }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Created an empty linked list",
            codeLine: 7,
            dataStructure: "linkedList",
            nodes: [...linkedList.nodes],
            operation: "initialize",
          })

          // Insert elements at the head
          for (let i = 0; i < Math.min(3, arr.length); i++) {
            steps.push({
              array: [...arr],
              comparisons: [i],
              swaps: [],
              message: `Inserting ${arr[i]} at the head`,
              codeLine: 14,
              dataStructure: "linkedList",
              nodes: [...linkedList.nodes],
              operation: "insertAtHead",
              currentValue: arr[i],
            })

            // Create new node
            const newNode = {
              value: arr[i],
              next: linkedList.head ? linkedList.nodes.findIndex((n) => n.id === linkedList.head) : null,
              id: i,
            }
            linkedList.nodes.unshift(newNode)
            linkedList.head = 0

            // Update next pointers after insertion
            linkedList.nodes = linkedList.nodes.map((node, idx) => {
              if (idx > 0 && node.next !== null) {
                return { ...node, next: node.next + 1 }
              }
              return node
            })

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Inserted ${arr[i]} at the head`,
              codeLine: 17,
              dataStructure: "linkedList",
              nodes: [...linkedList.nodes],
              operation: "insertAtHead",
            })
          }

          // Insert elements at the tail
          for (let i = 3; i < Math.min(6, arr.length); i++) {
            steps.push({
              array: [...arr],
              comparisons: [i],
              swaps: [],
              message: `Inserting ${arr[i]} at the tail`,
              codeLine: 22,
              dataStructure: "linkedList",
              nodes: [...linkedList.nodes],
              operation: "insertAtTail",
              currentValue: arr[i],
            })

            // Find the last node
            let lastNodeIdx = null
            let currentIdx = linkedList.head

            while (currentIdx !== null) {
              const currentNode = linkedList.nodes[currentIdx]
              if (currentNode.next === null) {
                lastNodeIdx = currentIdx
                break
              }
              currentIdx = currentNode.next
            }

            // Create new node
            const newNode = { value: arr[i], next: null, id: linkedList.nodes.length }
            linkedList.nodes.push(newNode)

            // Update the last node's next pointer
            if (lastNodeIdx !== null) {
              linkedList.nodes[lastNodeIdx].next = linkedList.nodes.length - 1

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Traversing to the end of the list`,
                codeLine: 27,
                dataStructure: "linkedList",
                nodes: [...linkedList.nodes],
                operation: "insertAtTail",
                highlightNodes: [lastNodeIdx],
              })
            } else {
              // If the list was empty
              linkedList.head = linkedList.nodes.length - 1
            }

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Inserted ${arr[i]} at the tail`,
              codeLine: 30,
              dataStructure: "linkedList",
              nodes: [...linkedList.nodes],
              operation: "insertAtTail",
            })
          }

          // Search for a value
          if (arr.length > 0) {
            const valueToSearch = arr[Math.floor(arr.length / 2)]

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Searching for value ${valueToSearch}`,
              codeLine: 58,
              dataStructure: "linkedList",
              nodes: [...linkedList.nodes],
              operation: "search",
              currentValue: valueToSearch,
            })

            // Simulate search
            let currentIdx = linkedList.head
            let index = 0
            let found = false

            while (currentIdx !== null) {
              const currentNode = linkedList.nodes[currentIdx]

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Checking node with value ${currentNode.value}`,
                codeLine: 61,
                dataStructure: "linkedList",
                nodes: [...linkedList.nodes],
                operation: "search",
                highlightNodes: [currentIdx],
              })

              if (currentNode.value === valueToSearch) {
                found = true

                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Found ${valueToSearch} at index ${index}`,
                  codeLine: 62,
                  dataStructure: "linkedList",
                  nodes: [...linkedList.nodes],
                  operation: "search",
                  highlightNodes: [currentIdx],
                })

                break
              }

              currentIdx = currentNode.next
              index++
            }

            if (!found) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Value ${valueToSearch} not found in the list`,
                codeLine: 69,
                dataStructure: "linkedList",
                nodes: [...linkedList.nodes],
                operation: "search",
              })
            }
          }

          // Delete a value
          if (arr.length > 0) {
            const valueToDelete = arr[0]

            steps.push({
              array: [...arr],
              comparisons: [],
              swaps: [],
              message: `Deleting value ${valueToDelete}`,
              codeLine: 38,
              dataStructure: "linkedList",
              nodes: [...linkedList.nodes],
              operation: "delete",
              currentValue: valueToDelete,
            })

            // Check if head has the value
            if (linkedList.nodes[linkedList.head].value === valueToDelete) {
              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Value ${valueToDelete} found at the head`,
                codeLine: 41,
                dataStructure: "linkedList",
                nodes: [...linkedList.nodes],
                operation: "delete",
                highlightNodes: [linkedList.head],
              })

              // Update head
              const newHead = linkedList.nodes[linkedList.head].next
              linkedList.head = newHead

              steps.push({
                array: [...arr],
                comparisons: [],
                swaps: [],
                message: `Deleted ${valueToDelete} from the head`,
                codeLine: 42,
                dataStructure: "linkedList",
                nodes: [...linkedList.nodes],
                operation: "delete",
                deletedNode: 0,
              })
            } else {
              // Search for the node before the one to delete
              let currentIdx = linkedList.head
              let prevIdx = null
              let found = false

              while (currentIdx !== null) {
                const currentNode = linkedList.nodes[currentIdx]

                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Checking node with value ${currentNode.value}`,
                  codeLine: 48,
                  dataStructure: "linkedList",
                  nodes: [...linkedList.nodes],
                  operation: "delete",
                  highlightNodes: [currentIdx],
                })

                if (currentNode.next !== null && linkedList.nodes[currentNode.next].value === valueToDelete) {
                  found = true

                  steps.push({
                    array: [...arr],
                    comparisons: [],
                    swaps: [],
                    message: `Found ${valueToDelete} at the next node`,
                    codeLine: 49,
                    dataStructure: "linkedList",
                    nodes: [...linkedList.nodes],
                    operation: "delete",
                    highlightNodes: [currentNode.next],
                  })

                  // Update next pointer to skip the node to delete
                  const nodeToDelete = currentNode.next
                  const nextNode = linkedList.nodes[nodeToDelete].next
                  linkedList.nodes[currentIdx].next = nextNode

                  steps.push({
                    array: [...arr],
                    comparisons: [],
                    swaps: [],
                    message: `Deleted ${valueToDelete} by updating next pointer`,
                    codeLine: 53,
                    dataStructure: "linkedList",
                    nodes: [...linkedList.nodes],
                    operation: "delete",
                    deletedNode: nodeToDelete,
                  })

                  break
                }

                prevIdx = currentIdx
                currentIdx = currentNode.next
              }

              if (!found) {
                steps.push({
                  array: [...arr],
                  comparisons: [],
                  swaps: [],
                  message: `Value ${valueToDelete} not found in the list`,
                  codeLine: 56,
                  dataStructure: "linkedList",
                  nodes: [...linkedList.nodes],
                  operation: "delete",
                })
              }
            }
          }

          steps.push({
            array: [...arr],
            comparisons: [],
            swaps: [],
            message: "Linked List operations complete!",
            codeLine: 71,
            dataStructure: "linkedList",
            nodes: [...linkedList.nodes],
            operation: "complete",
          })

          return steps
        },
      },
    ],
  },
]

export function getAlgorithmByKey(key: string) {
  for (const category of algorithmCategories) {
    const algorithm = category.algorithms.find((algo) => algo.key === key)
    if (algorithm) {
      return algorithm
    }
  }
  return null
}
