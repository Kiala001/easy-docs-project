"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, FileText, Zap, CheckCircle2, ArrowRight, Cpu, Crown } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const features = [
    {
      icon: Sparkles,
      title: "Gerador de Documentos com IA",
      description: "Crie cartas formais, currículos, declarações e requerimentos em segundos com IA integrada",
      href: "/tools/document-generator",
    },
    {
      icon: FileText,
      title: "Feedback Rigoroso de CV",
      description: "Análise profunda do seu currículo com sugestões baseadas em sistemas de recrutamento (ATS)",
      href: "/tools/cv-feedback",
    },
    {
      icon: Zap,
      title: "Conversor de Documentos",
      description: "PDF ↔ Word, Comprimir, Mesclar, Extrair texto. Todos os formatos que você precisa",
      href: "/tools/file-converter",
    },
    {
      icon: Cpu,
      title: "Gerador de Textos Inteligente",
      description: "Introduções, conclusões, bios profissionais. Personalizadas com IA para seu tom",
      href: "/tools/text-generator",
    },
  ]

  const stats = [
    { label: "Usuários Ativos", value: "50K+" },
    { label: "Documentos Criados", value: "500K+" },
    { label: "Templates Profissionais", value: "100+" },
    { label: "Tempo Economizado", value: "1M+ horas" },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                EasyDocs
              </span>
            </div>
            <nav className="hidden md:flex gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
                Recursos
              </a>
              <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition">
                Estatísticas
              </a>
            </nav>
            <Button asChild>
              <Link href="/tools">Começar Agora</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 mb-8">
          <Crown className="h-4 w-4 text-accent" />
          <span className="text-sm text-accent font-medium">AI-Powered Document Creation</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
          Crie Documentos
          <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Profissionais em Segundos
          </span>
        </h1>

        <p className="text-lg text-muted-foreground text-balance max-w-3xl mx-auto mb-8 leading-relaxed">
          EasyDocs é sua plataforma all-in-one para criar, converter e melhorar documentos profissionais. Com IA
          integrada, templates visuais e feedback rigoroso de CV.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
            <Link href="/tools">
              Explorar Ferramentas <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#features">Saber Mais</a>
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-accent" />
            <span>Sem cadastro necessário</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-accent" />
            <span>100% Gratuito</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-accent" />
            <span>IA de Última Geração</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Tudo que você precisa</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ferramentas poderosas para criar, converter e melhorar seus documentos profissionais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <Link key={idx} href={feature.href}>
                <Card className="h-full cursor-pointer hover:shadow-xl hover:border-primary/50 transition-all group">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="stats"
        className="container mx-auto px-4 sm:px-6 py-20 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-12">
          <h3 className="text-4xl font-bold mb-4">Pronto para começar?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Não é necessário cadastro. Acesse qualquer ferramenta e comece a criar documentos profissionais
            imediatamente.
          </p>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
            <Link href="/tools">Acessar Ferramentas</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 py-12 mt-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-bold">EasyDocs</span>
              </div>
              <p className="text-sm text-muted-foreground">Crie documentos profissionais com IA</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Gerador de CV
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Conversor de Documentos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Feedback de CV
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Guias
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Termos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contato
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 EasyDocs. Crie documentos profissionais com IA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
