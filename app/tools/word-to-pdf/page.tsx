"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, Download, X } from "lucide-react"
import Link from "next/link"

export default function WordToPDF() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0]
    if (
      selectedFile &&
      (selectedFile.type === "application/msword" ||
        selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFile(selectedFile)
    }
  }

  const convertToPDF = async () => {
    if (!file) return

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/convert/word-to-pdf", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Conversão falhou")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `documento_${Date.now()}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setFile(null)
    } catch (error) {
      console.error("Erro na conversão:", error)
      alert("Erro ao converter. Tente novamente.")
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Word para PDF</h1>
          <p className="text-muted-foreground">Converta documentos Word em PDF</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Selecione seu documento Word</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors"
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-foreground font-medium">Clique ou arraste seu Word aqui</p>
                <p className="text-sm text-muted-foreground">DOC, DOCX suportados</p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileSelect}
                className="hidden"
              />

              {file && (
                <div className="flex items-center justify-between bg-muted p-3 rounded">
                  <span className="text-sm text-foreground">{file.name}</span>
                  <button onClick={() => setFile(null)} className="text-destructive hover:text-destructive/80">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setFile(null)}
                  disabled={!file}
                >
                  Limpar
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={convertToPDF}
                  disabled={!file || loading}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {loading ? "Convertendo..." : "Converter para PDF"}
                </Button>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-4 text-sm text-blue-900 dark:text-blue-100">
                <p className="font-medium mb-2">Informações:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Mantém toda a formatação original</li>
                  <li>Suporta DOC e DOCX</li>
                  <li>Máximo 50MB</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
