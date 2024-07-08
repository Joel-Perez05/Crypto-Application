let width: number, height: number, gradient: any;
export default function getCoinGradient(
  ctx: any,
  chartArea: any,
  color: string,
  colorTwo: string
) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  width = chartWidth;
  height = chartHeight;
  gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
  gradient.addColorStop(0.2, colorTwo);
  gradient.addColorStop(0.8, color);

  return gradient;
}
