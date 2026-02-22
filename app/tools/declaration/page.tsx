"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DeclarationGenerator() {
  const [formData, setFormData] = useState({
    declarantName: "",
    declarantCPF: "",
    declarantProfession: "",
    declarantAddress: "",
    declarationType: "trabalho",
    content: "",
    date: new Date().toLocaleDateString("pt-BR"),
  })

  const [generated, setGenerated] = useState("")

  const declarationTemplates = {
    trabalho: "Declaro, para os devidos fins, que ",
    escolar: "Declaro, para fins de comprovação junto às instituições competentes, que ",
    simples: "Declaro que ",
  }

  const generateDeclaration = () => {
    const declaration = `
DECLARAÇÃO

Eu, ${formData.declarantName}, portador(a) do CPF nº ${formData.declarantCPF}, profissão ${formData.declarantProfession}, residente na ${formData.declarantAddress}, por meio desta DECLARO:

${declarationTemplates[formData.declarationType]}${formData.content}

Por ser verdade, firmo a presente declaração.

${formData.date}

_____________________________
${formData.declarantName}
CPF: ${formData.declarantCPF}
    `.trim()

    setGenerated(declaration)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated)
  }

  const downloadFile = () => {
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(generated))
    element.setAttribute("download", `declaracao_${new Date().getTime()}.txt`)
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Gerador de Declaração</h1>
          <p className="text-muted-foreground">Crie declarações simples e profissionais</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Dados da Declaração</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Nome Completo</label>
                <Input
                  placeholder="João Silva Santos"
                  value={formData.declarantName}
                  onChange={(e) => setFormData({ ...formData, declarantName: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">CPF</label>
                <Input
                  placeholder="123.456.789-00"
                  value={formData.declarantCPF}
                  onChange={(e) => setFormData({ ...formData, declarantCPF: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Profissão</label>
                <Input
                  placeholder="Analista de Sistemas"
                  value={formData.declarantProfession}
                  onChange={(e) => setFormData({ ...formData, declarantProfession: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Endereço</label>
                <Input
                  placeholder="Rua das Flores, 123, São Paulo - SP"
                  value={formData.declarantAddress}
                  onChange={(e) => setFormData({ ...formData, declarantAddress: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Tipo de Declaração</label>
                <select
                  value={formData.declarationType}
                  onChange={(e) => setFormData({ ...formData, declarationType: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="trabalho">Declaração de Trabalho</option>
                  <option value="escolar">Declaração Escolar</option>
                  <option value="simples">Declaração Simples</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Conteúdo da Declaração</label>
                <Textarea
                  placeholder="Descreva o que está sendo declarado..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="min-h-32"
                />
              </div>

              <Button onClick={generateDeclaration} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Gerar Declaração
              </Button>
            </CardContent>
          </Card>

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
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={downloadFile}>
                      <Download className="mr-2 h-4 w-4" />
                      Baixar
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Preencha os campos à esquerda e clique em "Gerar Declaração"</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
