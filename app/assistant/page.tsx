"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, AlertCircle, History, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MobileHeader } from "@/components/mobile-header"
import { MobileNav } from "@/components/mobile-nav"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  createConversation,
  saveMessage,
  loadConversation,
  getConversations,
  deleteConversation,
  type Message,
  type Conversation,
} from "@/lib/chat-storage"

export default function AssistantPage() {
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your medical assistant. I can help you with general health information, symptoms assessment, and finding appropriate medical facilities. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    loadConversationHistory()
  }, [])

  const loadConversationHistory = async () => {
    try {
      const history = await getConversations()
      setConversations(history)
    } catch (error) {
      console.error("[v0] Failed to load conversation history:", error)
    }
  }

  const quickPrompts = [
    "What should I do for a high fever?",
    "Find hospitals with emergency services",
    "Common symptoms of malaria",
    "First aid for minor burns",
  ]

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const userInput = input.trim()
    setInput("")
    setIsLoading(true)

    try {
      // Create conversation if this is the first message
      let currentConversationId = conversationId
      if (!currentConversationId) {
        currentConversationId = await createConversation(userInput)
        setConversationId(currentConversationId)
        console.log("[v0] Created new conversation:", currentConversationId)
      }

      // Save user message
      await saveMessage(currentConversationId, "user", userInput)
      console.log("[v0] Saved user message")

      // Generate AI response
      const assistantResponse = generateResponse(userInput)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Save assistant message
      await saveMessage(currentConversationId, "assistant", assistantResponse)
      console.log("[v0] Saved assistant message")

      // Refresh conversation list
      await loadConversationHistory()
    } catch (error) {
      console.error("[v0] Error saving message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadConversation = async (id: string) => {
    setIsLoadingHistory(true)
    try {
      const msgs = await loadConversation(id)
      setMessages(msgs)
      setConversationId(id)
      console.log("[v0] Loaded conversation:", id)
    } catch (error) {
      console.error("[v0] Failed to load conversation:", error)
    } finally {
      setIsLoadingHistory(false)
    }
  }

  const handleNewConversation = () => {
    setConversationId(null)
    setMessages([
      {
        id: "1",
        role: "assistant",
        content:
          "Hello! I'm your medical assistant. I can help you with general health information, symptoms assessment, and finding appropriate medical facilities. How can I assist you today?",
        timestamp: new Date(),
      },
    ])
  }

  const handleDeleteConversation = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await deleteConversation(id)
      await loadConversationHistory()
      if (conversationId === id) {
        handleNewConversation()
      }
      console.log("[v0] Deleted conversation:", id)
    } catch (error) {
      console.error("[v0] Failed to delete conversation:", error)
    }
  }

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("fever") || lowerQuery.includes("temperature")) {
      return "For a high fever (above 38°C/100.4°F):\n\n1. Take paracetamol or ibuprofen as directed\n2. Drink plenty of fluids\n3. Rest in a cool environment\n4. Monitor temperature regularly\n\nSeek immediate medical attention if:\n- Fever persists for more than 3 days\n- Temperature exceeds 39.4°C (103°F)\n- Accompanied by severe headache, rash, or difficulty breathing\n\nWould you like me to find nearby hospitals with emergency services?"
    }

    if (lowerQuery.includes("hospital") || lowerQuery.includes("emergency")) {
      return "I can help you find hospitals with emergency services in Sierra Leone. We have 10 hospitals in our directory, including:\n\n- Connaught Hospital (Freetown) - 24/7 Emergency\n- 34 Military Hospital (Freetown) - 24/7 Emergency\n- Bo Government Hospital (Bo) - 24/7 Emergency\n\nWould you like to see the full list or find hospitals near a specific location?"
    }

    if (lowerQuery.includes("malaria")) {
      return "Common symptoms of malaria include:\n\n- High fever and chills\n- Headache and body aches\n- Fatigue and weakness\n- Nausea and vomiting\n- Sweating\n\nMalaria is common in Sierra Leone. If you suspect malaria:\n1. Visit a medical facility immediately for testing\n2. Early diagnosis and treatment are crucial\n3. Don't self-medicate\n\nWould you like me to help you find the nearest hospital?"
    }

    if (lowerQuery.includes("burn")) {
      return "First aid for minor burns:\n\n1. Cool the burn under running water for 10-20 minutes\n2. Remove jewelry/tight items before swelling\n3. Cover with a clean, non-stick dressing\n4. Take pain relief if needed\n5. Do NOT use ice, butter, or ointments\n\nSeek medical help if:\n- Burn is larger than your palm\n- Burn is on face, hands, or joints\n- Skin looks white or charred\n- Severe pain or blistering\n\nShould I help you locate a nearby hospital?"
    }

    if (lowerQuery.includes("thank") || lowerQuery.includes("thanks") || lowerQuery.includes("appreciate")) {
      return "You're welcome! Remember, this is general medical information only. For serious symptoms or emergencies, always contact a healthcare professional or call 999. Is there anything else I can help you with?"
    }

    return "I understand you're asking about a health concern. While I can provide general health information, I recommend:\n\n1. Consulting with a healthcare professional for accurate diagnosis\n2. Visiting a hospital if symptoms are severe\n3. Calling 999 for medical emergencies\n\nCould you provide more details about your concern, or would you like me to help you find a nearby hospital?"
  }

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt)
    inputRef.current?.focus()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <MobileHeader />

      {/* Disclaimer */}
      <div className="border-b bg-amber-50 dark:bg-amber-950/20">
        <div className="container px-4 py-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <p className="text-sm text-amber-900 dark:text-amber-100">
              This assistant provides general health information only. For medical emergencies, call 999 immediately.
              Always consult healthcare professionals for diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>

      <div className="border-b bg-background">
        <div className="container flex items-center justify-between px-4 py-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <History className="mr-2 h-4 w-4" />
                History
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Chat History</SheetTitle>
                <SheetDescription>Your previous conversations</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-2">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`group flex items-center justify-between rounded-lg border p-3 cursor-pointer hover:bg-muted ${
                      conversationId === conv.id ? "bg-muted" : ""
                    }`}
                    onClick={() => handleLoadConversation(conv.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium">{conv.title || "Untitled"}</p>
                      <p className="text-xs text-muted-foreground">{new Date(conv.updated_at).toLocaleDateString()}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100"
                      onClick={(e) => handleDeleteConversation(conv.id, e)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                {conversations.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-8">No conversations yet</p>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Button variant="outline" size="sm" onClick={handleNewConversation}>
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container px-4 py-6">
          <div className="mx-auto max-w-3xl space-y-6">
            {isLoadingHistory ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex gap-2">
                  <div className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                  <div className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                  <div className="h-3 w-3 animate-bounce rounded-full bg-primary" />
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      message.role === "user" ? "bg-primary" : "bg-gradient-to-br from-green-500 to-green-600"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-5 w-5 text-primary-foreground" />
                    ) : (
                      <Bot className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <Card
                    className={`max-w-[85%] p-4 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
                    <span
                      className={`mt-2 block text-xs ${
                        message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </Card>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <Card className="bg-muted p-4">
                  <div className="flex gap-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                  </div>
                </Card>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Quick Prompts */}
      {messages.length === 1 && (
        <div className="border-t bg-muted/30">
          <div className="container px-4 py-4">
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 text-sm text-muted-foreground">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <Button
                    key={prompt}
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                    onClick={() => handleQuickPrompt(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="sticky bottom-20 border-t bg-background">
        <div className="container px-4 py-4">
          <div className="mx-auto max-w-3xl">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-2"
            >
              <Input
                ref={inputRef}
                type="text"
                placeholder="Ask about symptoms, conditions, or find hospitals..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="h-12"
              />
              <Button type="submit" size="lg" disabled={!input.trim() || isLoading}>
                <Send className="h-5 w-5" />
              </Button>
            </form>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Press Enter to send • This is not a substitute for professional medical advice
            </p>
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  )
}
