"use client"

import { useState, useEffect } from "react"
import { HistoryManager, type HistoryItem } from "@/lib/history"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Clock } from "lucide-react"

export function HistorySidebar() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setHistory(HistoryManager.getHistory())
  }, [])

  const handleRemoveItem = (id: string) => {
    HistoryManager.removeItem(id)
    setHistory(HistoryManager.getHistory())
  }

  const handleClearHistory = () => {
    if (confirm("Tem certeza que deseja limpar todo o histórico?")) {
      HistoryManager.clearHistory()
      setHistory([])
    }
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return "Há pouco"
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h atrás`
    } else {
      return date.toLocaleDateString("pt-BR")
    }
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} variant="outline" className="fixed bottom-4 right-4 gap-2 z-40">
        <Clock className="h-4 w-4" />
        Histórico
      </Button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 max-h-96 z-50 bg-background border border-border rounded-lg shadow-lg flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Histórico</CardTitle>
          <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
            ✕
          </button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto space-y-2 pb-3">
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">Nenhum item no histórico</p>
        ) : (
          history.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-2 p-2 rounded hover:bg-muted">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">{formatDate(item.timestamp)}</p>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-destructive hover:text-destructive/80 flex-shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </CardContent>

      {history.length > 0 && (
        <div className="border-t border-border p-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearHistory}
            className="w-full text-destructive bg-transparent"
          >
            Limpar Histórico
          </Button>
        </div>
      )}
    </div>
  )
}
