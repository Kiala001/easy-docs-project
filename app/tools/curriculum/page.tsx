"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CurriculumGenerator() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    profession: "",
    experience: "",
    education: "",
    skills: "",
  })

  const [tone, setTone] = useState("profissional")
  const [generated, setGenerated] = useState("")

  const generateCurriculum = () => {
    const curriculum = `
${formData.fullName}
Email: ${formData.email} | Telefone: ${formData.phone}

OBJETIVO PROFISSIONAL
${formData.profession}

EXPERIÊNCIA PROFISSIONAL
${formData.experience || "Experiência profissional não informada"}

FORMAÇÃO ACADÊMICA
${formData.education || "Formação acadêmica não informada"}

COMPETÊNCIAS
${formData.skills || "Competências não informadas"}

---
Currículo gerado por EasyDocs
    `.trim()

    setGenerated(curriculum)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated)
  }

  const downloadPDF = () => {
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(generated))
    element.setAttribute("download", `curriculo_${formData.fullName || "sem_nome"}.txt`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Gerador de Currículo</h1>
          <p className="text-muted-foreground">Crie um currículo profissional em minutos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Nome Completo</label>
                <Input
                  placeholder="João Silva Santos"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                <Input
                  type="email"
                  placeholder="joao@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Telefone</label>
                <Input
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Objetivo Profissional</label>
                <Textarea
                  placeholder="Ex: Analista de sistemas com foco em desenvolvimento web..."
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  className="min-h-24"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Experiência Profissional</label>
                <Textarea
                  placeholder="Ex: 2020-2023 - Desenvolvedor Senior na Empresa X..."
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="min-h-24"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Formação Acadêmica</label>
                <Textarea
                  placeholder="Ex: Bacharel em Ciência da Computação - USP (2020)"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="min-h-20"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Competências</label>
                <Textarea
                  placeholder="Ex: Java, Python, JavaScript, React, SQL..."
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="min-h-20"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Tom</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="profissional">Profissional</option>
                  <option value="criativo">Criativo</option>
                  <option value="simples">Simples</option>
                </select>
              </div>

              <Button onClick={generateCurriculum} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Gerar Currículo
              </Button>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Visualização</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {generated ? (
                <>
                  <div className="bg-muted p-6 rounded-lg border border-border whitespace-pre-wrap text-sm font-mono">
                    {generated}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={copyToClipboard}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar
                    </Button>
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={downloadPDF}>
                      <Download className="mr-2 h-4 w-4" />
                      Baixar
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Preencha os campos à esquerda e clique em "Gerar Currículo"</p>
                  <p className="text-xs mt-2">Seu currículo aparecerá aqui</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
