
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  data: any[];
  columns: string[];
}

export const KPICard = ({ title, data, columns }: KPICardProps) => {
  const calculateKPI = (column: string) => {
    const values = data.map(row => Number(row[column])).filter(val => !isNaN(val));
    if (values.length === 0) return { value: 0, trend: 0 };
    
    const sum = values.reduce((acc, val) => acc + val, 0);
    const avg = sum / values.length;
    const trend = Math.random() * 20 - 10; // Mock trend calculation
    
    return {
      value: column.toLowerCase().includes('count') || column.toLowerCase().includes('quantity') ? sum : avg,
      trend: trend
    };
  };

  const formatValue = (value: number, column: string) => {
    if (column.toLowerCase().includes('price') || column.toLowerCase().includes('revenue') || column.toLowerCase().includes('cost')) {
      return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    }
    if (column.toLowerCase().includes('percentage') || column.toLowerCase().includes('rate')) {
      return `${value.toFixed(1)}%`;
    }
    return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 2) return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (trend < -2) return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-slate-400" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 2) return 'text-green-400';
    if (trend < -2) return 'text-red-400';
    return 'text-slate-400';
  };

  return (
    <Card className="bg-slate-700 border-slate-600">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <div className="grid grid-cols-1 gap-4">
          {columns.slice(0, 4).map((column, index) => {
            const kpi = calculateKPI(column);
            return (
              <div key={index} className="bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300 font-medium">{column}</span>
                  {getTrendIcon(kpi.trend)}
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-white">
                    {formatValue(kpi.value, column)}
                  </span>
                  <span className={`text-sm font-medium ${getTrendColor(kpi.trend)}`}>
                    {kpi.trend > 0 ? '+' : ''}{kpi.trend.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
