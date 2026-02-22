"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function WordCounter() {
  const [text, setText] = useState("")

  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    sentences: text.trim() ? text.split(/[.!?]+/).filter((s) => s.trim()).length : 0,
    paragraphs: text.trim() ? text.split(/\n\n+/).filter((p) => p.trim()).length : 0,
    lines: text ? text.split("\n").length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200),
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Contador de Palavras e Caracteres</h1>
          <p className="text-muted-foreground">Analise estatísticas do seu texto em tempo real</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Cole seu texto aqui</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Cole ou digite seu texto para contar palavras, caracteres e mais..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-96"
              />
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Palavras</span>
                  <span className="text-2xl font-bold text-foreground">{stats.words}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Caracteres</span>
                  <span className="text-2xl font-bold text-foreground">{stats.characters}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Caracteres (sem espaços)</span>
                  <span className="text-lg font-semibold text-foreground">{stats.charactersNoSpaces}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Sentenças</span>
                  <span className="text-lg font-semibold text-foreground">{stats.sentences}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Parágrafos</span>
                  <span className="text-lg font-semibold text-foreground">{stats.paragraphs}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Linhas</span>
                  <span className="text-lg font-semibold text-foreground">{stats.lines}</span>
                </div>
                <div className="flex justify-between items-center pt-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                  <span className="text-muted-foreground">Tempo de leitura</span>
                  <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {stats.readingTime} min
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
