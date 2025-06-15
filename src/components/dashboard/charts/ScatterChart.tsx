
import { Card } from '@/components/ui/card';
import { ScatterChart as RechartsScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ScatterChartProps {
  title: string;
  data: any[];
  xColumn: string;
  yColumn: string;
}

export const ScatterChart = ({ title, data, xColumn, yColumn }: ScatterChartProps) => {
  const chartData = data
    .filter(row => {
      const x = Number(row[xColumn]);
      const y = Number(row[yColumn]);
      return !isNaN(x) && !isNaN(y);
    })
    .map(row => ({
      [xColumn]: Number(row[xColumn]),
      [yColumn]: Number(row[yColumn])
    }))
    .slice(0, 200); // Limit to 200 points for performance

  return (
    <Card className="bg-slate-700 border-slate-600">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsScatterChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis 
                type="number"
                dataKey={xColumn} 
                stroke="#94a3b8"
                fontSize={12}
                name={xColumn}
              />
              <YAxis 
                type="number"
                dataKey={yColumn}
                stroke="#94a3b8"
                fontSize={12}
                name={yColumn}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#334155',
                  border: '1px solid #475569',
                  borderRadius: '6px',
                  color: '#f1f5f9'
                }}
                formatter={(value: any, name: string) => [value, name]}
              />
              <Scatter 
                dataKey={yColumn} 
                fill="#3b82f6"
                fillOpacity={0.7}
              />
            </RechartsScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
