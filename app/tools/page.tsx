"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Zap, BarChart3, Paperclip, Brain, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ToolsPage() {
  const toolCategories = [
    {
      name: "Geradores de Documentos",
      description: "Crie documentos profissionais com IA e templates",
      color: "from-primary/10 to-primary/5",
      tools: [
        {
          title: "Gerador de CV Profissional",
          description: "Crie currículos com templates modernos e IA para conteúdo",
          icon: FileText,
          href: "/tools/cv-generator",
        },
        {
          title: "Gerador de Cartas",
          description: "Cartas formais, pessoais e comerciais com IA",
          icon: Paperclip,
          href: "/tools/letter-generator",
        },
        {
          title: "Gerador de Documentos Gerais",
          description: "Declarações, requerimentos, pedidos formais",
          icon: FileText,
          href: "/tools/document-generator",
        },
        {
          title: "Gerador de Textos com IA",
          description: "Introduções, conclusões, bios profissionais personalizadas",
          icon: Brain,
          href: "/tools/text-generator",
        },
      ],
    },
    {
      name: "Análise e Feedback",
      description: "Melhore seus documentos com análise inteligente",
      color: "from-accent/10 to-accent/5",
      tools: [
        {
          title: "Feedback de CV Rigoroso",
          description: "Análise profunda baseada em sistemas de recrutamento (ATS)",
          icon: BarChart3,
          href: "/tools/cv-feedback",
        },
        {
          title: "Otimizador de Texto",
          description: "Melhore clareza, gramática e profissionalismo",
          icon: Zap,
          href: "/tools/text-optimizer",
        },
      ],
    },
    {
      name: "Conversores e Utilitários",
      description: "Converta e edite seus documentos",
      color: "from-blue-500/10 to-blue-500/5",
      tools: [
        {
          title: "Conversor de Documentos",
          description: "PDF ↔ Word, Comprimir, Mesclar, Extrair texto",
          icon: Download,
          href: "/tools/file-converter",
        },
        {
          title: "Editor de Texto",
          description: "Maiúsculas/minúsculas, contador de palavras, formatação",
          icon: FileText,
          href: "/tools/text-editor",
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <h1 className="text-4xl font-bold mb-2">Todas as Ferramentas</h1>
          <p className="text-lg text-muted-foreground">Selecione a ferramenta que você precisa</p>
        </div>
      </header>

      {/* Tools Grid */}
      <section className="container mx-auto px-4 sm:px-6 py-20">
        {toolCategories.map((category, idx) => (
          <div key={idx} className="mb-20">
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-2">{category.name}</h2>
              <p className="text-lg text-muted-foreground">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.tools.map((tool, toolIdx) => {
                const Icon = tool.icon
                return (
                  <Link key={toolIdx} href={tool.href}>
                    <Card className="h-full cursor-pointer hover:shadow-xl hover:border-primary/50 transition-all group">
                      <CardHeader>
                        <div
                          className={`h-12 w-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:shadow-lg transition`}
                        >
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
