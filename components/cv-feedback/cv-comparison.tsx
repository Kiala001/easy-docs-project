"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CVComparison({ original, optimized }: { original: string; optimized: string }) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copiado para área de transferência!")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Original */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">CV Original</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <pre className="bg-secondary/50 p-4 rounded-lg text-xs overflow-auto max-h-96 text-foreground">
            {original}
          </pre>
          <Button onClick={() => copyToClipboard(original)} variant="outline" className="w-full">
            <Copy className="h-4 w-4 mr-2" />
            Copiar Original
          </Button>
        </CardContent>
      </Card>

      {/* Optimized */}
      <Card className="border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-950/10">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            CV Otimizado
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <pre className="bg-background p-4 rounded-lg text-xs overflow-auto max-h-96 text-foreground border border-green-200 dark:border-green-800">
            {optimized}
          </pre>
          <Button onClick={() => copyToClipboard(optimized)} className="w-full">
            <Copy className="h-4 w-4 mr-2" />
            Copiar Otimizado
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
