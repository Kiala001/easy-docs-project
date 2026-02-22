"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Sparkles, Copy, Download } from "lucide-react"
import Link from "next/link"

const DOCUMENT_TYPES = {
  formal_letter: {
    name: "Carta Formal",
    description: "Cartas comerciais, profissionais e oficiais",
    subtypes: ["Comercial", "Pessoal", "Acadêmica", "Candidatura"],
  },
  declaration: {
    name: "Declaração",
    description: "Declarações de trabalho, escolar e pessoais",
    subtypes: ["Trabalho", "Escolar", "Pessoal", "Renda"],
  },
  request: {
    name: "Requerimento",
    description: "Pedidos formais e requerimentos administrativos",
    subtypes: ["Administrativo", "Bolsa", "Licença", "Documento"],
  },
  cover_letter: {
    name: "Carta de Apresentação",
    description: "Apresentação profissional para vagas de emprego",
    subtypes: ["Junior", "Pleno", "Senior", "Específica"],
  },
}

const TONE_OPTIONS = [
  { value: "formal", label: "Formal" },
  { value: "professional", label: "Profissional" },
  { value: "neutral", label: "Neutro" },
  { value: "friendly", label: "Amigável" },
]

interface DocumentData {
  type: string
  subtype: string
  senderName: string
  senderEmail: string
  senderPhone: string
  receiverName: string
  receiverPosition: string
  organization: string
  subject: string
  purpose: string
  tone: string
  additionalInfo: string
}

