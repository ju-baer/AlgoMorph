"use client"
import { motion } from "framer-motion"

interface VisualizationCanvasProps {
  data: {
    array: number[]
    comparisons: number[]
    swaps: number[]
    message?: string
    dataStructure?: string
    nodes?: any[]
    items?: any[]
    operation?: string
    currentValue?: number
    highlightNodes?: number[]
    highlightIndex?: number
    deletedNode?: number
    poppedValue?: number
    dequeuedValue?: number
    treeNodes?: any[]
    hashTable?: any
    graph?: any
    visited?: number[]
    current?: number
    path?: number[]
    distances?: Record<string, number>
  }
  algorithm: any
}

export default function VisualizationCanvas({ data, algorithm }: VisualizationCanvasProps) {
  const {
    array,
    comparisons,
    swaps,
    dataStructure,
    nodes,
    items,
    operation,
    highlightNodes,
    highlightIndex,
    treeNodes,
    hashTable,
    graph,
    visited,
    current,
    path,
  } = data

  // If it's a data structure visualization
  if (dataStructure) {
    switch (dataStructure) {
      case "linkedList":
        return <LinkedListVisualization data={data} />
      case "stack":
        return <StackVisualization data={data} />
      case "queue":
        return <QueueVisualization data={data} />
      case "binaryTree":
        return <BinaryTreeVisualization data={data} />
      case "hashTable":
        return <HashTableVisualization data={data} />
      case "graph":
        return <GraphVisualization data={data} />
      default:
        break
    }
  }

  // Default array visualization for sorting/searching algorithms
  const maxValue = Math.max(...array, 1)

  const getBarColor = (index: number) => {
    if (swaps.includes(index)) return "rgb(239, 68, 68)" // Red for swaps
    if (comparisons.includes(index)) return "rgb(234, 179, 8)" // Yellow for comparisons

    // Generate vibrant colors based on the algorithm type
    if (algorithm) {
      switch (algorithm.category) {
        case "sorting":
          return `hsl(${210 + ((index * 15) % 150)}, 80%, 60%)`
        case "searching":
          return `hsl(${120 + ((index * 15) % 150)}, 80%, 60%)`
        case "graph":
          return `hsl(${280 + ((index * 15) % 150)}, 80%, 60%)`
        case "tree":
          return `hsl(${90 + ((index * 15) % 150)}, 80%, 60%)`
        default:
          return `hsl(${180 + ((index * 15) % 150)}, 80%, 60%)`
      }
    }

    return `hsl(${210 + ((index * 15) % 150)}, 80%, 60%)`
  }

  return (
    <div className="w-full h-full flex items-end justify-center p-4">
      {array.map((value, index) => (
        <motion.div
          key={`${index}-${value}`}
          initial={{ height: 0 }}
          animate={{
            height: `${(value / maxValue) * 80}%`,
            backgroundColor: getBarColor(index),
          }}
          transition={{ duration: 0.3 }}
          className="mx-1 w-full rounded-t-md relative"
          style={{
            minWidth: array.length > 20 ? "8px" : "20px",
            maxWidth: array.length > 20 ? "16px" : "40px",
          }}
        >
          {array.length <= 20 && (
            <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 text-white text-xs">
              {value}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

// Linked List Visualization Component
function LinkedListVisualization({ data }: { data: any }) {
  const { nodes, operation, highlightNodes = [], deletedNode, currentValue } = data

  if (!nodes || nodes.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-xl">Empty Linked List</div>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-auto">
      <div className="flex flex-wrap items-center">
        {nodes.map((node: any, index: number) => {
          // Skip deleted nodes
          if (deletedNode === index) return null

          const isHighlighted = highlightNodes.includes(index)
          const isCurrentValue = node.value === currentValue

          return (
            <div key={index} className="flex items-center mb-4 mx-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  backgroundColor: isHighlighted
                    ? "rgb(234, 179, 8)"
                    : isCurrentValue
                      ? "rgb(239, 68, 68)"
                      : "rgb(99, 102, 241)",
                }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold relative"
              >
                {node.value}
                {index === 0 && <div className="absolute top-[-20px] left-0 text-white text-xs">Head</div>}
              </motion.div>

              {node.next !== null && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "30px" }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-white mx-1 relative"
                >
                  <div className="absolute right-0 top-[-6px] text-white">→</div>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Stack Visualization Component
function StackVisualization({ data }: { data: any }) {
  const { items, operation, highlightIndex, poppedValue } = data

  if (!items) return null

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative h-4/5 w-48 border-l-2 border-r-2 border-b-2 border-white rounded-b-lg">
        <div className="absolute top-[-30px] left-0 text-white">Stack</div>

        <div className="absolute bottom-0 left-0 w-full">
          {items.map((item: any, index: number) => {
            const isHighlighted = index === highlightIndex
            const isTop = index === items.length - 1

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  backgroundColor: isHighlighted ? "rgb(234, 179, 8)" : `hsl(${280 + ((index * 20) % 150)}, 80%, 60%)`,
                }}
                transition={{ duration: 0.3 }}
                className="w-full h-12 border-t-2 border-white flex items-center justify-center text-white font-bold relative"
              >
                {item}
                {isTop && <div className="absolute right-[-40px] text-white text-xs">← Top</div>}
              </motion.div>
            )
          })}

          {poppedValue !== undefined && (
            <motion.div
              initial={{ opacity: 1, x: 0, y: 0 }}
              animate={{ opacity: 0, x: 50, y: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute top-[-50px] right-[-50px] w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold"
            >
              {poppedValue}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

// Queue Visualization Component
function QueueVisualization({ data }: { data: any }) {
  const { items, operation, highlightIndex, dequeuedValue } = data

  if (!items) return null

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative h-24 w-4/5 border-2 border-white rounded-lg">
        <div className="absolute top-[-30px] left-0 text-white">Queue</div>
        <div className="absolute top-[-30px] left-0 text-white">Front</div>
        <div className="absolute top-[-30px] right-0 text-white">Rear</div>

        <div className="absolute top-0 left-0 w-full h-full flex items-center">
          {items.map((item: any, index: number) => {
            const isHighlighted = index === highlightIndex
            const isFront = index === 0
            const isRear = index === items.length - 1

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  backgroundColor: isHighlighted ? "rgb(234, 179, 8)" : `hsl(${120 + ((index * 20) % 150)}, 80%, 60%)`,
                }}
                transition={{ duration: 0.3 }}
                className="h-full border-r-2 border-white flex-1 flex items-center justify-center text-white font-bold relative"
                style={{ borderRight: index === items.length - 1 ? "none" : undefined }}
              >
                {item}
                {isFront && <div className="absolute bottom-[-20px] text-white text-xs">Front</div>}
                {isRear && <div className="absolute bottom-[-20px] text-white text-xs">Rear</div>}
              </motion.div>
            )
          })}

          {dequeuedValue !== undefined && (
            <motion.div
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute left-[-50px] w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold"
            >
              {dequeuedValue}
            </motion.div>
          )}

          {items.length === 0 && <div className="w-full text-center text-white">Empty Queue</div>}
        </div>
      </div>
    </div>
  )
}

// Binary Tree Visualization Component
function BinaryTreeVisualization({ data }: { data: any }) {
  const { treeNodes = [], operation, currentValue, highlightNodes = [] } = data

  if (!treeNodes || treeNodes.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-xl">Empty Binary Tree</div>
      </div>
    )
  }

  // Calculate tree layout
  const maxDepth = Math.floor(Math.log2(treeNodes.length + 1))
  const levelWidth = Math.pow(2, maxDepth) * 40 // Width of the bottom level

  // Create a map of position to node for easier rendering
  const nodeMap: Record<number, any> = {}
  treeNodes.forEach((node) => {
    nodeMap[node.position] = node
  })

  // Function to render a node at a specific position
  const renderNode = (position: number, level: number) => {
    const node = nodeMap[position]
    if (!node) return null

    const isHighlighted = highlightNodes.includes(position)
    const isCurrentValue = node.value === currentValue

    // Calculate x position based on level and position
    const width = levelWidth / Math.pow(2, level)
    const x = (position - Math.pow(2, level) + 1) * width

    return (
      <g key={position} transform={`translate(${x}, ${level * 60})`}>
        <motion.circle
          initial={{ r: 0 }}
          animate={{
            r: 20,
            fill: isHighlighted ? "rgb(234, 179, 8)" : isCurrentValue ? "rgb(239, 68, 68)" : "rgb(99, 102, 241)",
          }}
          transition={{ duration: 0.3 }}
          cx="0"
          cy="0"
        />
        <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
          {node.value}
        </text>

        {/* Draw lines to children */}
        {node.left !== undefined && nodeMap[node.left] && (
          <line x1="0" y1="20" x2={-width / 2} y2="40" stroke="white" strokeWidth="1.5" />
        )}
        {node.right !== undefined && nodeMap[node.right] && (
          <line x1="0" y1="20" x2={width / 2} y2="40" stroke="white" strokeWidth="1.5" />
        )}
      </g>
    )
  }

  // Render tree level by level
  const renderTree = () => {
    const elements = []
    for (let level = 0; level <= maxDepth; level++) {
      const startPos = Math.pow(2, level)
      const endPos = Math.pow(2, level + 1) - 1

      for (let pos = startPos; pos <= endPos; pos++) {
        const element = renderNode(pos, level)
        if (element) elements.push(element)
      }
    }
    return elements
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4 overflow-auto">
      <svg width={levelWidth} height={(maxDepth + 1) * 60} viewBox={`0 0 ${levelWidth} ${(maxDepth + 1) * 60}`}>
        <g transform={`translate(${levelWidth / 2}, 30)`}>{renderTree()}</g>
      </svg>
    </div>
  )
}

// Hash Table Visualization Component
function HashTableVisualization({ data }: { data: any }) {
  const { hashTable = {}, operation, currentValue, highlightIndex } = data

  if (!hashTable || !hashTable.buckets) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-xl">Empty Hash Table</div>
      </div>
    )
  }

  const { buckets, size } = hashTable

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 overflow-auto">
      <div className="text-white mb-4">Hash Table (Size: {size})</div>
      <div className="w-full max-w-md">
        {buckets.map((bucket: any[], index: number) => {
          const isHighlighted = index === highlightIndex

          return (
            <div key={index} className="mb-2 flex items-start">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-md mr-2 ${
                  isHighlighted ? "bg-yellow-500" : "bg-gray-700"
                }`}
              >
                <span className="text-white font-mono">{index}</span>
              </div>
              <div className="flex-1 flex flex-wrap items-center">
                {bucket.length === 0 ? (
                  <div className="text-gray-400 italic">Empty</div>
                ) : (
                  bucket.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        backgroundColor: item.key === currentValue ? "rgb(239, 68, 68)" : "rgb(99, 102, 241)",
                      }}
                      transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                      className="m-1 px-3 py-1 rounded-full text-white text-sm flex items-center"
                    >
                      <span className="font-bold mr-1">{item.key}:</span>
                      <span>{item.value}</span>
                      {itemIndex < bucket.length - 1 && <span className="ml-1">→</span>}
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Graph Visualization Component
function GraphVisualization({ data }: { data: any }) {
  const { graph, visited = [], current, path = [], distances } = data

  if (!graph || !graph.nodes || !graph.edges) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-xl">Empty Graph</div>
      </div>
    )
  }

  const { nodes, edges } = graph

  // Calculate node positions using a simple force-directed layout
  // For simplicity, we'll use a predefined circular layout
  const radius = 120
  const centerX = 150
  const centerY = 150
  const nodePositions: Record<string, { x: number; y: number }> = {}

  nodes.forEach((node: any, index: number) => {
    const angle = (2 * Math.PI * index) / nodes.length
    nodePositions[node.id] = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    }
  })

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <svg width="300" height="300" viewBox="0 0 300 300">
        {/* Draw edges */}
        {edges.map((edge: any, index: number) => {
          const source = nodePositions[edge.source]
          const target = nodePositions[edge.target]

          const isInPath = path.some(
            (p) =>
              (p === edge.source && path[path.indexOf(p) + 1] === edge.target) ||
              (p === edge.target && path[path.indexOf(p) + 1] === edge.source),
          )

          return (
            <g key={`edge-${index}`}>
              <line
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={isInPath ? "rgb(234, 179, 8)" : "white"}
                strokeWidth={isInPath ? "3" : "1.5"}
                strokeOpacity="0.6"
              />

              {/* Display weight if available */}
              {edge.weight !== undefined && (
                <text
                  x={(source.x + target.x) / 2}
                  y={(source.y + target.y) / 2}
                  fill="white"
                  fontSize="10"
                  textAnchor="middle"
                  dy="-5"
                >
                  {edge.weight}
                </text>
              )}
            </g>
          )
        })}

        {/* Draw nodes */}
        {nodes.map((node: any) => {
          const pos = nodePositions[node.id]
          const isVisited = visited.includes(node.id)
          const isCurrent = current === node.id
          const isInPath = path.includes(node.id)

          let fillColor = "rgb(99, 102, 241)" // Default blue
          if (isCurrent)
            fillColor = "rgb(239, 68, 68)" // Red for current
          else if (isInPath)
            fillColor = "rgb(234, 179, 8)" // Yellow for path
          else if (isVisited) fillColor = "rgb(16, 185, 129)" // Green for visited

          return (
            <g key={`node-${node.id}`}>
              <motion.circle
                initial={{ r: 0 }}
                animate={{
                  r: 15,
                  fill: fillColor,
                }}
                transition={{ duration: 0.3 }}
                cx={pos.x}
                cy={pos.y}
              />
              <text x={pos.x} y={pos.y} textAnchor="middle" dy="5" fill="white" fontSize="12" fontWeight="bold">
                {node.id}
              </text>

              {/* Display distance if available */}
              {distances && distances[node.id] !== undefined && (
                <text x={pos.x} y={pos.y - 20} textAnchor="middle" fill="white" fontSize="10">
                  d: {distances[node.id]}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
