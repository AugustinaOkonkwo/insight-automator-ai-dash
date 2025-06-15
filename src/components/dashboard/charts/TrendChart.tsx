
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TrendChartProps {
  title: string;
  data: any[];
  xColumn: string;
  yColumn: string;
}

export const TrendChart = ({ title, data, xColumn, yColumn }: TrendChartProps) => {
  const chartData = data
    .filter(row => row[xColumn] && row[yColumn] !== undefined)
    .map(row => ({
      [xColumn]: row[xColumn],
      [yColumn]: Number(row[yColumn]) || 0
    }))
    .slice(0, 50); // Limit to 50 points for performance

  return (
    <Card className="bg-slate-700 border-slate-600">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis 
                dataKey={xColumn} 
                stroke="#94a3b8"
                fontSize={12}
              />
              <YAxis 
                stroke="#94a3b8"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#334155',
                  border: '1px solid #475569',
                  borderRadius: '6px',
                  color: '#f1f5f9'
                }}
              />
              <Line 
                type="monotone" 
                dataKey={yColumn} 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
