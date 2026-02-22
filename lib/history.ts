// Gerenciador de histórico de conversões e gerações
export interface HistoryItem {
  id: string
  type: "generator" | "converter"
  name: string
  timestamp: number
  fileName: string
}

export class HistoryManager {
  private static readonly STORAGE_KEY = "easydocs_history"

  static getHistory(): HistoryItem[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  static addItem(item: Omit<HistoryItem, "id" | "timestamp">): HistoryItem {
    const newItem: HistoryItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    }

    if (typeof window !== "undefined") {
      try {
        const history = this.getHistory()
        const updated = [newItem, ...history].slice(0, 50) // Manter últimos 50 itens
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated))
      } catch {
        console.error("Erro ao salvar histórico")
      }
    }

    return newItem
  }

  static removeItem(id: string): void {
    if (typeof window === "undefined") return

    try {
      const history = this.getHistory()
      const updated = history.filter((item) => item.id !== id)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated))
    } catch {
      console.error("Erro ao remover do histórico")
    }
  }

  static clearHistory(): void {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(this.STORAGE_KEY)
      } catch {
        console.error("Erro ao limpar histórico")
      }
    }
  }
}
