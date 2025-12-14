import { LucideIcon } from "lucide-react";

interface LiveChartProps {
  title: string;
  unit: string;
  min: number;
  max: number;
  data: number[];
  icon?: LucideIcon;
  optimal?: string;
  warning?: string;
  labels?: string[];
}

/**
 * Renders a live chart of a given data.
 *
 * Uses the data to display the chart.
 */
export function LiveChart({
  title,
  unit,
  min,
  max,
  data,
  icon: Icon,
  optimal,
  warning,
  labels,
}: LiveChartProps) {
  const currentValue = data[data.length - 1].toFixed(1);
  const chartColor = "hsl(var(--primary))";

  // Calculate value positions for grid lines (5 equal divisions)
  const valuePositions = Array.from(
    { length: 5 },
    (_, i) => max - i * ((max - min) / 4)
  );

  // Generate ASCII-style wireframe chart
  const generateWireframeChart = () => {
    const height = 12;
    const width = 60;
    const chart: string[][] = Array(height).fill(null).map(() => Array(width).fill(' '));

    // Draw border
    for (let i = 0; i < width; i++) {
      chart[0][i] = '─';
      chart[height - 1][i] = '─';
    }
    for (let i = 0; i < height; i++) {
      chart[i][0] = '│';
      chart[i][width - 1] = '│';
    }
    chart[0][0] = '┌';
    chart[0][width - 1] = '┐';
    chart[height - 1][0] = '└';
    chart[height - 1][width - 1] = '┘';

    // Draw grid lines
    for (let row = 2; row < height - 1; row += 2) {
      for (let col = 1; col < width - 1; col++) {
        chart[row][col] = '·';
      }
    }

    // Draw data points
    const displayData = data.slice(-40); // Last 40 points
    displayData.forEach((value, index) => {
      const x = Math.floor(1 + (index / displayData.length) * (width - 2));
      const normalizedValue = (value - min) / (max - min);
      const y = Math.floor(height - 2 - normalizedValue * (height - 3));
      
      if (x >= 1 && x < width - 1 && y >= 1 && y < height - 1) {
        chart[y][x] = '█';
        
        // Connect dots with lines
        if (index > 0) {
          const prevX = Math.floor(1 + ((index - 1) / displayData.length) * (width - 2));
          const prevValue = displayData[index - 1];
          const prevNormalizedValue = (prevValue - min) / (max - min);
          const prevY = Math.floor(height - 2 - prevNormalizedValue * (height - 3));
          
          // Draw connecting line
          const steps = Math.max(Math.abs(x - prevX), Math.abs(y - prevY));
          for (let step = 0; step <= steps; step++) {
            const interpX = Math.floor(prevX + (x - prevX) * (step / steps));
            const interpY = Math.floor(prevY + (y - prevY) * (step / steps));
            if (interpX >= 1 && interpX < width - 1 && interpY >= 1 && interpY < height - 1) {
              if (chart[interpY][interpX] === ' ' || chart[interpY][interpX] === '·') {
                chart[interpY][interpX] = '▓';
              }
            }
          }
        }
      }
    });

    return chart.map(row => row.join('')).join('\n');
  };

  return (
    <div>
      <div className="flex justify-between mb-1">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-primary" />}
          <span className="font-mono">{title}</span>
        </div>
        <span className="font-mono font-bold">
          {currentValue}
          {unit}
        </span>
      </div>
      <div className="relative">
        <pre className="text-primary/80 text-[10px] leading-tight font-mono tracking-tighter whitespace-pre overflow-x-auto">
          {generateWireframeChart()}
        </pre>
        <div className="absolute top-0 right-2 bottom-0 flex flex-col justify-between pointer-events-none text-[9px] text-primary/60 font-mono">
          {(labels || valuePositions.map((v) => `${v.toFixed(0)}${unit}`)).map(
            (label, index) => (
              <span key={index}>{label}</span>
            )
          )}
        </div>
      </div>
      <div className="flex justify-between text-primary/70 mt-1 text-[9px] font-mono">
        <span>
          MIN: {min}
          {unit}
        </span>
        {optimal && <span>{optimal}</span>}
        {warning && <span className="text-amber-400">{warning}</span>}
      </div>
    </div>
  );
}
