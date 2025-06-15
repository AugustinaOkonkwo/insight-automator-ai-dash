
import { Card } from '@/components/ui/card';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  title: string;
  data: any[];
  xColumn: string;
  yColumn: string;
}

export const BarChart = ({ title, data, xColumn, yColumn }: BarChartProps) => {
  // Group data by category and sum values
  const groupedData = data.reduce((acc, row) => {
    const category = row[xColumn];
    const value = Number(row[yColumn]) || 0;
    
    if (!acc[category]) {
      acc[category] = { [xColumn]: category, [yColumn]: 0, count: 0 };
    }
    acc[category][yColumn] += value;
    acc[category].count += 1;
    
    return acc;
  }, {} as any);

  const chartData = Object.values(groupedData)
    .sort((a: any, b: any) => b[yColumn] - a[yColumn])
    .slice(0, 15); // Limit to top 15 categories

  return (
    <Card className="bg-slate-700 border-slate-600">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis 
                dataKey={xColumn} 
                stroke="#94a3b8"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
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
              <Bar 
                dataKey={yColumn} 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
