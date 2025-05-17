"use client"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"

interface CodeDisplayProps {
  code: string
  currentLine: number
}

export default function CodeDisplay({ code, currentLine }: CodeDisplayProps) {
  const codeLines = code.split("\n")

  const customStyle = {
    ...atomDark,
    'pre[class*="language-"]': {
      ...atomDark['pre[class*="language-"]'],
      background: "transparent",
      margin: 0,
      padding: 0,
    },
  }

  return (
    <div className="font-mono text-sm">
      {codeLines.map((line, index) => (
        <div key={index} className={`py-1 px-2 rounded ${currentLine === index + 1 ? "bg-yellow-500/30" : ""}`}>
          <div className="flex">
            <span className="text-gray-500 w-8 text-right mr-4">{index + 1}</span>
            <span>{line}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
