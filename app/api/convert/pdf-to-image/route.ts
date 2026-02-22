import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 })
    }

    // Simular conversão (em produção, usar pdf-lib ou similar)
    const imageContent = Buffer.from("Conversão de PDF para imagem - Implementar com pdf-lib")

    return new NextResponse(imageContent, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": "attachment; filename=imagem.png",
      },
    })
  } catch (error) {
    console.error("Erro na conversão:", error)
    return NextResponse.json({ error: "Erro ao converter arquivo" }, { status: 500 })
  }
}
