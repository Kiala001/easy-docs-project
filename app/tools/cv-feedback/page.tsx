"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  FileUp,
  Download,
  Star,
  Zap,
  Target,
  Eye,
  Award,
  Flame,
  LinkIcon,
} from "lucide-react"
import Link from "next/link"
import { CVAnalysisReport } from "@/components/cv-feedback/analysis-report"
import { CVComparison } from "@/components/cv-feedback/cv-comparison"

interface SuggestionWithExample {
  suggestion: string
  example: string
  improvement: string
}

interface SectionAnalysis {
  title: string
  score: number
  feedback: string
  suggestions: SuggestionWithExample[]
  strengths: string[]
  atsScore: number
  missingKeywords: string[]
  inlineIssues: Array<{
    text: string
    type: "error" | "warning" | "suggestion"
    message: string
  }>
}

interface CVFeedbackData {
  overallScore: number
  atsScore: number
  readabilityScore: number
  impactScore: number
  sections: {
    header: SectionAnalysis
    summary: SectionAnalysis
    experience: SectionAnalysis
    education: SectionAnalysis
    skills: SectionAnalysis
    certifications: SectionAnalysis
  }
  criticalIssues: string[]
  recommendations: string[]
  suggestedKeywords: string[]
  comparativeAnalysis: {
    original: string
    optimized: string
  }
  progressHistory: Array<{
    date: string
    score: number
  }>
  gamification: {
    level: number
    nextMilestone: number
    completeness: number
    readyToSend: boolean
  }
}

