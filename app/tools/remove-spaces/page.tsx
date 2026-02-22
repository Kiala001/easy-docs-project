"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Copy, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RemoveSpaces() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState("extra")

  const removeSpaces = () => {
    let result = ""

    switch (mode) {
      case "extra":
        // Remove espaços extras
        result = input.replace(/\s+/g, " ").trim()
        break
      case "all":
        // Remove todos os espaços
        result = input.replace(/\s/g, "")
        break
      case "leading":
        // Remove espaços no início e fim
        result = input.trim()
        break
      case "lines":
        // Remove linhas em branco
        result = input
          .split("\n")
          .filter((line) => line.trim())
          .join("\n")
        break
      default:
        result = input
    }

    setOutput(result)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">Remover Espaços Extras</h1>
          <p className="text-muted-foreground">Limpe seu texto removendo espaços desnecessários</p>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Texto Original</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Cole seu texto aqui..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-64"
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tipo de Limpeza</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="extra">Remover espaços extras</option>
                  <option value="all">Remover todos os espaços</option>
                  <option value="leading">Remover espaços início/fim</option>
                  <option value="lines">Remover linhas em branco</option>
                </select>
              </div>

              <Button onClick={removeSpaces} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Remover Espaços
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resultado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {output ? (
                <>
                  <Textarea readOnly value={output} className="min-h-64 bg-muted" />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={copyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copiar Resultado
                  </Button>
                </>
              ) : (
                <div className="text-center py-32 text-muted-foreground">
                  <p>O resultado aparecerá aqui</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
