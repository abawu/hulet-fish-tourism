"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Sparkles, 
  Send, 
  MessageCircle, 
  Coffee, 
  Utensils, 
  Home, 
  MapPin, 
  DollarSign,
  X,
  ChevronRight,
  Clock,
  Users,
  Star
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  type?: "text" | "recommendations" | "booking"
  recommendations?: Recommendation[]
  bookingData?: BookingConfirmation
}

interface Recommendation {
  id: string
  title: string
  location: string
  price: number
  duration: string
  description: string
  maxGuests: number
  rating: number
  image: string
}

interface BookingConfirmation {
  experience: string
  date: string
  guests: number
  totalPrice: number
  confirmationId: string
}

const FAQ_DATA = [
  {
    question: "What unique experiences are available around Bole, Addis Ababa?",
    icon: MapPin,
    category: "Location",
    recommendations: [
      {
        id: "1",
        title: "Traditional Coffee Ceremony & Cooking Class",
        location: "Bole, Addis Ababa",
        price: 45,
        duration: "3 hours",
        description: "Learn traditional coffee roasting and enjoy authentic Ethiopian cuisine",
        maxGuests: 4,
        rating: 4.9,
        image: "/images/coffee-ceremony-woman.jpg",
      },
      {
        id: "2",
        title: "Injera Making & Family Dinner",
        location: "Bole, Addis Ababa",
        price: 35,
        duration: "2.5 hours",
        description: "Make traditional injera bread with a local family and share dinner",
        maxGuests: 6,
        rating: 4.8,
        image: "/images/injera-making.webp",
      },
    ],
  },
  {
    question: "Where can I enjoy an authentic Ethiopian coffee ceremony experience for under $50?",
    icon: Coffee,
    category: "Pricing",
    recommendations: [
      {
        id: "3",
        title: "Buna: The Sacred Coffee Ritual",
        location: "Addis Ababa",
        price: 35,
        duration: "2 hours",
        description: "Experience the 3-step coffee ceremony with fresh roasted beans",
        maxGuests: 5,
        rating: 4.95,
        image: "/images/coffee-ceremony-steam.webp",
      },
      {
        id: "4",
        title: "Coffee & Chat with Locals",
        location: "Addis Ababa",
        price: 25,
        duration: "1.5 hours",
        description: "Enjoy traditional coffee while learning about Ethiopian culture",
        maxGuests: 8,
        rating: 4.7,
        image: "/images/traditional-ceremony.jpg",
      },
    ],
  },
  {
    question: "Can you recommend cultural or local experiences near my location?",
    icon: Home,
    category: "Culture",
    recommendations: [
      {
        id: "5",
        title: "Ethiopian Dance & Music Workshop",
        location: "Central Addis Ababa",
        price: 40,
        duration: "2 hours",
        description: "Learn traditional Ethiopian dances and music from local performers",
        maxGuests: 10,
        rating: 4.8,
        image: "/images/traditional-dance.webp",
      },
      {
        id: "6",
        title: "Traditional Textile & Weaving Workshop",
        location: "Addis Ababa",
        price: 30,
        duration: "2 hours",
        description: "Create your own Ethiopian textile using traditional techniques",
        maxGuests: 4,
        rating: 4.6,
        image: "/images/ethiopian-textiles.jpg",
      },
    ],
  },
  {
    question: "What makes Ethiopia a unique travel destination?",
    icon: Sparkles,
    category: "General",
    recommendations: [],
  },
  {
    question: "What traditional foods will I experience?",
    icon: Utensils,
    category: "Food",
    recommendations: [
      {
        id: "7",
        title: "Doro Wot & Kitfo Tasting Experience",
        location: "Addis Ababa",
        price: 38,
        duration: "2 hours",
        description: "Taste traditional meat dishes prepared by a family chef",
        maxGuests: 6,
        rating: 4.9,
        image: "/images/traditional-meat-dish.jpg",
      },
      {
        id: "8",
        title: "Traditional Food Preparation Class",
        location: "Addis Ababa",
        price: 42,
        duration: "3 hours",
        description: "Learn to prepare authentic Ethiopian dishes from scratch",
        maxGuests: 4,
        rating: 4.85,
        image: "/images/traditional-food-prep.jpg",
      },
    ],
  },
]

const AI_RESPONSES: Record<string, string> = {
  "What unique experiences are available around Bole, Addis Ababa?":
    "Bole is the heart of modern Addis Ababa with incredible authentic experiences! I've found several highly-rated options for you, ranging from intimate coffee ceremonies to family cooking classes. These experiences connect you directly with local families who are passionate about sharing their culture. Let me show you the best options:",

  "Where can I enjoy an authentic Ethiopian coffee ceremony experience for under $50?":
    "Perfect! The Ethiopian coffee ceremony, or 'Buna,' is a sacred tradition that embodies our hospitality. I found several excellent options well within your budget that offer authentic experiences with traditional techniques. Each experience includes freshly roasted beans and the cultural story behind this ancient ritual:",

  "Can you recommend cultural or local experiences near my location?":
    "Absolutely! Ethiopian culture is rich and diverse. I recommend experiences that go beyond typical tourism - these are led by local families who genuinely love sharing their traditions. Here are curated experiences that showcase our music, dance, textiles, and more:",

  "What makes Ethiopia a unique travel destination?":
    "Ethiopia is remarkable for many reasons: we have 3,000+ years of history, our own calendar (we're 7-8 years behind), our own written language (Ge'ez), and most importantly, unparalleled hospitality. Unlike other tourist destinations, here you're not just visiting attractions - you're entering homes and hearts. Our people, culture, and traditions remain authentic and unchanged by mass tourism. Every experience is a genuine human connection.",

  "What traditional foods will I experience?":
    "Ethiopian cuisine is absolutely delicious! The centerpiece is injera - a spongy flatbread that serves as both plate and utensil. You'll enjoy rich, spiced stews like Doro Wot (chicken), Kitfo (minced raw beef), and Misir Wot (lentil). Everything is communal - friends and family eat from one plate. I found experienced families who will teach you to prepare these dishes and explain their cultural significance:",
}

