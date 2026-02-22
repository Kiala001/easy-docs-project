"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, X, Zap } from "lucide-react"
import Link from "next/link"

interface FileItem {
  id: string
  name: string
  size: number
  type: string
}

const CONVERSION_TYPES = [
  { id: "pdf-to-word", from: "PDF", to: "Word", format: "docx" },
  { id: "word-to-pdf", from: "Word", to: "PDF", format: "pdf" },
  { id: "pdf-to-txt", from: "PDF", to: "Texto", format: "txt" },
  { id: "pdf-to-image", from: "PDF", to: "Imagem", format: "png" },
  { id: "image-to-pdf", from: "Imagem", to: "PDF", format: "pdf" },
]

export default function FileConverterPage() {
  const [activeTab, setActiveTab] = useState("converter")
  const [files, setFiles] = useState<FileItem[]>([])
  const [mergeFiles, setMergeFiles] = useState<FileItem[]>([])
  const [conversionType, setConversionType] = useState("pdf-to-word")
  const [compressLevel, setCompressLevel] = useState(50)
  const [loading, setLoading] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isMerge = false) => {
    const uploadedFiles = e.target.files
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles).map((file) => ({
        id: Math.random().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
      }))

      if (isMerge) {
        setMergeFiles([...mergeFiles, ...newFiles])
      } else {
        setFiles([...files, ...newFiles])
      }
    }
  }

  const removeFile = (id: string, isMerge = false) => {
    if (isMerge) {
      setMergeFiles(mergeFiles.filter((f) => f.id !== id))
    } else {
      setFiles(files.filter((f) => f.id !== id))
    }
  }

  const handleConvert = async () => {
    if (files.length === 0) {
      alert("Selecione um arquivo para converter")
      return
    }

    setLoading(true)
    setTimeout(() => {
      alert(`Convertendo ${files[0].name}...`)
      setLoading(false)
    }, 1500)
  }

  const handleMerge = async () => {
    if (mergeFiles.length < 2) {
      alert("Selecione pelo menos 2 arquivos para mesclar")
      return
    }

    setLoading(true)
    setTimeout(() => {
      alert(`Mesclando ${mergeFiles.length} PDFs...`)
      setLoading(false)
    }, 2000)
  }

  const handleCompress = async () => {
    if (files.length === 0) {
      alert("Selecione um arquivo para comprimir")
      return
    }

    setLoading(true)
    setTimeout(() => {
      alert(`Comprimindo ${files[0].name} com qualidade ${compressLevel}%...`)
      setLoading(false)
    }, 1500)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar às Ferramentas
          </Link>
          <h1 className="text-4xl font-bold mb-2">Conversor de Documentos</h1>
          <p className="text-lg text-muted-foreground">
            Converta, comprima e mescle seus PDFs, Word, imagens e textos facilmente
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="converter">Converter</TabsTrigger>
                <TabsTrigger value="merge">Mesclar PDFs</TabsTrigger>
                <TabsTrigger value="compress">Comprimir</TabsTrigger>
              </TabsList>

              {/* Converter Tab */}
              <TabsContent value="converter" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tipo de Conversão</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {CONVERSION_TYPES.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setConversionType(type.id)}
                          className={`p-4 rounded-lg border-2 transition text-left ${
                            conversionType === type.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <p className="font-semibold text-sm">
                            {type.from} → {type.to}
                          </p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Selecione o Arquivo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Clique ou arraste seu arquivo aqui</p>
                        <p className="text-xs text-muted-foreground mt-1">Máximo 50MB</p>
                      </div>
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e)} multiple={false} />
                    </label>

                    {files.length > 0 && (
                      <div className="mt-6 space-y-2">
                        {files.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-secondary/50"
                          >
                            <div className="flex-1">
                              <p className="text-sm font-semibold">{file.name}</p>
                              <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                            </div>
                            <button onClick={() => removeFile(file.id)}>
                              <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Button
                  onClick={handleConvert}
                  disabled={loading || files.length === 0}
                  className="w-full h-12 bg-primary hover:bg-primary/90 gap-2"
                >
                  <Zap className="h-5 w-5" />
                  {loading ? "Convertendo..." : "Converter Arquivo"}
                </Button>
              </TabsContent>

              {/* Merge Tab */}
              <TabsContent value="merge" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Selecione Múltiplos PDFs</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                      Mescle até 20 arquivos PDF em um único documento
                    </p>
                  </CardHeader>
                  <CardContent>
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Arraste PDFs aqui</p>
                        <p className="text-xs text-muted-foreground mt-1">Máximo 20 arquivos</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, true)}
                        multiple
                        accept=".pdf"
                      />
                    </label>

                    {mergeFiles.length > 0 && (
                      <div className="mt-6 space-y-2">
                        <p className="text-sm font-semibold text-foreground">
                          {mergeFiles.length} arquivos selecionados
                        </p>
                        {mergeFiles.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-secondary/50"
                          >
                            <div className="flex-1">
                              <p className="text-sm font-semibold">{file.name}</p>
                              <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                            </div>
                            <button onClick={() => removeFile(file.id, true)}>
                              <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Button
                  onClick={handleMerge}
                  disabled={loading || mergeFiles.length < 2}
                  className="w-full h-12 bg-primary hover:bg-primary/90 gap-2"
                >
                  <Zap className="h-5 w-5" />
                  {loading ? "Mesclando..." : "Mesclar PDFs"}
                </Button>
              </TabsContent>

              {/* Compress Tab */}
              <TabsContent value="compress" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Selecione um PDF para Comprimir</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Selecione um PDF para comprimir</p>
                        <p className="text-xs text-muted-foreground mt-1">Máximo 100MB</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e)}
                        accept=".pdf"
                        multiple={false}
                      />
                    </label>

                    {files.length > 0 && (
                      <div className="mt-6 space-y-4">
                        <div className="p-3 rounded-lg border border-border/50 bg-secondary/50">
                          <p className="text-sm font-semibold">{files[0].name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(files[0].size)}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold">Nível de Compressão: {compressLevel}%</label>
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            value={compressLevel}
                            onChange={(e) => setCompressLevel(Number(e.target.value))}
                            className="w-full"
                          />
                          <p className="text-xs text-muted-foreground">
                            {compressLevel < 30
                              ? "Máxima compressão (mais perda de qualidade)"
                              : compressLevel < 70
                                ? "Balanceado (boa qualidade)"
                                : "Mínima compressão (melhor qualidade)"}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Button
                  onClick={handleCompress}
                  disabled={loading || files.length === 0}
                  className="w-full h-12 bg-primary hover:bg-primary/90 gap-2"
                >
                  <Zap className="h-5 w-5" />
                  {loading ? "Comprimindo..." : "Comprimir PDF"}
                </Button>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Features */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Características</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold mb-1">Conversões Rápidas</p>
                  <p className="text-muted-foreground">Converta entre os principais formatos em segundos</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Sem Limite de Arquivo</p>
                  <p className="text-muted-foreground">Processe arquivos de até 100MB</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Mesclar PDFs</p>
                  <p className="text-muted-foreground">Combine múltiplos PDFs em um único documento</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Comprimir PDFs</p>
                  <p className="text-muted-foreground">Ajuste a qualidade de compressão conforme precisa</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Privacidade Garantida</p>
                  <p className="text-muted-foreground">Seus arquivos não são armazenados nos servidores</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Sem Marca D'água</p>
                  <p className="text-muted-foreground">Seus documentos saem completamente limpos</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
