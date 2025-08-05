"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Mic,
  MicOff,
  Camera,
  Send,
  Leaf,
  CloudRain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  MessageSquare,
  BarChart3,
  Volume2,
  Upload,
  X,
} from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  language?: string
  confidence?: number
  diseaseDetected?: {
    disease: string
    confidence: number
    treatment: string
    severity: "low" | "medium" | "high"
  }
}

interface WeatherData {
  location: string
  temperature: number
  humidity: number
  windSpeed: number
  condition: string
  forecast: Array<{
    day: string
    high: number
    low: number
    condition: string
  }>
}

interface MarketPrice {
  crop: string
  price: number
  change: number
  market: string
  unit: string
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("chat")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "नमस्ते! मैं AgriGuide AI हूं। मैं आपकी खेती में मदद कर सकता हूं। आप मुझसे हिंदी, मराठी, या अंग्रेजी में बात कर सकते हैं।",
      timestamp: new Date(),
      language: "hindi",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("hindi")
  const [cameraActive, setCameraActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mock weather data
  const weatherData: WeatherData = {
    location: "Pune, Maharashtra",
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    condition: "Partly Cloudy",
    forecast: [
      { day: "Today", high: 32, low: 22, condition: "Sunny" },
      { day: "Tomorrow", high: 30, low: 20, condition: "Cloudy" },
      { day: "Wed", high: 28, low: 18, condition: "Rain" },
      { day: "Thu", high: 26, low: 16, condition: "Rain" },
    ],
  }

  // Mock market prices
  const marketPrices: MarketPrice[] = [
    { crop: "Wheat", price: 2150, change: 2.5, market: "Pune APMC", unit: "per quintal" },
    { crop: "Rice", price: 3200, change: -1.2, market: "Mumbai APMC", unit: "per quintal" },
    { crop: "Soybean", price: 4800, change: 5.8, market: "Indore APMC", unit: "per quintal" },
    { crop: "Cotton", price: 6200, change: 3.2, market: "Nagpur APMC", unit: "per quintal" },
  ]

  // Mock government schemes
  const schemes = [
    {
      name: "PM-KISAN",
      description: "₹6,000 annual income support",
      eligibility: "Small & marginal farmers",
      status: "Active",
    },
    {
      name: "Crop Insurance",
      description: "Premium subsidy up to 2%",
      eligibility: "All farmers",
      status: "Available",
    },
    {
      name: "Soil Health Card",
      description: "Free soil testing",
      eligibility: "All farmers",
      status: "Active",
    },
  ]

  const languages = [
    { code: "hindi", name: "हिंदी", flag: "🇮🇳" },
    { code: "marathi", name: "मराठी", flag: "🇮🇳" },
    { code: "english", name: "English", flag: "🇺🇸" },
    { code: "kannada", name: "ಕನ್ನಡ", flag: "🇮🇳" },
    { code: "bengali", name: "বাংলা", flag: "🇮🇳" },
    { code: "punjabi", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  ]

  // Mock AI responses in different languages
  const getAIResponse = (message: string, language: string): string => {
    const responses = {
      hindi: {
        weather: "आज का मौसम अच्छा है। तापमान 28°C है और आर्द्रता 65% है। फसल की सिंचाई के लिए अच्छा समय है।",
        disease: "आपकी फसल में पत्ती का धब्बा रोग दिख रहा है। तुरंत कॉपर सल्फेट का छिड़काव करें।",
        general: "मैं आपकी खेती संबंधी समस्या का समाधान दे सकता हूं। कृपया अपना प्रश्न पूछें।",
      },
      marathi: {
        weather: "आजचे हवामान चांगले आहे। तापमान २८°C आहे आणि आर्द्रता ६५% आहे।",
        disease: "तुमच्या पिकात पानांवर डाग दिसत आहेत। ताबडतोब कॉपर सल्फेटची फवारणी करा।",
        general: "मी तुमच्या शेतीच्या समस्येचे निराकरण करू शकतो। कृपया तुमचा प्रश्न विचारा।",
      },
      english: {
        weather: "Today's weather is good. Temperature is 28°C with 65% humidity. Good time for crop irrigation.",
        disease: "Your crop shows signs of leaf spot disease. Apply copper sulfate spray immediately.",
        general: "I can help solve your farming problems. Please ask your question.",
      },
    }

    if (message.toLowerCase().includes("weather") || message.toLowerCase().includes("मौसम")) {
      return responses[language as keyof typeof responses]?.weather || responses.english.weather
    }
    if (message.toLowerCase().includes("disease") || message.toLowerCase().includes("रोग")) {
      return responses[language as keyof typeof responses]?.disease || responses.english.disease
    }
    return responses[language as keyof typeof responses]?.general || responses.english.general
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: getAIResponse(inputMessage, selectedLanguage),
        timestamp: new Date(),
        language: selectedLanguage,
        confidence: 0.95,
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)

    setInputMessage("")
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setCameraActive(false)
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL("image/jpeg")
        setCapturedImage(imageData)
        stopCamera()
        analyzeImage(imageData)
      }
    }
  }

  const analyzeImage = (imageData: string) => {
    setIsAnalyzing(true)

    // Simulate disease detection
    setTimeout(() => {
      const diseases = [
        {
          disease: "Leaf Spot",
          confidence: 0.92,
          treatment: "Apply copper sulfate spray",
          severity: "medium" as const,
        },
        {
          disease: "Powdery Mildew",
          confidence: 0.88,
          treatment: "Use sulfur-based fungicide",
          severity: "low" as const,
        },
        {
          disease: "Bacterial Blight",
          confidence: 0.95,
          treatment: "Remove affected leaves, apply bactericide",
          severity: "high" as const,
        },
      ]

      const detectedDisease = diseases[Math.floor(Math.random() * diseases.length)]

      const aiMessage: Message = {
        id: Date.now().toString(),
        type: "ai",
        content: `Disease detected: ${detectedDisease.disease} (${Math.round(detectedDisease.confidence * 100)}% confidence). Treatment: ${detectedDisease.treatment}`,
        timestamp: new Date(),
        diseaseDetected: detectedDisease,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result as string
        setCapturedImage(imageData)
        analyzeImage(imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const startVoiceRecognition = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.lang = selectedLanguage === "hindi" ? "hi-IN" : "en-US"
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
      }

      recognition.start()
    }
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = selectedLanguage === "hindi" ? "hi-IN" : "en-US"
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-bold text-green-800">AgriGuide AI</h1>
                <p className="text-xs text-green-600">Smart Farming Assistant</p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Badge className="bg-green-100 text-green-800">
                <MapPin className="h-3 w-3 mr-1" />
                Pune, MH
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>AI Chat</span>
            </TabsTrigger>
            <TabsTrigger value="weather" className="flex items-center space-x-2">
              <CloudRain className="h-4 w-4" />
              <span>Weather</span>
            </TabsTrigger>
            <TabsTrigger value="market" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Market</span>
            </TabsTrigger>
            <TabsTrigger value="schemes" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Schemes</span>
            </TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5" />
                      <span>AI Assistant</span>
                      <Badge className="ml-auto bg-green-100 text-green-800">Online</Badge>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.type === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p>{message.content}</p>
                            {message.diseaseDetected && (
                              <div className="mt-2 p-2 bg-white rounded border">
                                <div className="flex items-center space-x-2 mb-1">
                                  <AlertTriangle
                                    className={`h-4 w-4 ${
                                      message.diseaseDetected.severity === "high"
                                        ? "text-red-500"
                                        : message.diseaseDetected.severity === "medium"
                                          ? "text-yellow-500"
                                          : "text-green-500"
                                    }`}
                                  />
                                  <span className="font-semibold text-gray-900">{message.diseaseDetected.disease}</span>
                                  <Badge variant="outline">
                                    {Math.round(message.diseaseDetected.confidence * 100)}%
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600">{message.diseaseDetected.treatment}</p>
                              </div>
                            )}
                            {message.type === "ai" && (
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs opacity-70">
                                  {message.confidence && `Confidence: ${Math.round(message.confidence * 100)}%`}
                                </span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => speakText(message.content)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Volume2 className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {isAnalyzing && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 p-3 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                              <span>Analyzing image...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Ask about your crops, weather, or farming..."
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button
                        onClick={startVoiceRecognition}
                        variant={isListening ? "default" : "outline"}
                        size="icon"
                        className={isListening ? "bg-red-500 hover:bg-red-600" : ""}
                      >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                      <Button onClick={handleSendMessage} size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Camera Panel */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Camera className="h-5 w-5" />
                      <span>Disease Detection</span>
                    </CardTitle>
                    <CardDescription>Capture or upload crop images for AI analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!cameraActive && !capturedImage && (
                      <div className="space-y-2">
                        <Button onClick={startCamera} className="w-full">
                          <Camera className="h-4 w-4 mr-2" />
                          Start Camera
                        </Button>
                        <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </div>
                    )}

                    {cameraActive && (
                      <div className="space-y-2">
                        <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg" />
                        <div className="flex space-x-2">
                          <Button onClick={capturePhoto} className="flex-1">
                            Capture
                          </Button>
                          <Button onClick={stopCamera} variant="outline">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {capturedImage && (
                      <div className="space-y-2">
                        <img
                          src={capturedImage || "/placeholder.svg"}
                          alt="Captured crop"
                          className="w-full rounded-lg"
                        />
                        <Button onClick={() => setCapturedImage(null)} variant="outline" className="w-full">
                          Take Another Photo
                        </Button>
                      </div>
                    )}

                    <canvas ref={canvasRef} className="hidden" />
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => setInputMessage("What's the weather forecast for this week?")}
                    >
                      <CloudRain className="h-4 w-4 mr-2" />
                      Weather Forecast
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => setInputMessage("Show me current market prices")}
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Market Prices
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => setInputMessage("Tell me about government schemes")}
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Gov Schemes
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Weather Tab */}
          <TabsContent value="weather" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-8 w-8 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
                      <p className="text-sm text-gray-600">Temperature</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{weatherData.humidity}%</p>
                      <p className="text-sm text-gray-600">Humidity</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Wind className="h-8 w-8 text-gray-500" />
                    <div>
                      <p className="text-2xl font-bold">{weatherData.windSpeed}</p>
                      <p className="text-sm text-gray-600">km/h Wind</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Sun className="h-8 w-8 text-yellow-500" />
                    <div>
                      <p className="text-lg font-bold">{weatherData.condition}</p>
                      <p className="text-sm text-gray-600">Condition</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>4-Day Forecast</CardTitle>
                <CardDescription>Weather predictions for {weatherData.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {weatherData.forecast.map((day, index) => (
                    <div key={index} className="text-center p-4 border rounded-lg">
                      <p className="font-semibold">{day.day}</p>
                      <div className="my-2">
                        {day.condition === "Sunny" && <Sun className="h-8 w-8 text-yellow-500 mx-auto" />}
                        {day.condition === "Cloudy" && <CloudRain className="h-8 w-8 text-gray-500 mx-auto" />}
                        {day.condition === "Rain" && <CloudRain className="h-8 w-8 text-blue-500 mx-auto" />}
                      </div>
                      <p className="text-sm">
                        <span className="font-bold">{day.high}°</span> / {day.low}°
                      </p>
                      <p className="text-xs text-gray-600">{day.condition}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Farming Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-semibold">Irrigation Timing</p>
                      <p className="text-sm text-gray-600">
                        Good conditions for morning irrigation. Avoid evening watering due to high humidity.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-semibold">Rain Alert</p>
                      <p className="text-sm text-gray-600">
                        Rain expected on Wednesday. Plan harvesting activities accordingly.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-semibold">Pest Control</p>
                      <p className="text-sm text-gray-600">
                        Current weather favors pest activity. Monitor crops closely.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Market Tab */}
          <TabsContent value="market" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Market Prices</CardTitle>
                <CardDescription>Real-time prices from APMC markets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketPrices.map((price, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Leaf className="h-8 w-8 text-green-600" />
                        <div>
                          <p className="font-semibold">{price.crop}</p>
                          <p className="text-sm text-gray-600">{price.market}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">₹{price.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{price.unit}</p>
                        <div
                          className={`flex items-center space-x-1 ${
                            price.change > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          <TrendingUp className={`h-4 w-4 ${price.change < 0 ? "rotate-180" : ""}`} />
                          <span className="text-sm font-semibold">
                            {price.change > 0 ? "+" : ""}
                            {price.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Price Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Wheat</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded">
                          <div className="w-16 h-2 bg-green-500 rounded"></div>
                        </div>
                        <span className="text-sm text-green-600">↗ Rising</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Rice</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded">
                          <div className="w-12 h-2 bg-red-500 rounded"></div>
                        </div>
                        <span className="text-sm text-red-600">↘ Falling</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Soybean</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded">
                          <div className="w-18 h-2 bg-green-500 rounded"></div>
                        </div>
                        <span className="text-sm text-green-600">↗ Rising</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Selling Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-semibold">Soybean - Sell Now</p>
                        <p className="text-sm text-gray-600">Prices are at peak. Good time to sell.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="font-semibold">Wheat - Hold</p>
                        <p className="text-sm text-gray-600">Prices expected to rise next week.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-semibold">Rice - Wait</p>
                        <p className="text-sm text-gray-600">Prices are falling. Wait for recovery.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Schemes Tab */}
          <TabsContent value="schemes" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schemes.map((scheme, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {scheme.name}
                      <Badge
                        className={
                          scheme.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }
                      >
                        {scheme.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{scheme.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-semibold">Eligibility:</span> {scheme.eligibility}
                      </p>
                      <Button className="w-full bg-transparent" variant="outline">
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-semibold">PM-KISAN Application</p>
                      <p className="text-sm text-gray-600">Application ID: PMK2024001234</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-semibold">Crop Insurance</p>
                      <p className="text-sm text-gray-600">Application ID: CI2024005678</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subsidy Calculator</CardTitle>
                <CardDescription>Calculate potential subsidies for your farm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Farm Size (acres)</label>
                    <Input type="number" placeholder="Enter farm size" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Crop Type</label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select crop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="rice">Rice</SelectItem>
                        <SelectItem value="soybean">Soybean</SelectItem>
                        <SelectItem value="cotton">Cotton</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full mt-4">Calculate Subsidy</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