export function AITourismAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "እንኳን ደህና መጡ (Selam)! I'm your AI Tourism Assistant for authentic Ethiopian experiences. Ask me about homestays, traditional food, coffee ceremonies, cultural activities, or pricing. What interests you?",
      type: "text",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleQuestionClick = (question: string, recommendations: Recommendation[]) => {
    setInput("")
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: question,
      type: "text",
    }
    setMessages((prev) => [...prev, userMsg])

    setIsLoading(true)
    setTimeout(() => {
      const response = AI_RESPONSES[question] || "Great question! Let me provide some recommendations for you."
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response,
        type: recommendations.length > 0 ? "recommendations" : "text",
        recommendations,
      }
      setMessages((prev) => [...prev, assistantMsg])
      setIsLoading(false)
    }, 500)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      type: "text",
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    setTimeout(() => {
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          "Thank you for your question! Based on what you're looking for, I'd recommend exploring our featured experiences above. Each is carefully selected to provide authentic Ethiopian hospitality. Would you like to book one of them or ask me more specific questions?",
        type: "text",
      }
      setMessages((prev) => [...prev, assistantMsg])
      setIsLoading(false)
    }, 800)
  }

  const handleBooking = (experience: Recommendation) => {
    const bookingMsg: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: `Excellent choice! "${experience.title}" is a wonderful experience. Let me confirm your booking:`,
      type: "booking",
      bookingData: {
        experience: experience.title,
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        guests: 2,
        totalPrice: experience.price * 2,
        confirmationId: `HF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      },
    }
    setMessages((prev) => [...prev, bookingMsg])
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          size="lg"
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-primary to-accent hover:scale-110 transition-all duration-300"
          title="Open AI Tourism Assistant"
        >
          <MessageCircle className="h-7 w-7" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-[420px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-3rem)]">
      <Card className="shadow-2xl border-primary/20 h-full flex flex-col rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary via-primary/95 to-accent text-white pb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Sparkles className="h-6 w-6 animate-spin" style={{ animationDuration: "3s" }} />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">AI Tourism Guide</CardTitle>
                <CardDescription className="text-white/80 text-xs">Powered by Ethiopian experts</CardDescription>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          {messages.length === 1 && (
            <div className="border-b bg-gradient-to-b from-accent/5 to-transparent p-4 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Explore Popular Topics</p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {FAQ_DATA.map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto py-2.5 px-3 hover:bg-primary/5 hover:border-primary/30 bg-white border-gray-200"
                    onClick={() => handleQuestionClick(item.question, item.recommendations)}
                  >
                    <item.icon className="h-4 w-4 mr-2 flex-shrink-0 text-primary" />
                    <div className="flex-1 min-w-0 text-left">
                      <div className="text-xs font-medium truncate">{item.question}</div>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {item.category}
                      </Badge>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-2 mt-1">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className="max-w-[calc(100%-2rem)] space-y-2">
                    {message.type === "text" && (
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-primary text-white"
                            : "bg-accent/10 text-foreground border border-accent/20"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    )}

                    {message.type === "recommendations" && message.recommendations && (
                      <div className="space-y-2">
                        <div className="rounded-2xl px-4 py-3 bg-accent/10 text-foreground border border-accent/20">
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                        <div className="space-y-2">
                          {message.recommendations.map((rec) => (
                            <Card
                              key={rec.id}
                              className="border-primary/20 hover:border-primary/50 transition-all cursor-pointer hover:shadow-md overflow-hidden"
                              onClick={() => handleBooking(rec)}
                            >
                              <CardContent className="p-3">
                                <div className="flex gap-3">
                                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0 flex items-center justify-center text-xs font-semibold text-primary">
                                    ${rec.price}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm line-clamp-2">{rec.title}</h4>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                      <MapPin className="h-3 w-3" />
                                      {rec.location}
                                    </p>
                                    <div className="flex gap-3 mt-2 text-xs">
                                      <span className="flex items-center gap-1 text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        {rec.duration}
                                      </span>
                                      <span className="flex items-center gap-1 text-muted-foreground">
                                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                                        {rec.rating}
                                      </span>
                                    </div>
                                  </div>
                                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {message.type === "booking" && message.bookingData && (
                      <div className="space-y-2">
                        <div className="rounded-2xl px-4 py-3 bg-accent/10 text-foreground border border-accent/20">
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                        <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
                          <CardContent className="p-4 space-y-3">
                            <div>
                              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Experience</p>
                              <p className="font-semibold text-sm mt-1">{message.bookingData.experience}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Date</p>
                                <p className="font-semibold text-sm mt-1">{message.bookingData.date}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Guests</p>
                                <p className="font-semibold text-sm mt-1">{message.bookingData.guests}</p>
                              </div>
                            </div>
                            <div className="border-t border-primary/20 pt-3">
                              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Total Price</p>
                              <p className="font-bold text-lg text-primary mt-1">${message.bookingData.totalPrice}</p>
                            </div>
                            <Button className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all text-sm font-semibold text-white">
                              Confirm Booking
                            </Button>
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground">
                                Confirmation ID: <span className="font-mono font-semibold text-primary">{message.bookingData.confirmationId}</span>
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-2">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-accent/10 border border-accent/20 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          <div className="border-t bg-white p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="rounded-full flex-shrink-0 bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
