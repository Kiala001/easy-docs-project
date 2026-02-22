import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 })
    }

    // Simular conversão (em produção, usar biblioteca como pdfkit ou similar)
    // Para MVP, retornamos um arquivo de exemplo
    const pdfContent = Buffer.from("Conversão de imagem para PDF - Implementar com pdfkit ou similar")

    return new NextResponse(pdfContent, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=documento.pdf",
      },
    })
  } catch (error) {
    console.error("Erro na conversão:", error)
    return NextResponse.json({ error: "Erro ao converter arquivo" }, { status: 500 })
  }
}
