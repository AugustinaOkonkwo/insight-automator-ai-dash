
import { useState, useEffect } from 'react';
import { Brain, CheckCircle, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { DataFile, AnalysisResult } from '@/pages/Dashboard';

interface DataAnalysisProps {
  file: DataFile | null;
  problemStatement: string;
  onAnalysisComplete: (result: AnalysisResult) => void;
}

export const DataAnalysis = ({ file, problemStatement, onAnalysisComplete }: DataAnalysisProps) => {
  const [analysisSteps, setAnalysisSteps] = useState([
    { name: 'Analyzing data structure', completed: false },
    { name: 'Processing business requirements', completed: false },
    { name: 'Identifying key metrics', completed: false },
    { name: 'Recommending visualizations', completed: false },
    { name: 'Generating insights', completed: false },
  ]);

  useEffect(() => {
    const runAnalysis = async () => {
      // Simulate AI analysis with step-by-step progress
      for (let i = 0; i < analysisSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        setAnalysisSteps(prev => 
          prev.map((step, index) => 
            index <= i ? { ...step, completed: true } : step
          )
        );
      }

      // Generate mock analysis result based on data and problem statement
      const result = generateAnalysisResult(file, problemStatement);
      
      // Wait a moment before completing
      setTimeout(() => {
        onAnalysisComplete(result);
      }, 500);
    };

    runAnalysis();
  }, [file, problemStatement, onAnalysisComplete]);

  const generateAnalysisResult = (file: DataFile | null, statement: string): AnalysisResult => {
    if (!file) {
      return { insights: [], recommendedCharts: [], summary: '' };
    }

    const numericColumns = file.columns.filter(col => {
      const sampleValues = file.data.slice(0, 10).map(row => row[col]);
      return sampleValues.some(val => !isNaN(Number(val)) && val !== '');
    });

    const dateColumns = file.columns.filter(col => {
      const sampleValues = file.data.slice(0, 10).map(row => row[col]);
      return sampleValues.some(val => !isNaN(Date.parse(val)));
    });

    const categoricalColumns = file.columns.filter(col => 
      !numericColumns.includes(col) && !dateColumns.includes(col)
    );

    const insights = [
      `Found ${file.data.length} records with ${file.columns.length} columns`,
      `Identified ${numericColumns.length} numeric metrics for KPI tracking`,
      `Detected ${categoricalColumns.length} categorical dimensions for grouping`,
      `Found ${dateColumns.length} date columns for time-series analysis`,
    ];

    const recommendedCharts = [];

    // Add KPI cards for numeric columns
    if (numericColumns.length > 0) {
      recommendedCharts.push({
        type: 'kpi',
        title: 'Key Performance Indicators',
        description: `Summary metrics from ${numericColumns.slice(0, 4).join(', ')}`,
        columns: numericColumns.slice(0, 4)
      });
    }

    // Add trend analysis if we have dates and numbers
    if (dateColumns.length > 0 && numericColumns.length > 0) {
      recommendedCharts.push({
        type: 'line',
        title: 'Trend Analysis Over Time',
        description: `Time series visualization of ${numericColumns[0]} over ${dateColumns[0]}`,
        columns: [dateColumns[0], numericColumns[0]]
      });
    }

    // Add categorical breakdown
    if (categoricalColumns.length > 0 && numericColumns.length > 0) {
      recommendedCharts.push({
        type: 'bar',
        title: 'Performance by Category',
        description: `${numericColumns[0]} breakdown by ${categoricalColumns[0]}`,
        columns: [categoricalColumns[0], numericColumns[0]]
      });
    }

    // Add distribution chart
    if (numericColumns.length >= 2) {
      recommendedCharts.push({
        type: 'scatter',
        title: 'Correlation Analysis',
        description: `Relationship between ${numericColumns[0]} and ${numericColumns[1]}`,
        columns: [numericColumns[0], numericColumns[1]]
      });
    }

    // Add data table
    recommendedCharts.push({
      type: 'table',
      title: 'Detailed Data View',
      description: 'Searchable and sortable data table',
      columns: file.columns.slice(0, 6)
    });

    const summary = `Based on your problem statement about "${statement.substring(0, 100)}...", I've identified ${recommendedCharts.length} key visualizations that will help answer your business questions. The dashboard includes KPI tracking, trend analysis, and categorical breakdowns to provide comprehensive insights into your data.`;

    return { insights, recommendedCharts, summary };
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <div className="p-8">
        <div className="text-center mb-8">
          <Brain className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">AI Analysis in Progress</h2>
          <p className="text-slate-300">
            Analyzing your data and generating intelligent dashboard recommendations
          </p>
        </div>

        <div className="space-y-4">
          {analysisSteps.map((step, index) => (
            <div key={index} className="flex items-center p-4 bg-slate-700 rounded-lg">
              <div className="flex-shrink-0 mr-4">
                {step.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                )}
              </div>
              <div className="flex-1">
                <span className={`font-medium ${step.completed ? 'text-white' : 'text-slate-300'}`}>
                  {step.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-slate-700 rounded-lg">
          <h3 className="text-white font-semibold mb-2">Analysis Context:</h3>
          <p className="text-slate-300 text-sm mb-2">
            <strong>Dataset:</strong> {file?.name} ({file?.data.length} rows, {file?.columns.length} columns)
          </p>
          <p className="text-slate-300 text-sm">
            <strong>Business Problem:</strong> {problemStatement.substring(0, 200)}...
          </p>
        </div>
      </div>
    </Card>
  );
};
