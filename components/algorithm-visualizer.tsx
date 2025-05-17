"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Code,
  SplitSquareVertical,
  Database,
  GitBranch,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import VisualizationCanvas from "@/components/visualization-canvas"
import CodeDisplay from "@/components/code-display"
import {
  algorithmCategories,
  dataStructureCategories,
  getAlgorithmByKey,
  getDataStructureByKey,
} from "@/lib/algorithms"

export default function AlgorithmVisualizer() {
  const [visualizationType, setVisualizationType] = useState<"algorithm" | "dataStructure">("algorithm")
  const [selectedCategory, setSelectedCategory] = useState("sorting")
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubbleSort")
  const [selectedDataStructureCategory, setSelectedDataStructureCategory] = useState("linear")
  const [selectedDataStructure, setSelectedDataStructure] = useState("linkedList")
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(50)
  const [currentStep, setCurrentStep] = useState(0)
  const [totalSteps, setTotalSteps] = useState(0)
  const [showCode, setShowCode] = useState(true)
  const [inputData, setInputData] = useState("[5, 3, 8, 4, 2, 1, 9, 7, 6]")
  const [parsedData, setParsedData] = useState<number[]>([5, 3, 8, 4, 2, 1, 9, 7, 6])
  const [visualizationSteps, setVisualizationSteps] = useState<any[]>([])
  const [error, setError] = useState("")
  const [comparisonMode, setComparisonMode] = useState(false)
  const [secondItem, setSecondItem] = useState("")
  const [secondItemSteps, setSecondItemSteps] = useState<any[]>([])

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize visualization steps when selection or input changes
  useEffect(() => {
    try {
      const data = JSON.parse(inputData)
      setParsedData(Array.isArray(data) ? data : [])
      setError("")

      if (visualizationType === "algorithm") {
        const algorithm = getAlgorithmByKey(selectedAlgorithm)
        if (algorithm && Array.isArray(data)) {
          const steps = algorithm.generateSteps([...data])
          setVisualizationSteps(steps)
          setTotalSteps(steps.length)
          setCurrentStep(0)
          setIsPlaying(false)
        }

        // If comparison mode is on, generate steps for second algorithm
        if (comparisonMode && secondItem) {
          const secondAlgo = getAlgorithmByKey(secondItem)
          if (secondAlgo && Array.isArray(data)) {
            const steps = secondAlgo.generateSteps([...data])
            setSecondItemSteps(steps)
          }
        }
      } else {
        const dataStructure = getDataStructureByKey(selectedDataStructure)
        if (dataStructure && Array.isArray(data)) {
          const steps = dataStructure.generateSteps([...data])
          setVisualizationSteps(steps)
          setTotalSteps(steps.length)
          setCurrentStep(0)
          setIsPlaying(false)
        }

        // If comparison mode is on, generate steps for second data structure
        if (comparisonMode && secondItem) {
          const secondDS = getDataStructureByKey(secondItem)
          if (secondDS && Array.isArray(data)) {
            const steps = secondDS.generateSteps([...data])
            setSecondItemSteps(steps)
          }
        }
      }
    } catch (e) {
      setError("Invalid input data. Please provide a valid JSON array.")
    }
  }, [visualizationType, selectedAlgorithm, selectedDataStructure, inputData, comparisonMode, secondItem])

  // Handle play/pause
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(
        () => {
          setCurrentStep((prev) => {
            if (prev >= totalSteps - 1) {
              setIsPlaying(false)
              return prev
            }
            return prev + 1
          })
        },
        1000 - speed * 9,
      )
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, speed, totalSteps])

  const handleVisualizationTypeChange = (type: "algorithm" | "dataStructure") => {
    setVisualizationType(type)
    setComparisonMode(false)
    setSecondItem("")

    // Set default selections based on type
    if (type === "algorithm") {
      setSelectedCategory("sorting")
      setSelectedAlgorithm("bubbleSort")
    } else {
      setSelectedDataStructureCategory("linear")
      setSelectedDataStructure("linkedList")
    }
  }

  const handleCategoryChange = (value: string) => {
    if (visualizationType === "algorithm") {
      setSelectedCategory(value)
      // Set default algorithm for the category
      const category = algorithmCategories.find((cat) => cat.key === value)
      if (category && category.algorithms.length > 0) {
        setSelectedAlgorithm(category.algorithms[0].key)
      }
    } else {
      setSelectedDataStructureCategory(value)
      // Set default data structure for the category
      const category = dataStructureCategories.find((cat) => cat.key === value)
      if (category && category.dataStructures.length > 0) {
        setSelectedDataStructure(category.dataStructures[0].key)
      }
    }
    setComparisonMode(false)
    setSecondItem("")
  }

  const handleItemChange = (value: string) => {
    if (visualizationType === "algorithm") {
      setSelectedAlgorithm(value)
    } else {
      setSelectedDataStructure(value)
    }

    if (comparisonMode && value === secondItem) {
      // Avoid same item in comparison mode
      setSecondItem("")
    }
  }

  const handleSecondItemChange = (value: string) => {
    setSecondItem(value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputData(e.target.value)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const handleStepForward = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSpeedChange = (value: number[]) => {
    setSpeed(value[0])
  }

  const toggleComparisonMode = () => {
    setComparisonMode(!comparisonMode)
    if (!comparisonMode) {
      // When enabling comparison mode, set a default second item
      if (visualizationType === "algorithm") {
        const category = algorithmCategories.find((cat) => cat.key === selectedCategory)
        if (category && category.algorithms.length > 1) {
          const availableAlgos = category.algorithms.filter((algo) => algo.key !== selectedAlgorithm)
          if (availableAlgos.length > 0) {
            setSecondItem(availableAlgos[0].key)
          }
        }
      } else {
        const category = dataStructureCategories.find((cat) => cat.key === selectedDataStructureCategory)
        if (category && category.dataStructures.length > 1) {
          const availableDS = category.dataStructures.filter((ds) => ds.key !== selectedDataStructure)
          if (availableDS.length > 0) {
            setSecondItem(availableDS[0].key)
          }
        }
      }
    } else {
      setSecondItem("")
    }
  }

  const currentItem =
    visualizationType === "algorithm"
      ? getAlgorithmByKey(selectedAlgorithm)
      : getDataStructureByKey(selectedDataStructure)

  const currentStepData = visualizationSteps[currentStep] || {
    array: parsedData,
    comparisons: [],
    swaps: [],
  }

  const secondItemObj =
    visualizationType === "algorithm" ? getAlgorithmByKey(secondItem) : getDataStructureByKey(secondItem)

  const secondStepData = secondItemSteps[Math.min(currentStep, secondItemSteps.length - 1)] || {
    array: parsedData,
    comparisons: [],
    swaps: [],
  }

  // Get available items for comparison based on current selection
  const getAvailableComparisonItems = () => {
    if (visualizationType === "algorithm") {
      const category = algorithmCategories.find((cat) => cat.key === selectedCategory)
      return category?.algorithms.filter((algo) => algo.key !== selectedAlgorithm) || []
    } else {
      const category = dataStructureCategories.find((cat) => cat.key === selectedDataStructureCategory)
      return category?.dataStructures.filter((ds) => ds.key !== selectedDataStructure) || []
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card
        className={`${comparisonMode ? "lg:col-span-3" : "lg:col-span-2"} bg-white/10 backdrop-blur-md border-white/20`}
      >
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 mb-6 justify-between">
            <div className="flex gap-2">
              <div className="flex gap-2 mr-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={visualizationType === "algorithm" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleVisualizationTypeChange("algorithm")}
                        className={
                          visualizationType === "algorithm"
                            ? "bg-purple-600 hover:bg-purple-700"
                            : "bg-white/20 border-white/30 text-white hover:bg-white/30"
                        }
                      >
                        <GitBranch size={16} className="mr-1" />
                        Algorithms
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Visualize Algorithms</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={visualizationType === "dataStructure" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleVisualizationTypeChange("dataStructure")}
                        className={
                          visualizationType === "dataStructure"
                            ? "bg-purple-600 hover:bg-purple-700"
                            : "bg-white/20 border-white/30 text-white hover:bg-white/30"
                        }
                      >
                        <Database size={16} className="mr-1" />
                        Data Structures
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Visualize Data Structures</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <Select
                value={visualizationType === "algorithm" ? selectedCategory : selectedDataStructureCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-[180px] bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {visualizationType === "algorithm"
                    ? algorithmCategories.map((category) => (
                        <SelectItem key={category.key} value={category.key}>
                          {category.name}
                        </SelectItem>
                      ))
                    : dataStructureCategories.map((category) => (
                        <SelectItem key={category.key} value={category.key}>
                          {category.name}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>

              <Select
                value={visualizationType === "algorithm" ? selectedAlgorithm : selectedDataStructure}
                onValueChange={handleItemChange}
              >
                <SelectTrigger className="w-[180px] bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder={visualizationType === "algorithm" ? "Algorithm" : "Data Structure"} />
                </SelectTrigger>
                <SelectContent>
                  {visualizationType === "algorithm"
                    ? algorithmCategories
                        .find((cat) => cat.key === selectedCategory)
                        ?.algorithms.map((algo) => (
                          <SelectItem key={algo.key} value={algo.key}>
                            {algo.name}
                          </SelectItem>
                        ))
                    : dataStructureCategories
                        .find((cat) => cat.key === selectedDataStructureCategory)
                        ?.dataStructures.map((ds) => (
                          <SelectItem key={ds.key} value={ds.key}>
                            {ds.name}
                          </SelectItem>
                        ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleComparisonMode}
                      className={`bg-white/20 border-white/30 text-white hover:bg-white/30 ${comparisonMode ? "bg-white/40" : ""}`}
                    >
                      <SplitSquareVertical size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{comparisonMode ? "Disable" : "Enable"} Comparison Mode</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowCode(!showCode)}
                      className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                    >
                      <Code size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{showCode ? "Hide" : "Show"} Code</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {comparisonMode && (
            <div className="mb-4 flex items-center gap-2">
              <span className="text-white">Compare with:</span>
              <Select value={secondItem} onValueChange={handleSecondItemChange}>
                <SelectTrigger className="w-[180px] bg-white/20 border-white/30 text-white">
                  <SelectValue
                    placeholder={visualizationType === "algorithm" ? "Select algorithm" : "Select data structure"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableComparisonItems().map((item) => (
                    <SelectItem key={item.key} value={item.key}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className={`grid ${comparisonMode ? "grid-cols-1 md:grid-cols-2 gap-4" : ""}`}>
            <div className="mb-6 h-[300px] bg-black/30 rounded-lg overflow-hidden relative">
              <VisualizationCanvas data={currentStepData} algorithm={currentItem} />

              {currentItem && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 text-white p-3 rounded-md">
                  <p className="text-sm font-medium">{currentItem.name}</p>
                  {currentStepData.message && <p className="text-sm mt-2 text-yellow-300">{currentStepData.message}</p>}
                </div>
              )}
            </div>

            {comparisonMode && secondItem && (
              <div className="mb-6 h-[300px] bg-black/30 rounded-lg overflow-hidden relative">
                <VisualizationCanvas data={secondStepData} algorithm={secondItemObj} />

                {secondItemObj && (
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 text-white p-3 rounded-md">
                    <p className="text-sm font-medium">{secondItemObj.name}</p>
                    {secondStepData.message && <p className="text-sm mt-2 text-yellow-300">{secondStepData.message}</p>}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleStepBackward}
                  disabled={currentStep === 0}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  <ChevronLeft size={18} />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleStepForward}
                  disabled={currentStep === totalSteps - 1}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  <ChevronRight size={18} />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleReset}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  <RotateCcw size={18} />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-white text-sm">Speed:</span>
                <div className="w-32">
                  <Slider
                    value={[speed]}
                    min={1}
                    max={100}
                    step={1}
                    onValueChange={handleSpeedChange}
                    className="w-full"
                  />
                </div>
                <FastForward size={18} className="text-white" />
              </div>

              <div className="text-white text-sm">
                Step {currentStep + 1} of {totalSteps}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className={`${comparisonMode ? "lg:col-span-3" : ""} bg-white/10 backdrop-blur-md border-white/20`}>
        <CardContent className="p-6">
          <Tabs defaultValue="input">
            <TabsList className="w-full bg-black/30">
              <TabsTrigger value="input" className="text-white data-[state=active]:bg-white/20">
                Input
              </TabsTrigger>
              {showCode && (
                <TabsTrigger value="code" className="text-white data-[state=active]:bg-white/20">
                  Code
                </TabsTrigger>
              )}
              <TabsTrigger value="settings" className="text-white data-[state=active]:bg-white/20">
                Settings
              </TabsTrigger>
              {comparisonMode && (
                <TabsTrigger value="comparison" className="text-white data-[state=active]:bg-white/20">
                  Comparison
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="input" className="mt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="input-data" className="text-white mb-2 block">
                    Input Data (JSON Array)
                  </Label>
                  <Textarea
                    id="input-data"
                    value={inputData}
                    onChange={handleInputChange}
                    placeholder="Enter array data as JSON"
                    className="bg-black/20 border-white/30 text-white placeholder:text-white/50"
                    rows={6}
                  />
                  {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </div>

                <div>
                  <h3 className="text-white font-medium mb-2">
                    {visualizationType === "algorithm" ? "Algorithm" : "Data Structure"} Info
                  </h3>
                  {currentItem && (
                    <div className="bg-black/20 p-3 rounded-md text-white/90 text-sm">
                      <p className="mb-2">
                        <span className="font-semibold">Time Complexity:</span> {currentItem.timeComplexity}
                      </p>
                      <p className="mb-2">
                        <span className="font-semibold">Space Complexity:</span> {currentItem.spaceComplexity}
                      </p>
                      <p>
                        <span className="font-semibold">Best For:</span> {currentItem.bestFor}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {showCode && (
              <TabsContent value="code" className="mt-4">
                <ScrollArea className="h-[300px] rounded-md bg-black/20 p-4">
                  {currentItem && <CodeDisplay code={currentItem.code} currentLine={currentStepData.codeLine || 0} />}
                </ScrollArea>
              </TabsContent>
            )}

            <TabsContent value="settings" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-comparisons" className="text-white">
                    Show Comparisons
                  </Label>
                  <Switch id="show-comparisons" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="show-swaps" className="text-white">
                    Show Swaps
                  </Label>
                  <Switch id="show-swaps" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="show-array-access" className="text-white">
                    Show Array Access
                  </Label>
                  <Switch id="show-array-access" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode" className="text-white">
                    Dark Mode
                  </Label>
                  <Switch id="dark-mode" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="comparison-mode" className="text-white">
                    Comparison Mode
                  </Label>
                  <Switch id="comparison-mode" checked={comparisonMode} onCheckedChange={toggleComparisonMode} />
                </div>
              </div>
            </TabsContent>

            {comparisonMode && (
              <TabsContent value="comparison" className="mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-white font-medium mb-2">{currentItem?.name}</h3>
                      <div className="bg-black/20 p-3 rounded-md text-white/90 text-sm">
                        <p className="mb-2">
                          <span className="font-semibold">Time Complexity:</span> {currentItem?.timeComplexity}
                        </p>
                        <p className="mb-2">
                          <span className="font-semibold">Space Complexity:</span> {currentItem?.spaceComplexity}
                        </p>
                        <p>
                          <span className="font-semibold">Best For:</span> {currentItem?.bestFor}
                        </p>
                      </div>
                    </div>

                    {secondItemObj && (
                      <div>
                        <h3 className="text-white font-medium mb-2">{secondItemObj.name}</h3>
                        <div className="bg-black/20 p-3 rounded-md text-white/90 text-sm">
                          <p className="mb-2">
                            <span className="font-semibold">Time Complexity:</span> {secondItemObj.timeComplexity}
                          </p>
                          <p className="mb-2">
                            <span className="font-semibold">Space Complexity:</span> {secondItemObj.spaceComplexity}
                          </p>
                          <p>
                            <span className="font-semibold">Best For:</span> {secondItemObj.bestFor}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-white font-medium mb-2">Comparison Analysis</h3>
                    <div className="bg-black/20 p-3 rounded-md text-white/90 text-sm">
                      {currentItem && secondItemObj ? (
                        <>
                          <p className="mb-2">
                            <span className="font-semibold">Time Efficiency:</span>{" "}
                            {getTimeEfficiencyComparison(currentItem, secondItemObj)}
                          </p>
                          <p className="mb-2">
                            <span className="font-semibold">Space Efficiency:</span>{" "}
                            {getSpaceEfficiencyComparison(currentItem, secondItemObj)}
                          </p>
                          <p>
                            <span className="font-semibold">Use Case Recommendation:</span>{" "}
                            {getUseCaseRecommendation(currentItem, secondItemObj)}
                          </p>
                        </>
                      ) : (
                        <p>Select two items to compare</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper functions for comparison analysis
function getTimeEfficiencyComparison(item1: any, item2: any) {
  const timeComplexityRank: Record<string, number> = {
    "O(1)": 1,
    "O(log n)": 2,
    "O(n)": 3,
    "O(n log n)": 4,
    "O(n²)": 5,
    "O(2^n)": 6,
    "O(n!)": 7,
  }

  // Extract the base complexity (ignoring best/worst case distinctions)
  const getBaseComplexity = (complexity: string) => {
    const matches = complexity.match(/O$$[^)]+$$/)
    return matches ? matches[0] : complexity
  }

  const item1Base = getBaseComplexity(item1.timeComplexity)
  const item2Base = getBaseComplexity(item2.timeComplexity)

  const rank1 = timeComplexityRank[item1Base] || 999
  const rank2 = timeComplexityRank[item2Base] || 999

  if (rank1 < rank2) {
    return `${item1.name} is generally faster than ${item2.name} with time complexity ${item1.timeComplexity} vs ${item2.timeComplexity}.`
  } else if (rank1 > rank2) {
    return `${item2.name} is generally faster than ${item1.name} with time complexity ${item2.timeComplexity} vs ${item1.timeComplexity}.`
  } else {
    return `Both have similar time complexity: ${item1.timeComplexity}.`
  }
}

function getSpaceEfficiencyComparison(item1: any, item2: any) {
  const spaceComplexityRank: Record<string, number> = {
    "O(1)": 1,
    "O(log n)": 2,
    "O(n)": 3,
    "O(n log n)": 4,
    "O(n²)": 5,
  }

  // Extract the base complexity (ignoring qualifiers)
  const getBaseComplexity = (complexity: string) => {
    const matches = complexity.match(/O$$[^)]+$$/)
    return matches ? matches[0] : complexity
  }

  const item1Base = getBaseComplexity(item1.spaceComplexity)
  const item2Base = getBaseComplexity(item2.spaceComplexity)

  const rank1 = spaceComplexityRank[item1Base] || 999
  const rank2 = spaceComplexityRank[item2Base] || 999

  if (rank1 < rank2) {
    return `${item1.name} uses less memory than ${item2.name} with space complexity ${item1.spaceComplexity} vs ${item2.spaceComplexity}.`
  } else if (rank1 > rank2) {
    return `${item2.name} uses less memory than ${item1.name} with space complexity ${item2.spaceComplexity} vs ${item1.spaceComplexity}.`
  } else {
    return `Both have similar space requirements: ${item1.spaceComplexity}.`
  }
}

function getUseCaseRecommendation(item1: any, item2: any) {
  return `${item1.name} is best for ${item1.bestFor.toLowerCase()}, while ${item2.name} is best for ${item2.bestFor.toLowerCase()}.`
}
