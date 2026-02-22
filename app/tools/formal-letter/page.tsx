"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function FormalLetterGenerator() {
  const [formData, setFormData] = useState({
    senderName: "",
    senderAddress: "",
    recipientName: "",
    recipientPosition: "",
    institution: "",
    subject: "",
    body: "",
    date: new Date().toLocaleDateString("pt-BR"),
  })

  const [generated, setGenerated] = useState("")

  const generateLetter = () => {
    const letter = `
${formData.senderName}
${formData.senderAddress}

${formData.date}

Prezado Sr(a). ${formData.recipientName}
${formData.recipientPosition ? `Cargo: ${formData.recipientPosition}` : ""}
${formData.institution}

Assunto: ${formData.subject}

${formData.body}

Respeitosamente,

${formData.senderName}
    `.trim()

    setGenerated(letter)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated)
  }

  const downloadFile = () => {
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(generated))
    element.setAttribute("download", `carta_formal_${new Date().getTime()}.txt`)
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Gerador de Carta Formal</h1>
          <p className="text-muted-foreground">Crie cartas formais profissionais</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Dados da Carta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Seu Nome</label>
                <Input
                  placeholder="João Silva Santos"
                  value={formData.senderName}
                  onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Seu Endereço</label>
                <Input
                  placeholder="Rua das Flores, 123, São Paulo - SP"
                  value={formData.senderAddress}
                  onChange={(e) => setFormData({ ...formData, senderAddress: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Nome do Destinatário</label>
                <Input
                  placeholder="Maria da Silva"
                  value={formData.recipientName}
                  onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Cargo do Destinatário</label>
                <Input
                  placeholder="Gerente de Recursos Humanos"
                  value={formData.recipientPosition}
                  onChange={(e) => setFormData({ ...formData, recipientPosition: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Instituição</label>
                <Input
                  placeholder="Empresa ABC Ltda."
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Assunto</label>
                <Input
                  placeholder="Solicitação de Informações"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Corpo da Carta</label>
                <Textarea
                  placeholder="Descreva o conteúdo da sua carta..."
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  className="min-h-32"
                />
              </div>

              <Button onClick={generateLetter} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Gerar Carta
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
                  <p>Preencha os campos à esquerda e clique em "Gerar Carta"</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
