
import { useState } from 'react';
import { MessageSquare, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { DataFile } from '@/pages/Dashboard';

interface ProblemStatementProps {
  onSubmit: (statement: string) => void;
  uploadedFile: DataFile | null;
}

export const ProblemStatement = ({ onSubmit, uploadedFile }: ProblemStatementProps) => {
  const [statement, setStatement] = useState('');

  const exampleStatements = [
    "I want to understand our sales performance across different regions and identify which products are driving the most revenue.",
    "Help me analyze customer behavior patterns to identify our most valuable customer segments and their purchasing trends.",
    "I need to track key performance indicators for our marketing campaigns and see which channels are most effective.",
    "Show me operational metrics that help identify bottlenecks in our supply chain and delivery performance.",
  ];

  const handleSubmit = () => {
    if (statement.trim()) {
      onSubmit(statement.trim());
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <div className="p-8">
        <div className="text-center mb-6">
          <MessageSquare className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Describe Your Business Problem</h2>
          <p className="text-slate-300">
            Tell the AI what business questions you want to answer with your data
          </p>
        </div>

        {uploadedFile && (
          <div className="mb-6 p-4 bg-slate-700 rounded-lg">
            <h3 className="text-white font-semibold mb-2">Data Overview:</h3>
            <p className="text-slate-300 text-sm">
              <strong>File:</strong> {uploadedFile.name} ({uploadedFile.data.length} rows)
            </p>
            <p className="text-slate-300 text-sm">
              <strong>Columns:</strong> {uploadedFile.columns.join(', ')}
            </p>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-white font-medium mb-3">
            Business Problem Statement
          </label>
          <Textarea
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            placeholder="Describe what business insights you're looking for, what decisions you need to make, or what problems you want to solve with this data..."
            className="min-h-32 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 resize-none"
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-3">
            <Lightbulb className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white font-medium">Example Problem Statements</span>
          </div>
          <div className="space-y-2">
            {exampleStatements.map((example, index) => (
              <button
                key={index}
                onClick={() => setStatement(example)}
                className="block w-full text-left p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 text-sm transition-colors duration-200"
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={!statement.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
          >
            Analyze Data & Generate Dashboard
          </Button>
        </div>

        <div className="mt-6 text-sm text-slate-400">
          <p className="mb-2"><strong>Tips for better results:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Be specific about what metrics or KPIs matter to your business</li>
            <li>Mention any time periods or comparisons you're interested in</li>
            <li>Include context about your industry or business type if relevant</li>
            <li>Specify if you need operational, financial, or strategic insights</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
