import { createClient } from "@/lib/supabase/client"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export interface Conversation {
  id: string
  title: string | null
  created_at: string
  updated_at: string
}

export async function createConversation(firstMessage?: string): Promise<string> {
  const supabase = createClient()

  const title = firstMessage ? firstMessage.slice(0, 50) + (firstMessage.length > 50 ? "..." : "") : "New Conversation"

  const { data, error } = await supabase.from("conversations").insert({ title }).select().single()

  if (error) {
    console.error("[v0] Error creating conversation:", error)
    throw error
  }

  return data.id
}

export async function saveMessage(conversationId: string, role: "user" | "assistant", content: string): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase.from("messages").insert({
    conversation_id: conversationId,
    role,
    content,
  })

  if (error) {
    console.error("[v0] Error saving message:", error)
    throw error
  }
}

export async function loadConversation(conversationId: string): Promise<Message[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("[v0] Error loading conversation:", error)
    throw error
  }

  return data.map((msg) => ({
    id: msg.id,
    role: msg.role as "user" | "assistant",
    content: msg.content,
    timestamp: new Date(msg.created_at),
  }))
}

export async function getConversations(): Promise<Conversation[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(20)

  if (error) {
    console.error("[v0] Error fetching conversations:", error)
    throw error
  }

  return data
}

export async function deleteConversation(conversationId: string): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase.from("conversations").delete().eq("id", conversationId)

  if (error) {
    console.error("[v0] Error deleting conversation:", error)
    throw error
  }
}
