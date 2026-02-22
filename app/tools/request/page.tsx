"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RequestGenerator() {
  const [formData, setFormData] = useState({
    requesterName: "",
    requesterCPF: "",
    institution: "",
    requestDetails: "",
    date: new Date().toLocaleDateString("pt-BR"),
  })

  const [generated, setGenerated] = useState("")

  const generateRequest = () => {
    const request = `
REQUERIMENTO

Ao Excelentíssimo Senhor(a) Diretor(a) / Coordenador(a) da ${formData.institution}

${formData.requesterName}, portador(a) do CPF nº ${formData.requesterCPF}, vem, por este meio, respeitosamente requerer a V. Exa. que se digne atender ao presente pedido:

${formData.requestDetails}

Nestes termos, fica(m) protocolado(s) o(s) presente(s) requerimento(s), do qual(is) solicita(mos) a confirmação de recebimento e a devida análise no menor prazo possível.

Respeitosamente,

${new Date().toLocaleDateString("pt-BR")}

_____________________________
${formData.requesterName}
CPF: ${formData.requesterCPF}
    `.trim()

    setGenerated(request)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated)
  }

  const downloadFile = () => {
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(generated))
    element.setAttribute("download", `requerimento_${new Date().getTime()}.txt`)
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Gerador de Requerimento</h1>
          <p className="text-muted-foreground">Crie requerimentos oficiais para instituições</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Dados do Requerimento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Seu Nome</label>
                <Input
                  placeholder="João Silva Santos"
                  value={formData.requesterName}
                  onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">CPF</label>
                <Input
                  placeholder="123.456.789-00"
                  value={formData.requesterCPF}
                  onChange={(e) => setFormData({ ...formData, requesterCPF: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Instituição</label>
                <Input
                  placeholder="Universidade/Empresa/Órgão Público"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Detalhes do Pedido</label>
                <Textarea
                  placeholder="Descreva o que você está solicitando..."
                  value={formData.requestDetails}
                  onChange={(e) => setFormData({ ...formData, requestDetails: e.target.value })}
                  className="min-h-32"
                />
              </div>

              <Button onClick={generateRequest} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Gerar Requerimento
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
                  <p>Preencha os campos à esquerda e clique em "Gerar Requerimento"</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
