"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Send,
  Sparkles,
  MessageCircle,
  Loader2,
  ArrowRight,
} from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "assistant"
  timestamp: Date
}

export function AIChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Fish Tourism Guide. Ask me anything about authentic fish tourism experiences, local fishing traditions, or how to book your adventure!",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `That's a great question about "${input}"! I'd love to help you discover authentic fish tourism experiences. Would you like to know about our best fishing spots, local traditions, or how to book an experience with our host families?`,
        sender: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">AI Assistant</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ask Our Fish Tourism Guide</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get instant answers about authentic fishing experiences, local traditions, and how to book your adventure
          </p>
        </div>

        {/* Chat Widget */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 shadow-xl overflow-hidden">
            {/* Chat Messages Area */}
            <div
              className={`bg-gradient-to-br from-white to-accent/5 overflow-y-auto transition-all duration-300 ${
                isExpanded ? "h-96" : "h-48"
              }`}
            >
              <div className="p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl ${
                        message.sender === "user"
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-secondary text-foreground rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-secondary text-foreground px-4 py-3 rounded-xl rounded-bl-none flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-border p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about fishing experiences..."
                  disabled={isLoading}
                  className="flex-1 border-input focus-visible:ring-primary"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </Card>

          {/* Expand/Collapse Toggle */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              {isExpanded ? "Show Less" : "Show More"}
              <ArrowRight className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <p className="text-center text-sm text-muted-foreground mb-4 font-medium">Popular Questions:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                "What are your best fishing spots?",
                "How do I book an experience?",
                "Tell me about local fishing traditions",
              ].map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(question)
                    setIsExpanded(true)
                  }}
                  className="p-3 text-sm border-2 border-border hover:border-primary hover:bg-primary/5 rounded-lg transition-all text-left font-medium hover:text-primary group"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex-1">{question}</span>
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