export default function CVFeedbackPage() {
  const [cvText, setCVText] = useState("")
  const [feedback, setFeedback] = useState<CVFeedbackData | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploadMode, setUploadMode] = useState(true)
  const [activeTab, setActiveTab] = useState<"overview" | "detailed" | "comparison" | "report">("overview")
  const [jobRole, setJobRole] = useState("")
  const [sector, setSector] = useState("")
  const [showComparison, setShowComparison] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mock data para feedback detalhado
  const mockFeedback: CVFeedbackData = {
    overallScore: 72,
    atsScore: 78,
    readabilityScore: 75,
    impactScore: 68,
    sections: {
      header: {
        title: "Cabeçalho e Dados Pessoais",
        score: 85,
        feedback: "Seu cabeçalho está bem organizado e profissional.",
        suggestions: [
          {
            suggestion: "Adicione um título profissional abaixo do nome",
            example: "João Silva - Desenvolvedor Full Stack",
            improvement: "Isso melhora a compatibilidade ATS e primeiro impacto",
          },
        ],
        strengths: ["Contato bem formatado", "LinkedIn incluído", "Sem informações desnecessárias (foto, idade)"],
        atsScore: 90,
        missingKeywords: [],
        inlineIssues: [],
      },
      summary: {
        title: "Resumo Profissional",
        score: 65,
        feedback: "Seu resumo profissional é genérico e não destaca seus diferenciais.",
        suggestions: [
          {
            suggestion: "Torne o resumo mais específico e impactante",
            example:
              "Desenvolvedor Full Stack com 5 anos de experiência em React e Node.js. Especialista em otimização de performance com histórico de redução de 40% em tempo de carregamento.",
            improvement: "Aumenta probabilidade de passar em filtragem ATS e capta atenção de recrutadores",
          },
          {
            suggestion: "Inclua métricas e resultados no resumo",
            example: "Liderou time de 3 desenvolvedores. Entregou 15+ projetos no prazo.",
            improvement: "Demonstra impacto concreto",
          },
        ],
        strengths: ["Usa primeira pessoa", "Menciona área de atuação"],
        atsScore: 72,
        missingKeywords: ["especialista", "liderança", "resultados", "métrica"],
        inlineIssues: [
          {
            text: "Profissional dedicado",
            type: "warning",
            message: "Muito genérico - especifique o que você faz",
          },
        ],
      },
      experience: {
        title: "Experiência Profissional",
        score: 70,
        feedback: "Suas experiências faltam resultados quantificáveis e detalhes de impacto.",
        suggestions: [
          {
            suggestion: "Adicione números em cada descrição de cargo",
            example:
              "Original: Desenvolvi aplicações web\nMelhorado: Desenvolvi 5 aplicações web, melhorando performance em 25% e reduzindo bugs em 60%",
            improvement: "Aumenta score ATS em 30% e captura melhor atenção",
          },
          {
            suggestion: "Destaque tecnologias específicas usadas",
            example: "Utilizei React, Node.js, PostgreSQL e AWS S3 em projetos de alta demanda",
            improvement: "Melhora compatibilidade com palavras-chave de vaga",
          },
        ],
        strengths: ["Ordem cronológica clara", "Datas bem formatadas"],
        atsScore: 75,
        missingKeywords: ["algoritmo", "arquitetura", "escalabilidade", "mentoria"],
        inlineIssues: [
          {
            text: "Responsável por várias tarefas",
            type: "suggestion",
            message: "Quantifique o resultado das tarefas (tempo, eficiência, etc)",
          },
          {
            text: "Participei de projetos",
            type: "warning",
            message: "Use verbos mais fortes: 'Liderado', 'Implementado', 'Otimizado'",
          },
        ],
      },
      education: {
        title: "Educação",
        score: 80,
        feedback: "Sua educação está bem apresentada. Considere adicionar cursos adicionais.",
        suggestions: [
          {
            suggestion: "Adicione GPA se for superior a 3.5",
            example: "Bacharel em Ciência da Computação - Universidade X (GPA: 3.8)",
            improvement: "Demonstra excelência acadêmica",
          },
        ],
        strengths: ["Formação relevante", "Instituições reconhecidas"],
        atsScore: 85,
        missingKeywords: ["bolsa", "honra", "distinção"],
        inlineIssues: [],
      },
      skills: {
        title: "Competências Técnicas",
        score: 68,
        feedback: "Suas competências técnicas estão presentes, mas faltam algumas keywords críticas para sua área.",
        suggestions: [
          {
            suggestion: "Organize skills em categorias com níveis",
            example: "Frontend: React (Avançado), Vue.js (Intermediário), HTML5 (Avançado)",
            improvement: "Melhora legibilidade e compatibilidade ATS",
          },
          {
            suggestion: "Inclua soft skills relevantes",
            example: "Liderança de Equipe, Gestão de Projetos Agile, Comunicação",
            improvement: "Diferencia você de outros candidatos técnicos",
          },
        ],
        strengths: ["Tecnologias modernas incluídas"],
        atsScore: 70,
        missingKeywords: ["DevOps", "CI/CD", "Docker", "Git", "Agile"],
        inlineIssues: [
          {
            text: "Microsoft Office",
            type: "suggestion",
            message: "Skills muito básicas - remova se possível ou deixe implícito",
          },
        ],
      },
      certifications: {
        title: "Certificações e Prêmios",
        score: 60,
        feedback: "Você não listou certificações. Se houver, isso melhoraria significativamente seu CV.",
        suggestions: [
          {
            suggestion: "Adicione certificações relevantes",
            example: "AWS Certified Developer Associate (2023)\nGoogle Cloud Certification (2022)",
            improvement: "Aumenta credibilidade e score ATS em até 15%",
          },
          {
            suggestion: "Inclua prêmios e reconhecimentos",
            example: "Eleito Funcionário do Mês (3x), Top Performer 2023",
            improvement: "Demonstra reconhecimento e destaque profissional",
          },
        ],
        strengths: [],
        atsScore: 40,
        missingKeywords: ["certificado", "especialização", "reconhecimento"],
        inlineIssues: [],
      },
    },
    criticalIssues: [
      "Resumo profissional é demasiado genérico - risco de ser filtrado automaticamente",
      "Faltam métricas quantificáveis nas descrições de experiência",
      "Nenhuma certificação listada (se houver, adicione immediately)",
      "Soft skills não estão explicitamente mencionadas",
    ],
    recommendations: [
      "1. CRÍTICA: Reescreva o resumo profissional com resultado específico (será analisado em primeiros 5s)",
      "2. ALTA: Adicione números em cada descrição de cargo (aumenta impacto em 40%)",
      "3. ALTA: Inclua certificações e prêmios se houver (diferencial competitivo)",
      "4. MÉDIA: Organize skills técnicas em categorias com níveis de proficiência",
      "5. MÉDIA: Adicione soft skills relevantes para sua área (liderança, comunicação)",
      "6. BAIXA: Considere adicionar seção de Projetos ou Portfólio com resultados mensuráveis",
    ],
    suggestedKeywords: [
      "Full Stack Developer",
      "React.js",
      "Node.js",
      "RESTful API",
      "PostgreSQL",
      "AWS",
      "Git",
      "Agile/Scrum",
      "Liderança",
      "Problem-Solving",
      "Comunicação",
      "Projeto",
    ],
    comparativeAnalysis: {
      original: `João Silva
      Profissional dedicado com experiência em desenvolvimento.
      
      EXPERIÊNCIA
      Desenvolvedor - Empresa X (2020-2023)
      Responsável por várias tarefas de desenvolvimento.
      
      EDUCAÇÃO
      Bacharel em Ciência da Computação - Universidade Y
      
      COMPETÊNCIAS
      JavaScript, React, Node.js, MongoDB, Git`,

      optimized: `João Silva - Desenvolvedor Full Stack Sênior
      
      RESUMO PROFISSIONAL
      Desenvolvedor Full Stack com 5+ anos de experiência em React e Node.js. Especialista em otimização de performance com histórico de redução de 40% em tempo de carregamento. Liderador de equipe ágil com foco em entregas de alta qualidade.
      
      EXPERIÊNCIA
      Senior Developer - Empresa X (2020-2023)
      • Desenvolveu 5 aplicações web, melhorando performance em 25% e reduzindo bugs em 60%
      • Liderou equipe de 3 desenvolvedores em implementação de arquitetura de microserviços
      • Implementou CI/CD pipeline reduzindo tempo de deploy em 80%
      • Mentorou 2 desenvolvedores juniores com foco em React e Node.js
      
      EDUCAÇÃO
      Bacharel em Ciência da Computação - Universidade Y (Honra: Cum Laude)
      
      COMPETÊNCIAS TÉCNICAS
      Frontend: React (Avançado), Vue.js (Intermediário), HTML5/CSS3 (Avançado)
      Backend: Node.js (Avançado), PostgreSQL (Avançado), MongoDB (Intermediário)
      DevOps: AWS (Avançado), Docker (Intermediário), Git (Avançado), CI/CD (Intermediário)
      Soft Skills: Liderança de Equipe, Gestão Ágil, Comunicação, Problem-Solving
      
      CERTIFICAÇÕES
      AWS Certified Developer Associate (2023)
      Certified Scrum Master (2022)`,
    },
    progressHistory: [
      { date: "Hoje", score: 72 },
      { date: "-7 dias", score: 68 },
      { date: "-14 dias", score: 65 },
      { date: "-21 dias", score: 60 },
    ],
    gamification: {
      level: 3,
      nextMilestone: 85,
      completeness: 88,
      readyToSend: false,
    },
  }

  const handleAnalyze = async () => {
    if (!cvText.trim()) {
      alert("Por favor, insira o texto do seu CV")
      return
    }

    setLoading(true)
    // Simula análise com IA
    setTimeout(() => {
      setFeedback(mockFeedback)
      setLoading(false)
    }, 2000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Simula leitura de arquivo
      setCVText("CV extraído do arquivo...")
      setUploadMode(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400"
    if (score >= 60) return "text-amber-600 dark:text-amber-400"
    return "text-red-600 dark:text-red-400"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-500/20 border-green-200 dark:border-green-800"
    if (score >= 60) return "bg-amber-500/20 border-amber-200 dark:border-amber-800"
    return "bg-red-500/20 border-red-200 dark:border-red-800"
  }

  const downloadReport = () => {
    if (!feedback) return
    // Simula download de relatório PDF
    alert("Gerando relatório PDF...")
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
          <div>
            <h1 className="text-4xl font-bold mb-2">Feedback Rigoroso de CV com IA</h1>
            <p className="text-lg text-muted-foreground">
              Análise profunda baseada em sistemas de recrutamento (ATS), impacto e compatibilidade com vagas
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        {!feedback ? (
          // Initial view: Input and instructions
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{uploadMode ? "Enviar CV" : "Colar Texto do CV"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {uploadMode ? (
                    <div>
                      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FileUp className="h-12 w-12 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Clique para enviar ou arraste seu PDF/Word</p>
                          <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX (máx. 10MB)</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          ref={fileInputRef}
                        />
                      </label>
                      <Button
                        variant="outline"
                        className="w-full mt-4 bg-transparent"
                        onClick={() => setUploadMode(false)}
                      >
                        Ou colar texto do CV
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Cole aqui o texto completo do seu CV..."
                        value={cvText}
                        onChange={(e) => setCVText(e.target.value)}
                        rows={12}
                        className="resize-none"
                      />
                      <div className="text-sm text-muted-foreground">{cvText.length} caracteres</div>
                      <Button variant="outline" className="w-full bg-transparent" onClick={() => setUploadMode(true)}>
                        Voltar ao upload
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Personalization Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Contexto da Vaga (Opcional)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Cargo Desejado</label>
                    <input
                      type="text"
                      placeholder="Ex: Desenvolvedor React Sênior"
                      value={jobRole}
                      onChange={(e) => setJobRole(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Setor/Indústria</label>
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    >
                      <option value="">Selecione um setor...</option>
                      <option value="tech">Tecnologia</option>
                      <option value="finance">Finanças</option>
                      <option value="marketing">Marketing</option>
                      <option value="education">Educação</option>
                      <option value="healthcare">Saúde</option>
                      <option value="other">Outro</option>
                    </select>
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    Essas informações ajudam a personalizar o feedback de palavras-chave e recomendações
                  </p>
                </CardContent>
              </Card>

              <Button
                onClick={handleAnalyze}
                disabled={loading || !cvText.trim()}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-lg font-semibold"
              >
                {loading ? "Analisando com IA..." : "Analisar com IA"}
              </Button>

              <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <TrendingUp className="h-5 w-5 text-primary" />O que será avaliado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      Estrutura de seções e formatação
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      Compatibilidade ATS (sistemas automáticos)
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      Resultados quantificáveis e impacto
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      Otimização de palavras-chave por vaga
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      Clareza, redação e impacto visual
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      Erros gramaticais e sugestões de melhoria
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle className="text-lg">Como Funciona</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold mb-1 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                        1
                      </span>
                      Envie seu CV
                    </p>
                    <p className="text-muted-foreground">Faça upload de PDF/Word ou cole o texto diretamente</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                        2
                      </span>
                      IA Avalia
                    </p>
                    <p className="text-muted-foreground">Análise em 6 dimensões + compatibilidade ATS</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                        3
                      </span>
                      Receba Feedback
                    </p>
                    <p className="text-muted-foreground">Sugestões acionáveis com exemplos antes/depois</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-800">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    Dica Premium
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-amber-900 dark:text-amber-100">
                    Forneça o cargo desejado para receber sugestões de palavras-chave específicas e feedback
                    personalizado!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Score Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card
                className={`border-2 ${getScoreBgColor(feedback.overallScore)} cursor-pointer hover:shadow-lg transition`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-muted-foreground">Score Geral</span>
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div className={`text-4xl font-bold ${getScoreColor(feedback.overallScore)}`}>
                    {feedback.overallScore}
                  </div>
                  <Progress value={feedback.overallScore} className="h-2 mt-3" />
                </CardContent>
              </Card>

              <Card
                className={`border-2 ${getScoreBgColor(feedback.atsScore)} cursor-pointer hover:shadow-lg transition`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-muted-foreground">Score ATS</span>
                    <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className={`text-4xl font-bold ${getScoreColor(feedback.atsScore)}`}>{feedback.atsScore}</div>
                  <Progress value={feedback.atsScore} className="h-2 mt-3" />
                </CardContent>
              </Card>

              <Card
                className={`border-2 ${getScoreBgColor(feedback.readabilityScore)} cursor-pointer hover:shadow-lg transition`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-muted-foreground">Legibilidade</span>
                    <Eye className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className={`text-4xl font-bold ${getScoreColor(feedback.readabilityScore)}`}>
                    {feedback.readabilityScore}
                  </div>
                  <Progress value={feedback.readabilityScore} className="h-2 mt-3" />
                </CardContent>
              </Card>

              <Card
                className={`border-2 ${getScoreBgColor(feedback.impactScore)} cursor-pointer hover:shadow-lg transition`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-muted-foreground">Impacto</span>
                    <Flame className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className={`text-4xl font-bold ${getScoreColor(feedback.impactScore)}`}>
                    {feedback.impactScore}
                  </div>
                  <Progress value={feedback.impactScore} className="h-2 mt-3" />
                </CardContent>
              </Card>
            </div>

            {/* Gamification Card */}
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Seu Progresso</p>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-4xl font-bold text-primary">Nível {feedback.gamification.level}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {feedback.gamification.completeness}% completo
                        </p>
                      </div>
                      <div className="flex-1">
                        <Progress value={feedback.gamification.completeness} className="h-3" />
                        <p className="text-xs text-muted-foreground mt-2">
                          Próximo nível: {feedback.gamification.nextMilestone} pontos
                        </p>
                      </div>
                    </div>
                  </div>
                  {feedback.gamification.readyToSend ? (
                    <div className="text-right">
                      <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                      <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-2">
                        Pronto para enviar!
                      </p>
                    </div>
                  ) : (
                    <div className="text-right">
                      <Star className="h-12 w-12 text-amber-600 dark:text-amber-400" />
                      <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mt-2">Quase lá!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tab Navigation */}
            <div className="flex gap-2 border-b border-border overflow-x-auto">
              {[
                { id: "overview", label: "Análise Rápida" },
                { id: "detailed", label: "Feedback Detalhado" },
                { id: "comparison", label: "Antes vs Depois" },
                { id: "report", label: "Relatório" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-3 font-semibold text-sm border-b-2 transition ${
                    activeTab === tab.id
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Critical Issues */}
                  {feedback.criticalIssues.length > 0 && (
                    <Card className="border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400 text-lg">
                          <AlertCircle className="h-5 w-5" />
                          Questões Críticas
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {feedback.criticalIssues.map((issue, idx) => (
                            <li key={idx} className="flex gap-3 text-sm">
                              <span className="font-bold text-red-600 dark:text-red-400 flex-shrink-0">!</span>
                              <span>{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Recomendações Priorizadas
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {feedback.recommendations.map((rec, idx) => (
                        <div key={idx} className="flex gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                            <span className="text-xs font-bold text-primary">{idx + 1}</span>
                          </div>
                          <p className="text-sm text-foreground">{rec}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Keywords Sidebar */}
                <div>
                  <Card className="sticky top-20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Palavras-chave Sugeridas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {feedback.suggestedKeywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium cursor-pointer hover:bg-primary/20 transition"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-4 italic">
                        Essas palavras-chave aumentam sua compatibilidade ATS. Considere adicioná-las ao seu CV.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "detailed" && (
              <div className="space-y-6">
                {Object.values(feedback.sections).map((section, idx) => (
                  <Card key={idx} className="border-l-4 border-l-primary">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <div className={`flex flex-col items-center gap-2`}>
                          <div
                            className={`text-3xl font-bold ${getScoreColor(section.score)} ${getScoreBgColor(section.score)} w-20 h-20 rounded-lg flex items-center justify-center border`}
                          >
                            {section.score}
                          </div>
                          <p className="text-xs text-muted-foreground">ATS: {section.atsScore}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Progress value={section.score} className="h-3" />
                      </div>

                      {section.feedback && (
                        <div className="bg-secondary/40 rounded-lg p-4">
                          <p className="text-sm text-foreground">{section.feedback}</p>
                        </div>
                      )}

                      {section.strengths.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-3">
                            Pontos Fortes
                          </h4>
                          <ul className="space-y-2">
                            {section.strengths.map((strength, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {section.suggestions.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-3">
                            Sugestões com Exemplos
                          </h4>
                          <ul className="space-y-4">
                            {section.suggestions.map((sug, idx) => (
                              <div
                                key={idx}
                                className="border-l-2 border-amber-300 dark:border-amber-700 pl-4 py-2 bg-amber-50/30 dark:bg-amber-950/20 rounded"
                              >
                                <p className="text-sm font-semibold text-foreground mb-2">{sug.suggestion}</p>
                                <div className="text-xs space-y-2">
                                  <div>
                                    <p className="text-muted-foreground font-semibold">Exemplo:</p>
                                    <p className="text-foreground italic mt-1 bg-background/50 p-2 rounded">
                                      "{sug.example}"
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground font-semibold">Por quê:</p>
                                    <p className="text-foreground mt-1">{sug.improvement}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </ul>
                        </div>
                      )}

                      {section.missingKeywords.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
                            Palavras-chave Faltando
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {section.missingKeywords.map((kw, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs font-medium"
                              >
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {section.inlineIssues.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                            Marcadores de Melhoria (Inline)
                          </h4>
                          <ul className="space-y-2">
                            {section.inlineIssues.map((issue, idx) => (
                              <li key={idx} className="flex gap-2 p-3 bg-secondary/40 rounded text-sm">
                                {issue.type === "error" && (
                                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                                )}
                                {issue.type === "warning" && (
                                  <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                )}
                                {issue.type === "suggestion" && (
                                  <Zap className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                )}
                                <div>
                                  <p className="font-semibold">"{issue.text}"</p>
                                  <p className="text-xs text-muted-foreground mt-1">{issue.message}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "comparison" && (
              <CVComparison
                original={feedback.comparativeAnalysis.original}
                optimized={feedback.comparativeAnalysis.optimized}
              />
            )}

            {activeTab === "report" && <CVAnalysisReport feedback={feedback} />}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button onClick={downloadReport} className="flex items-center gap-2 flex-1">
                <Download className="h-4 w-4" />
                Baixar Relatório PDF
              </Button>
              <Button variant="outline" className="flex items-center gap-2 flex-1 bg-transparent">
                <LinkIcon className="h-4 w-4" />
                Compartilhar Análise
              </Button>
              <Button
                onClick={() => {
                  setFeedback(null)
                  setCVText("")
                }}
                variant="outline"
                className="flex items-center gap-2 flex-1"
              >
                Analisar Outro CV
              </Button>
            </div>

            {/* Related Tools */}
            <Card>
              <CardHeader>
                <CardTitle>Próximos Passos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Com seu CV otimizado, use essas ferramentas para completar sua candidatura:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    href="/tools/document-generator"
                    className="p-3 border border-border rounded-lg hover:bg-secondary transition text-sm font-semibold flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Carta de Apresentação
                  </Link>
                  <Link
                    href="/tools/cv-generator"
                    className="p-3 border border-border rounded-lg hover:bg-secondary transition text-sm font-semibold flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Criar Novo CV
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}
