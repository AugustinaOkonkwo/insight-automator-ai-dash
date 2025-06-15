
import { useState } from 'react';
import { FileUpload } from '@/components/dashboard/FileUpload';
import { ProblemStatement } from '@/components/dashboard/ProblemStatement';
import { DataAnalysis } from '@/components/dashboard/DataAnalysis';
import { DashboardPreview } from '@/components/dashboard/DashboardPreview';
import { InsightsSummary } from '@/components/dashboard/InsightsSummary';

export type DataFile = {
  name: string;
  type: string;
  data: any[];
  columns: string[];
};

export type AnalysisResult = {
  insights: string[];
  recommendedCharts: {
    type: string;
    title: string;
    description: string;
    columns: string[];
  }[];
  summary: string;
};

const Dashboard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<DataFile | null>(null);
  const [problemStatement, setProblemStatement] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const steps = [
    { id: 1, title: 'Upload Data', component: FileUpload },
    { id: 2, title: 'Problem Statement', component: ProblemStatement },
    { id: 3, title: 'Analysis', component: DataAnalysis },
    { id: 4, title: 'Dashboard Preview', component: DashboardPreview },
  ];

  const handleFileUpload = (file: DataFile) => {
    setUploadedFile(file);
    setCurrentStep(2);
  };

  const handleProblemSubmit = (statement: string) => {
    setProblemStatement(statement);
    setCurrentStep(3);
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setCurrentStep(4);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <FileUpload onFileUpload={handleFileUpload} />;
      case 2:
        return (
          <ProblemStatement
            onSubmit={handleProblemSubmit}
            uploadedFile={uploadedFile}
          />
        );
      case 3:
        return (
          <DataAnalysis
            file={uploadedFile}
            problemStatement={problemStatement}
            onAnalysisComplete={handleAnalysisComplete}
          />
        );
      case 4:
        return (
          <div className="space-y-6">
            <DashboardPreview
              file={uploadedFile}
              analysisResult={analysisResult}
              problemStatement={problemStatement}
            />
            <InsightsSummary analysisResult={analysisResult} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            AI Dashboard Generator
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Upload your data, describe your business problem, and watch as AI generates 
            a custom dashboard with insights and visualizations tailored to your needs.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {step.id}
                </div>
                <span
                  className={`ml-2 font-medium ${
                    currentStep >= step.id ? 'text-white' : 'text-slate-400'
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-px mx-4 ${
                      currentStep > step.id ? 'bg-blue-600' : 'bg-slate-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
