"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Sparkles, Copy } from "lucide-react"
import Link from "next/link"

const TEXT_TYPES = {
  introduction: {
    name: "Introdução",
    description: "Para trabalhos, relatórios e apresentações",
  },
  conclusion: {
    name: "Conclusão",
    description: "Finalizações profissionais para documentos",
  },
  bio: {
    name: "Biografia Profissional",
    description: "Para LinkedIn, CV e redes sociais",
  },
  summary: {
    name: "Resumo Executivo",
    description: "Síntese profissional de projetos",
  },
}

const TONE_OPTIONS = [
  { value: "formal", label: "Formal" },
  { value: "professional", label: "Profissional" },
  { value: "casual", label: "Casual" },
  { value: "academic", label: "Acadêmico" },
]

export default function TextGeneratorPage() {
  const [textType, setTextType] = useState("")
  const [tone, setTone] = useState("professional")
  const [topic, setTopic] = useState("")
  const [keywords, setKeywords] = useState("")
  const [context, setContext] = useState("")
  const [generated, setGenerated] = useState("")
  const [loading, setLoading] = useState(false)

  const generateText = async () => {
    if (!textType || !topic) {
      alert("Preencha o tipo de texto e o tópico")
      return
    }

    setLoading(true)
    setTimeout(() => {
      const mockText = generateMockText()
      setGenerated(mockText)
      setLoading(false)
    }, 1500)
  }

  const generateMockText = () => {
    const typeLabel = TEXT_TYPES[textType as keyof typeof TEXT_TYPES]?.name || "Texto"
    const baseText = {
      introduction: `A presente análise visa explorar os aspectos fundamentais de ${topic}. Este documento busca proporcionar uma compreensão aprofundada sobre o tema, considerando suas dimensões teóricas e práticas. Ao longo do trabalho, serão abordados os principais conceitos relacionados a ${topic}, bem como suas implicações e relevância no contexto atual.`,
      conclusion: `Em conclusão, ${topic} representa um aspecto importante que merece atenção e análise contínua. As discussões apresentadas neste documento demonstram a complexidade e a relevância do tema. Recomenda-se, portanto, uma abordagem sistemática e fundamentada para a continuidade dos estudos nesta área.`,
      bio: `Profissional com sólida experiência em ${topic}. Dedicado ao desenvolvimento de soluções inovadoras e orientado a resultados. Possuo conhecimento aprofundado em ${keywords || "sua área de atuação"}, com comprovada capacidade de liderança e trabalho em equipe. Comprometido com a excelência e a busca contínua por aprimoramento profissional.`,
      summary: `Este resumo executivo sintetiza os principais pontos relacionados a ${topic}. A análise revela que ${topic} apresenta grande potencial e relevância estratégica. As recomendações propostas visam otimizar resultados e maximizar o impacto das iniciativas nesta área.`,
    }

    return baseText[textType as keyof typeof baseText] || "Texto não disponível"
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated)
    alert("Texto copiado para área de transferência!")
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
          <h1 className="text-4xl font-bold mb-2">Gerador de Textos Inteligente</h1>
          <p className="text-lg text-muted-foreground">
            Crie introduções, conclusões, bios profissionais e resumos com IA
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tipo de Texto</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(TEXT_TYPES).map(([key, type]) => (
                  <button
                    key={key}
                    onClick={() => setTextType(key)}
                    className={`p-4 rounded-lg border-2 transition text-left ${
                      textType === key ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="font-semibold">{type.name}</p>
                    <p className="text-xs text-muted-foreground">{type.description}</p>
                  </button>
                ))}
              </CardContent>
            </Card>

            {textType && (
              <Card>
                <CardHeader>
                  <CardTitle>Detalhes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Assunto principal" value={topic} onChange={(e) => setTopic(e.target.value)} />

                  <Input
                    placeholder="Palavras-chave (opcional)"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />

                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TONE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Textarea
                    placeholder="Contexto adicional (opcional)"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    rows={3}
                  />

                  <Button
                    onClick={generateText}
                    disabled={loading}
                    className="w-full h-12 bg-primary hover:bg-primary/90 gap-2"
                  >
                    <Sparkles className="h-5 w-5" />
                    {loading ? "Gerando..." : "Gerar Texto com IA"}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Preview */}
          <div>
            {generated && (
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Resultado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white dark:bg-card p-4 rounded border border-border max-h-96 overflow-y-auto text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                    {generated}
                  </div>
                  <Button onClick={copyToClipboard} variant="outline" className="w-full gap-2 bg-transparent">
                    <Copy className="h-4 w-4" />
                    Copiar
                  </Button>
                </CardContent>
              </Card>
            )}

            {!generated && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Instruções</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>1. Escolha o tipo de texto</p>
                  <p>2. Insira o assunto principal</p>
                  <p>3. Selecione o tom</p>
                  <p>4. Clique em "Gerar"</p>
                  <p>5. Copie o texto gerado</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
