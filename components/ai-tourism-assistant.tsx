"use client"

import type React from "react"

import { useState } from "react"
import { useChat } from "ai/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, Send, MessageCircle, Coffee, Utensils, Home, MapPin, DollarSign } from "lucide-react"

const SAMPLE_QUESTIONS = [
  {
    question: "What is a traditional Ethiopian coffee ceremony?",
    icon: Coffee,
    category: "Culture",
  },
  {
    question: "How much does a homestay experience cost?",
    icon: DollarSign,
    category: "Pricing",
  },
  {
    question: "What traditional foods will I experience?",
    icon: Utensils,
    category: "Food",
  },
  {
    question: "Where are the host families located?",
    icon: MapPin,
    category: "Location",
  },
  {
    question: "What makes Ethiopian hospitality unique?",
    icon: Home,
    category: "Culture",
  },
]

export function AITourismAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/tourism-chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "እንኳን ደህና መጡ! (Welcome!) I'm your Ethiopian tourism guide. Ask me anything about authentic homestays, traditional food, cultural experiences, or pricing. How can I help you today?",
      },
    ],
  })

  const handleQuestionClick = (question: string) => {
    handleInputChange({
      target: { value: question },
    } as React.ChangeEvent<HTMLInputElement>)
    setTimeout(() => {
      const form = document.getElementById("chat-form") as HTMLFormElement
      form?.requestSubmit()
    }, 100)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-primary to-accent hover:scale-110 transition-all"
        >
          <MessageCircle className="h-7 w-7" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)]">
      <Card className="shadow-2xl border-2">
        <CardHeader className="bg-gradient-to-br from-primary to-accent text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <CardTitle className="text-xl">Ethiopian Guide</CardTitle>
            </div>
            <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20">
              ✕
            </Button>
          </div>
          <CardDescription className="text-white/90">Ask me about authentic Ethiopian experiences</CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {messages.length === 1 && (
            <div className="p-4 space-y-3 border-b">
              <p className="text-sm font-medium text-muted-foreground">Popular Questions:</p>
              <div className="space-y-2">
                {SAMPLE_QUESTIONS.map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto py-3 hover:bg-accent/10 bg-transparent"
                    onClick={() => handleQuestionClick(item.question)}
                  >
                    <item.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm truncate">{item.question}</div>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {item.category}
                      </Badge>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          <ScrollArea className="h-[400px] p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === "user" ? "bg-primary text-white" : "bg-accent/10 text-foreground border"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-accent/10 border rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <form id="chat-form" onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about Ethiopian experiences..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="rounded-full flex-shrink-0"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
