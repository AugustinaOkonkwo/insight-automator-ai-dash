
import { Card } from '@/components/ui/card';
import { Lightbulb, Target, TrendingUp, Database } from 'lucide-react';
import { AnalysisResult } from '@/pages/Dashboard';

interface InsightsSummaryProps {
  analysisResult: AnalysisResult | null;
}

export const InsightsSummary = ({ analysisResult }: InsightsSummaryProps) => {
  if (!analysisResult) return null;

  const iconMap = {
    0: Database,
    1: TrendingUp,
    2: Target,
    3: Lightbulb,
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Lightbulb className="w-6 h-6 text-yellow-400 mr-3" />
          <h2 className="text-xl font-bold text-white">AI Insights & Recommendations</h2>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Summary</h3>
          <p className="text-slate-300 leading-relaxed">
            {analysisResult.summary}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysisResult.insights.map((insight, index) => {
              const IconComponent = iconMap[index as keyof typeof iconMap] || Database;
              return (
                <div key={index} className="flex items-start p-4 bg-slate-700 rounded-lg">
                  <IconComponent className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{insight}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Dashboard Components</h3>
          <div className="space-y-3">
            {analysisResult.recommendedCharts.map((chart, index) => (
              <div key={index} className="p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{chart.title}</h4>
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded uppercase">
                    {chart.type}
                  </span>
                </div>
                <p className="text-slate-300 text-sm mb-2">{chart.description}</p>
                <p className="text-slate-400 text-xs">
                  Columns: {chart.columns.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-2">Next Steps</h3>
          <ul className="text-slate-300 text-sm space-y-1 list-disc list-inside">
            <li>Review the generated dashboard for accuracy and relevance</li>
            <li>Download the HTML prototype for offline viewing</li>
            <li>Consider adding more specific filters or drill-down capabilities</li>
            <li>Share insights with stakeholders for feedback and validation</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
