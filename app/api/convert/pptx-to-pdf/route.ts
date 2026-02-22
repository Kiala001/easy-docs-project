import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 })
    }

    // Simular conversão (em produção, usar libreoffice ou similar)
    const pdfContent = Buffer.from("Conversão de PPTX para PDF - Implementar com libreoffice")

    return new NextResponse(pdfContent, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=apresentacao.pdf",
      },
    })
  } catch (error) {
    console.error("Erro na conversão:", error)
    return NextResponse.json({ error: "Erro ao converter arquivo" }, { status: 500 })
  }
}
