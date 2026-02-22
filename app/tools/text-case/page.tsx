"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Copy, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TextCaseConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState("uppercase")

  const convert = () => {
    let result = ""

    switch (mode) {
      case "uppercase":
        result = input.toUpperCase()
        break
      case "lowercase":
        result = input.toLowerCase()
        break
      case "capitalize":
        result = input
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ")
        break
      case "sentence":
        result = input.toLowerCase()
        result = result.charAt(0).toUpperCase() + result.slice(1)
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Conversor de Maiúsculas/Minúsculas</h1>
          <p className="text-muted-foreground">Converta o formato do seu texto facilmente</p>
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
                <label className="text-sm font-medium text-foreground">Formato de Saída</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="uppercase">TUDO MAIÚSCULAS</option>
                  <option value="lowercase">tudo minúsculas</option>
                  <option value="capitalize">Primeira Letra Maiúscula</option>
                  <option value="sentence">Primeira letra maiúscula apenas</option>
                </select>
              </div>

              <Button onClick={convert} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Converter
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
