"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CVFeedbackData {
  overallScore: number
  atsScore: number
  readabilityScore: number
  impactScore: number
  sections: Record<
    string,
    {
      title: string
      score: number
      feedback: string
      suggestions: Array<{ suggestion: string; example: string; improvement: string }>
      strengths: string[]
    }
  >
  criticalIssues: string[]
  recommendations: string[]
}

export function CVAnalysisReport({ feedback }: { feedback: CVFeedbackData }) {
  const generatePDF = () => {
    alert("Gerando PDF com análise completa...")
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Relatório Detalhado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Seu relatório completo com análise profunda, sugestões actionáveis e comparativo antes/depois
          </p>
          <Button onClick={generatePDF} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Gerar PDF Completo
          </Button>
        </CardContent>
      </Card>

      {/* Summary Section */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Executivo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Score Geral", value: feedback.overallScore },
              { label: "ATS", value: feedback.atsScore },
              { label: "Legibilidade", value: feedback.readabilityScore },
              { label: "Impacto", value: feedback.impactScore },
            ].map((metric, idx) => (
              <div key={idx} className="p-3 bg-secondary/40 rounded-lg text-center">
                <p className="text-2xl font-bold text-primary mb-1">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-3">Análise por Seção</h3>
            <div className="space-y-3">
              {Object.values(feedback.sections).map((section, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{section.title}</p>
                    <p className="text-sm font-bold text-primary">{section.score}/100</p>
                  </div>
                  <Progress value={section.score} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
