import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

interface ProgressData {
  date: string
  score: number
}

export function CVVisualization({ progressHistory }: { progressHistory: ProgressData[] }) {
  const maxScore = 100
  const chartHeight = 200

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Progresso ao Longo do Tempo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-flex-end justify-between gap-2 h-64">
          {progressHistory.map((point, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t hover:opacity-80 transition"
                style={{
                  height: `${(point.score / maxScore) * chartHeight}px`,
                }}
              />
              <p className="text-xs text-muted-foreground text-center">{point.date}</p>
              <p className="text-sm font-bold text-primary">{point.score}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
