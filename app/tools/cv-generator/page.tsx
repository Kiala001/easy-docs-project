"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, X, Download, Copy, Sparkles } from "lucide-react"
import Link from "next/link"

const CV_TEMPLATES = [
  {
    id: "modern",
    name: "Moderno",
    description: "Design limpo e contemporâneo",
    colors: "bg-gradient-to-r from-blue-600 to-blue-800",
  },
  {
    id: "professional",
    name: "Profissional",
    description: "Clássico e formal",
    colors: "bg-gradient-to-r from-gray-800 to-gray-900",
  },
  {
    id: "creative",
    name: "Criativo",
    description: "Com toque artístico",
    colors: "bg-gradient-to-r from-purple-600 to-pink-600",
  },
  {
    id: "minimal",
    name: "Minimalista",
    description: "Simples e elegante",
    colors: "bg-white border-2 border-gray-900",
  },
]

interface CVData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    linkedIn: string
    website: string
  }
  summary: string
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    graduationDate: string
  }>
  skills: string[]
  certifications: Array<{
    id: string
    name: string
    issuer: string
    date: string
  }>
}

export default function CVGeneratorPage() {
  const [template, setTemplate] = useState("modern")
  const [cvData, setCVData] = useState<CVData>({
    personalInfo: {
      fullName: "João Silva",
      email: "joao@example.com",
      phone: "(11) 98765-4321",
      location: "São Paulo, SP",
      linkedIn: "linkedin.com/in/joaosilva",
      website: "joaosilva.com",
    },
    summary:
      "Profissional com 5+ anos de experiência em desenvolvimento de software, especializado em arquitetura de sistemas e liderança de equipes.",
    experience: [
      {
        id: "1",
        company: "Tech Company",
        position: "Desenvolvedor Senior",
        startDate: "2021",
        endDate: "Atual",
        description: "Liderança de projetos, mentoria de juniors e arquitetura de sistemas",
      },
    ],
    education: [
      {
        id: "1",
        institution: "Universidade XYZ",
        degree: "Bacharel",
        field: "Ciência da Computação",
        graduationDate: "2019",
      },
    ],
    skills: ["React", "TypeScript", "Node.js", "AWS", "Docker"],
    certifications: [
      {
        id: "1",
        name: "AWS Solutions Architect",
        issuer: "Amazon",
        date: "2023",
      },
    ],
  })

  const addExperience = () => {
    setCVData({
      ...cvData,
      experience: [
        ...cvData.experience,
        { id: Date.now().toString(), company: "", position: "", startDate: "", endDate: "", description: "" },
      ],
    })
  }

  const removeExperience = (id: string) => {
    setCVData({
      ...cvData,
      experience: cvData.experience.filter((exp) => exp.id !== id),
    })
  }

  const addEducation = () => {
    setCVData({
      ...cvData,
      education: [
        ...cvData.education,
        { id: Date.now().toString(), institution: "", degree: "", field: "", graduationDate: "" },
      ],
    })
  }

  const removeEducation = (id: string) => {
    setCVData({
      ...cvData,
      education: cvData.education.filter((edu) => edu.id !== id),
    })
  }

  const addSkill = () => {
    const skill = prompt("Adicione uma competência:")
    if (skill) {
      setCVData({
        ...cvData,
        skills: [...cvData.skills, skill],
      })
    }
  }

  const removeSkill = (skill: string) => {
    setCVData({
      ...cvData,
      skills: cvData.skills.filter((s) => s !== skill),
    })
  }

  const downloadPDF = async () => {
    // Placeholder para download em PDF
    console.log("Baixando PDF do CV...")
  }

  const copyCVText = () => {
    // Placeholder para copiar texto
    console.log("CV copiado para área de transferência")
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Gerador de CV Profissional</h1>
              <p className="text-lg text-muted-foreground">Crie um currículo impressionante com templates modernos</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyCVText} className="gap-2 bg-transparent">
                <Copy className="h-4 w-4" />
                Copiar
              </Button>
              <Button size="sm" onClick={downloadPDF} className="gap-2">
                <Download className="h-4 w-4" />
                PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-secondary">
                <TabsTrigger value="personal">Pessoal</TabsTrigger>
                <TabsTrigger value="experience">Experiência</TabsTrigger>
                <TabsTrigger value="education">Educação</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="certifications">Certificados</TabsTrigger>
              </TabsList>

              {/* Personal Info Tab */}
              <TabsContent value="personal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Nome Completo"
                      value={cvData.personalInfo.fullName}
                      onChange={(e) =>
                        setCVData({
                          ...cvData,
                          personalInfo: { ...cvData.personalInfo, fullName: e.target.value },
                        })
                      }
                    />
                    <Input
                      placeholder="Email"
                      type="email"
                      value={cvData.personalInfo.email}
                      onChange={(e) =>
                        setCVData({
                          ...cvData,
                          personalInfo: { ...cvData.personalInfo, email: e.target.value },
                        })
                      }
                    />
                    <Input
                      placeholder="Telefone"
                      value={cvData.personalInfo.phone}
                      onChange={(e) =>
                        setCVData({
                          ...cvData,
                          personalInfo: { ...cvData.personalInfo, phone: e.target.value },
                        })
                      }
                    />
                    <Input
                      placeholder="Localização"
                      value={cvData.personalInfo.location}
                      onChange={(e) =>
                        setCVData({
                          ...cvData,
                          personalInfo: { ...cvData.personalInfo, location: e.target.value },
                        })
                      }
                    />
                    <Input
                      placeholder="LinkedIn (opcional)"
                      value={cvData.personalInfo.linkedIn}
                      onChange={(e) =>
                        setCVData({
                          ...cvData,
                          personalInfo: { ...cvData.personalInfo, linkedIn: e.target.value },
                        })
                      }
                    />
                    <Input
                      placeholder="Website (opcional)"
                      value={cvData.personalInfo.website}
                      onChange={(e) =>
                        setCVData({
                          ...cvData,
                          personalInfo: { ...cvData.personalInfo, website: e.target.value },
                        })
                      }
                    />
                    <Textarea
                      placeholder="Resumo profissional"
                      value={cvData.summary}
                      onChange={(e) => setCVData({ ...cvData, summary: e.target.value })}
                      rows={4}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience" className="space-y-4">
                {cvData.experience.map((exp) => (
                  <Card key={exp.id}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">Experiência Profissional</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input
                        placeholder="Empresa"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = cvData.experience.map((x) =>
                            x.id === exp.id ? { ...x, company: e.target.value } : x,
                          )
                          setCVData({ ...cvData, experience: updated })
                        }}
                      />
                      <Input
                        placeholder="Cargo"
                        value={exp.position}
                        onChange={(e) => {
                          const updated = cvData.experience.map((x) =>
                            x.id === exp.id ? { ...x, position: e.target.value } : x,
                          )
                          setCVData({ ...cvData, experience: updated })
                        }}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Data de Início"
                          value={exp.startDate}
                          onChange={(e) => {
                            const updated = cvData.experience.map((x) =>
                              x.id === exp.id ? { ...x, startDate: e.target.value } : x,
                            )
                            setCVData({ ...cvData, experience: updated })
                          }}
                        />
                        <Input
                          placeholder="Data de Fim"
                          value={exp.endDate}
                          onChange={(e) => {
                            const updated = cvData.experience.map((x) =>
                              x.id === exp.id ? { ...x, endDate: e.target.value } : x,
                            )
                            setCVData({ ...cvData, experience: updated })
                          }}
                        />
                      </div>
                      <Textarea
                        placeholder="Descrição das responsabilidades"
                        value={exp.description}
                        onChange={(e) => {
                          const updated = cvData.experience.map((x) =>
                            x.id === exp.id ? { ...x, description: e.target.value } : x,
                          )
                          setCVData({ ...cvData, experience: updated })
                        }}
                        rows={3}
                      />
                    </CardContent>
                  </Card>
                ))}
                <Button onClick={addExperience} variant="outline" className="w-full gap-2 bg-transparent">
                  <Plus className="h-4 w-4" />
                  Adicionar Experiência
                </Button>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education" className="space-y-4">
                {cvData.education.map((edu) => (
                  <Card key={edu.id}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">Educação</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input
                        placeholder="Instituição"
                        value={edu.institution}
                        onChange={(e) => {
                          const updated = cvData.education.map((x) =>
                            x.id === edu.id ? { ...x, institution: e.target.value } : x,
                          )
                          setCVData({ ...cvData, education: updated })
                        }}
                      />
                      <Input
                        placeholder="Grau (Bacharel, Mestrado, etc)"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = cvData.education.map((x) =>
                            x.id === edu.id ? { ...x, degree: e.target.value } : x,
                          )
                          setCVData({ ...cvData, education: updated })
                        }}
                      />
                      <Input
                        placeholder="Campo de Estudo"
                        value={edu.field}
                        onChange={(e) => {
                          const updated = cvData.education.map((x) =>
                            x.id === edu.id ? { ...x, field: e.target.value } : x,
                          )
                          setCVData({ ...cvData, education: updated })
                        }}
                      />
                      <Input
                        placeholder="Data de Conclusão"
                        value={edu.graduationDate}
                        onChange={(e) => {
                          const updated = cvData.education.map((x) =>
                            x.id === edu.id ? { ...x, graduationDate: e.target.value } : x,
                          )
                          setCVData({ ...cvData, education: updated })
                        }}
                      />
                    </CardContent>
                  </Card>
                ))}
                <Button onClick={addEducation} variant="outline" className="w-full gap-2 bg-transparent">
                  <Plus className="h-4 w-4" />
                  Adicionar Educação
                </Button>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Competências</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {cvData.skills.map((skill) => (
                        <div
                          key={skill}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                        >
                          {skill}
                          <button onClick={() => removeSkill(skill)} className="hover:text-primary/70 transition">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <Button onClick={addSkill} variant="outline" className="w-full gap-2 bg-transparent">
                      <Plus className="h-4 w-4" />
                      Adicionar Competência
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Certifications Tab */}
              <TabsContent value="certifications" className="space-y-4">
                {cvData.certifications.map((cert) => (
                  <Card key={cert.id}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">Certificação</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setCVData({
                            ...cvData,
                            certifications: cvData.certifications.filter((c) => c.id !== cert.id),
                          })
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input
                        placeholder="Nome da Certificação"
                        value={cert.name}
                        onChange={(e) => {
                          const updated = cvData.certifications.map((x) =>
                            x.id === cert.id ? { ...x, name: e.target.value } : x,
                          )
                          setCVData({ ...cvData, certifications: updated })
                        }}
                      />
                      <Input
                        placeholder="Emissor"
                        value={cert.issuer}
                        onChange={(e) => {
                          const updated = cvData.certifications.map((x) =>
                            x.id === cert.id ? { ...x, issuer: e.target.value } : x,
                          )
                          setCVData({ ...cvData, certifications: updated })
                        }}
                      />
                      <Input
                        placeholder="Data"
                        value={cert.date}
                        onChange={(e) => {
                          const updated = cvData.certifications.map((x) =>
                            x.id === cert.id ? { ...x, date: e.target.value } : x,
                          )
                          setCVData({ ...cvData, certifications: updated })
                        }}
                      />
                    </CardContent>
                  </Card>
                ))}
                <Button
                  onClick={() => {
                    setCVData({
                      ...cvData,
                      certifications: [
                        ...cvData.certifications,
                        { id: Date.now().toString(), name: "", issuer: "", date: "" },
                      ],
                    })
                  }}
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Certificação
                </Button>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Selecione um Template</h3>
              <div className="grid grid-cols-2 gap-4">
                {CV_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => setTemplate(tmpl.id)}
                    className={`p-4 rounded-lg border-2 transition ${
                      template === tmpl.id ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <div className={`h-24 rounded ${tmpl.colors} mb-2`} />
                    <p className="font-semibold text-sm">{tmpl.name}</p>
                    <p className="text-xs text-muted-foreground">{tmpl.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* CV Preview */}
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-lg">Pré-visualização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white dark:bg-card p-6 rounded-lg border border-border shadow-lg min-h-96">
                  <div className="mb-6 pb-4 border-b-2 border-primary">
                    <h2 className="text-2xl font-bold text-gray-900">{cvData.personalInfo.fullName}</h2>
                    <div className="text-sm text-gray-600 flex flex-wrap gap-2 mt-2">
                      {cvData.personalInfo.email && <span>{cvData.personalInfo.email}</span>}
                      {cvData.personalInfo.phone && <span>•</span>}
                      {cvData.personalInfo.phone && <span>{cvData.personalInfo.phone}</span>}
                    </div>
                  </div>

                  {cvData.summary && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">RESUMO PROFISSIONAL</h3>
                      <p className="text-xs text-gray-700 leading-relaxed">{cvData.summary}</p>
                    </div>
                  )}

                  {cvData.experience.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 text-sm mb-2">EXPERIÊNCIA</h3>
                      {cvData.experience.map((exp) => (
                        <div key={exp.id} className="mb-2 text-xs">
                          <p className="font-semibold text-gray-900">{exp.position}</p>
                          <p className="text-gray-600">{exp.company}</p>
                          <p className="text-gray-500">
                            {exp.startDate} - {exp.endDate}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {cvData.skills.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">COMPETÊNCIAS</h3>
                      <p className="text-xs text-gray-700">{cvData.skills.join(", ")}</p>
                    </div>
                  )}
                </div>

                <Button
                  className="w-full gap-2 bg-primary hover:bg-primary/90"
                  onClick={() => console.log("Usando template:", template)}
                >
                  <Sparkles className="h-4 w-4" />
                  Aplicar Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
