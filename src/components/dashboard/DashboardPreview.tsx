
import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import { DataFile, AnalysisResult } from '@/pages/Dashboard';
import { KPICard } from './charts/KPICard';
import { TrendChart } from './charts/TrendChart';
import { BarChart } from './charts/BarChart';
import { ScatterChart } from './charts/ScatterChart';
import { DataTable } from './charts/DataTable';

interface DashboardPreviewProps {
  file: DataFile | null;
  analysisResult: AnalysisResult | null;
  problemStatement: string;
}

export const DashboardPreview = ({ file, analysisResult, problemStatement }: DashboardPreviewProps) => {
  const processedData = useMemo(() => {
    if (!file) return null;
    
    // Process data for charts
    return file.data.map(row => {
      const processedRow: any = {};
      file.columns.forEach(col => {
        const value = row[col];
        // Try to convert to number if possible
        const numValue = Number(value);
        processedRow[col] = !isNaN(numValue) && value !== '' ? numValue : value;
      });
      return processedRow;
    });
  }, [file]);

  const renderChart = (chart: any, index: number) => {
    if (!file || !processedData) return null;

    switch (chart.type) {
      case 'kpi':
        return (
          <KPICard
            key={index}
            title={chart.title}
            data={processedData}
            columns={chart.columns}
          />
        );
      case 'line':
        return (
          <TrendChart
            key={index}
            title={chart.title}
            data={processedData}
            xColumn={chart.columns[0]}
            yColumn={chart.columns[1]}
          />
        );
      case 'bar':
        return (
          <BarChart
            key={index}
            title={chart.title}
            data={processedData}
            xColumn={chart.columns[0]}
            yColumn={chart.columns[1]}
          />
        );
      case 'scatter':
        return (
          <ScatterChart
            key={index}
            title={chart.title}
            data={processedData}
            xColumn={chart.columns[0]}
            yColumn={chart.columns[1]}
          />
        );
      case 'table':
        return (
          <DataTable
            key={index}
            title={chart.title}
            data={processedData}
            columns={chart.columns}
          />
        );
      default:
        return null;
    }
  };

  const handleDownload = () => {
    // Generate HTML content for download
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .dashboard { max-width: 1200px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 30px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="header">
            <h1>AI Generated Dashboard</h1>
            <p>Generated from: ${file?.name}</p>
            <p>Problem Statement: ${problemStatement}</p>
        </div>
        <div class="grid">
            <div class="card">
                <h3>Dashboard Preview</h3>
                <p>This is a static HTML export of your AI-generated dashboard.</p>
                <p>For interactive features, please use the live dashboard.</p>
            </div>
        </div>
    </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-generated-dashboard.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!analysisResult) return null;

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Dashboard Preview</h2>
              <p className="text-slate-300">
                Interactive dashboard generated based on your data and business requirements
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Eye className="w-4 h-4 mr-2" />
                Full Screen
              </Button>
              <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Download HTML
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {analysisResult.recommendedCharts.map((chart, index) => renderChart(chart, index))}
          </div>
        </div>
      </Card>
    </div>
  );
};