export default function DocumentGeneratorPage() {
  const [documentData, setDocumentData] = useState<DocumentData>({
    type: "",
    subtype: "",
    senderName: "João Silva",
    senderEmail: "joao@example.com",
    senderPhone: "(11) 98765-4321",
    receiverName: "Sr. Manager",
    receiverPosition: "Diretor",
    organization: "Empresa XYZ",
    subject: "Solicitação de Informação",
    purpose: "Solicitar informações sobre oportunidades de emprego",
    tone: "formal",
    additionalInfo: "",
  })

  const [generatedContent, setGeneratedContent] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGenerateWithAI = async () => {
    if (!documentData.type) {
      alert("Selecione um tipo de documento")
      return
    }

    setLoading(true)

    // Simula chamada à IA
    const mockContent = generateMockDocument()
    setTimeout(() => {
      setGeneratedContent(mockContent)
      setLoading(false)
    }, 1500)
  }

  const generateMockDocument = () => {
    const { senderName, organization, receiverName, purpose, tone } = documentData

    const templates: Record<string, string> = {
      formal_letter: `${senderName}
Email: ${documentData.senderEmail}
Telefone: ${documentData.senderPhone}

${new Date().toLocaleDateString("pt-BR")}

${receiverName}
${documentData.receiverPosition}
${organization}

Prezado(a) ${receiverName},

Venho por meio desta correspondência expressar meu interesse em ${purpose}. 

Como profissional com experiência comprovada na área, acredito ter as competências necessárias para contribuir de forma significativa com ${organization}.

Solicito a oportunidade de discutir como posso agregar valor à sua organização. Fico à disposição para uma reunião em momento conveniente.

Atenciosamente,

${senderName}`,

      declaration: `DECLARAÇÃO

Eu, ${senderName}, portador(a) da identidade RG: __________, inscrito(a) no CPF: __________, residente e domiciliado(a) na Rua: __________, nº ____, em ${documentData.organization}, DECLARO, sob as penas da lei, que:

${purpose}

Declaro ainda estar ciente das penalidades legais previstas em caso de declaração falsa.

Por ser verdade, firmo a presente declaração.

${new Date().toLocaleDateString("pt-BR")}

_______________________________
${senderName}`,

      request: `REQUERIMENTO

Ao Senhor(a) ${receiverName},
${documentData.receiverPosition} ${organization}

${senderName}, portador(a) do CPF nº __________, vem respeitosamente requerer:

${purpose}

Para tanto, segue em anexo toda documentação necessária para análise e parecer.

Certo(a) de contar com sua atenção, subscrevo-me.

Respeitosamente,

${new Date().toLocaleDateString("pt-BR")}

_______________________________
${senderName}`,

      cover_letter: `Prezado(a) ${receiverName},

Meu nome é ${senderName} e venho por este meio expressar meu interesse em ${purpose}.

Com ${tone === "formal" ? "sólida" : "ampla"} experiência em ${organization}, desenvolvi competências que me permitem contribuir efetivamente para sua equipe. Minha trajetória profissional demonstra comprometimento, inovação e dedicação à excelência.

Fico entusiasmado(a) com a possibilidade de discutir como posso agregar valor à sua organização.

Atenciosamente,

${senderName}
${documentData.senderEmail}
${documentData.senderPhone}`,
    }

    return templates[documentData.type] || "Documento não disponível"
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent)
    alert("Documento copiado para área de transferência!")
  }

  const downloadAsWord = () => {
    const element = document.createElement("a")
    const file = new Blob([generatedContent], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "documento.docx"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
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
          <h1 className="text-4xl font-bold mb-2">Gerador de Documentos com IA</h1>
          <p className="text-lg text-muted-foreground">
            Crie cartas formais, declarações, requerimentos e cartas de apresentação
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Document Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Tipo de Documento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(DOCUMENT_TYPES).map(([key, doc]) => (
                    <button
                      key={key}
                      onClick={() =>
                        setDocumentData({
                          ...documentData,
                          type: key,
                          subtype: doc.subtypes[0],
                        })
                      }
                      className={`p-4 rounded-lg border-2 transition text-left ${
                        documentData.type === key
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <p className="font-semibold">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">{doc.description}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {documentData.type && (
              <>
                {/* Subtype Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Subtipo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select
                      value={documentData.subtype}
                      onValueChange={(value) => setDocumentData({ ...documentData, subtype: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DOCUMENT_TYPES[documentData.type as keyof typeof DOCUMENT_TYPES]?.subtypes.map((subtype) => (
                          <SelectItem key={subtype} value={subtype}>
                            {subtype}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Sender Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informações do Remetente</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Nome Completo"
                      value={documentData.senderName}
                      onChange={(e) => setDocumentData({ ...documentData, senderName: e.target.value })}
                    />
                    <Input
                      placeholder="Email"
                      value={documentData.senderEmail}
                      onChange={(e) => setDocumentData({ ...documentData, senderEmail: e.target.value })}
                    />
                    <Input
                      placeholder="Telefone"
                      value={documentData.senderPhone}
                      onChange={(e) => setDocumentData({ ...documentData, senderPhone: e.target.value })}
                    />
                  </CardContent>
                </Card>

                {/* Recipient Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informações do Destinatário</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Nome do Destinatário"
                      value={documentData.receiverName}
                      onChange={(e) => setDocumentData({ ...documentData, receiverName: e.target.value })}
                    />
                    <Input
                      placeholder="Cargo/Posição"
                      value={documentData.receiverPosition}
                      onChange={(e) =>
                        setDocumentData({
                          ...documentData,
                          receiverPosition: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Organização/Empresa"
                      value={documentData.organization}
                      onChange={(e) => setDocumentData({ ...documentData, organization: e.target.value })}
                    />
                  </CardContent>
                </Card>

                {/* Content Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Detalhes do Documento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Assunto"
                      value={documentData.subject}
                      onChange={(e) => setDocumentData({ ...documentData, subject: e.target.value })}
                    />
                    <Textarea
                      placeholder="Objetivo principal do documento"
                      value={documentData.purpose}
                      onChange={(e) => setDocumentData({ ...documentData, purpose: e.target.value })}
                      rows={3}
                    />
                    <Select
                      value={documentData.tone}
                      onValueChange={(value) => setDocumentData({ ...documentData, tone: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Tom do documento" />
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
                      placeholder="Informações adicionais (opcional)"
                      value={documentData.additionalInfo}
                      onChange={(e) =>
                        setDocumentData({
                          ...documentData,
                          additionalInfo: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </CardContent>
                </Card>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerateWithAI}
                  disabled={loading}
                  className="w-full h-12 bg-primary hover:bg-primary/90 gap-2"
                >
                  <Sparkles className="h-5 w-5" />
                  {loading ? "Gerando..." : "Gerar com IA"}
                </Button>
              </>
            )}
          </div>

          {/* Preview */}
          <div className="lg:col-span-1">
            {generatedContent && (
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Pré-visualização</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white dark:bg-card p-4 rounded border border-border max-h-96 overflow-y-auto text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                    {generatedContent}
                  </div>
                  <div className="space-y-2">
                    <Button onClick={copyToClipboard} variant="outline" className="w-full gap-2 bg-transparent">
                      <Copy className="h-4 w-4" />
                      Copiar
                    </Button>
                    <Button onClick={downloadAsWord} className="w-full gap-2 bg-primary hover:bg-primary/90">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {!generatedContent && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Instruções</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>1. Selecione o tipo de documento</p>
                  <p>2. Escolha o subtipo</p>
                  <p>3. Preencha as informações</p>
                  <p>4. Clique em "Gerar com IA"</p>
                  <p>5. Copie ou baixe o resultado</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
