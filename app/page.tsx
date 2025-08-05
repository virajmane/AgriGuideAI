"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, Camera, Leaf, CloudRain, TrendingUp, Users, Award, ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false)

  const features = [
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Disease Detection",
      description: "AI-powered crop disease identification using YOLOv8 and computer vision",
    },
    {
      icon: <Mic className="h-8 w-8" />,
      title: "Voice Advisory",
      description: "Multilingual voice interaction in Hindi, Marathi, Kannada, Bengali, and Punjabi",
    },
    {
      icon: <CloudRain className="h-8 w-8" />,
      title: "Weather Integration",
      description: "Real-time weather data and climate-resilient farming recommendations",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Market Intelligence",
      description: "Live market prices and optimal selling time predictions",
    },
  ]

  const metrics = [
    { label: "Target Farmers", value: "10,000+", icon: <Users className="h-5 w-5" /> },
    { label: "Yield Improvement", value: "15-20%", icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Water Savings", value: "25%", icon: <CloudRain className="h-5 w-5" /> },
    { label: "Response Time", value: "<3s", icon: <Award className="h-5 w-5" /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-green-800">AgriGuide AI</h1>
                <p className="text-sm text-green-600">Multimodal Agentic AI for Agriculture</p>
              </div>
            </div>
            <Link href="/dashboard">
              <Button className="bg-green-600 hover:bg-green-700">
                Launch Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
            Capital One Launchpad Hackathon 2024
          </Badge>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Empowering Indian Farmers with
            <span className="text-green-600 block">Intelligent AI Advisory</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A multilingual, multimodal Agentic AI advisor that farmers can access via voice, text, or camera—online or
            offline. Delivering trustworthy, hyper-local guidance on crop health, irrigation, inputs, finance, and
            policy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/dashboard">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                Try Live Demo
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 bg-transparent"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo Video
            </Button>
          </div>

          {/* Demo Video Placeholder */}
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-700">AgriGuide AI Demo Video</p>
                  <p className="text-gray-500">Multimodal farmer interaction journey</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Core Features</h3>
            <p className="text-xl text-gray-600">Advanced AI capabilities designed for Indian agriculture</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit text-green-600">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 px-4 bg-green-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Success Metrics</h3>
            <p className="text-xl text-gray-600">Measurable impact on Indian agriculture</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <Card key={index} className="text-center bg-white hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit text-green-600">{metric.icon}</div>
                  <div className="text-3xl font-bold text-green-600 mb-2">{metric.value}</div>
                  <div className="text-gray-600 font-medium">{metric.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Technical Innovation</h3>
            <p className="text-xl text-gray-600">Cutting-edge AI stack optimized for rural India</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-2xl font-bold text-gray-900 mb-6">Key Technologies</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Badge className="bg-blue-100 text-blue-800">AI/ML</Badge>
                  <div>
                    <p className="font-semibold">YOLOv8 + Quantized Llama-3</p>
                    <p className="text-gray-600">Computer vision and natural language processing</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge className="bg-purple-100 text-purple-800">Vector DB</Badge>
                  <div>
                    <p className="font-semibold">SentenceTransformers + Qdrant</p>
                    <p className="text-gray-600">RAG-based knowledge retrieval system</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge className="bg-green-100 text-green-800">Edge AI</Badge>
                  <div>
                    <p className="font-semibold">4-bit QLoRA Quantization</p>
                    <p className="text-gray-600">On-device inference for offline capability</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge className="bg-orange-100 text-orange-800">APIs</Badge>
                  <div>
                    <p className="font-semibold">OpenWeather, AGMARKNET, IMD</p>
                    <p className="text-gray-600">Real-time weather and market data integration</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Architecture Highlights</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Offline-first design with intelligent sync</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Multimodal input: voice, text, and camera</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>RAG prevents AI hallucination</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Runs on ₹8,000 Android devices</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>70% compute reduction via quantization</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Team AgriGuide AI</h3>
          <p className="text-xl text-gray-600 mb-12">Building the future of agricultural intelligence</p>

          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Viraj Mane</h4>
              <p className="text-gray-600 mb-4">AI Research Lead</p>
              <Badge className="bg-green-100 text-green-800">Theme #1: Agentic AI for Agriculture</Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Agriculture?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join us in empowering millions of Indian farmers with intelligent AI advisory
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3">
              Experience AgriGuide AI
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-6 w-6 text-green-400" />
            <span className="text-xl font-bold">AgriGuide AI</span>
          </div>
          <p className="text-gray-400">
            Capital One Launchpad Hackathon 2024 • Reimagining grassroots intelligence together
          </p>
        </div>
      </footer>
    </div>
  )
}
