let width: number, height: number, gradient: CanvasGradient;

export default function homepageGradient(
  ctx: any,
  chartArea: any,
  color: string,
  colorTwo: string,
  colorThree: string
): CanvasGradient {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;

  width = chartWidth;
  height = chartHeight;

  gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

  gradient.addColorStop(0.35, colorTwo);
  gradient.addColorStop(0.64, color);
  gradient.addColorStop(0.01, colorThree);

  return gradient;
}
