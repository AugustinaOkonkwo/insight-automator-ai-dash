
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Upload, BarChart, Download, Sparkles, Target, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Upload,
      title: "Smart Data Upload",
      description: "Upload CSV, Excel, or JSON files with automatic data structure analysis"
    },
    {
      icon: Brain,
      title: "AI Problem Analysis",
      description: "Describe your business problem in plain English and let AI understand your needs"
    },
    {
      icon: BarChart,
      title: "Intelligent Visualizations",
      description: "Get perfectly tailored charts, KPIs, and tables based on your data and goals"
    },
    {
      icon: Download,
      title: "Export & Share",
      description: "Download static HTML dashboards or share interactive prototypes"
    }
  ];

  const benefits = [
    "No coding required - just upload and describe",
    "Automatic chart recommendations based on data types",
    "Business context-aware dashboard generation",
    "Clean, professional design templates",
    "Instant insights and data summaries"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-blue-600 rounded-2xl">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            AI Dashboard
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"> Generator</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Transform your raw data into beautiful, insightful dashboards in minutes. 
            Upload your dataset, describe your business problem, and watch AI create 
            the perfect visualization solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
              size="lg"
            >
              <Brain className="w-5 h-5 mr-2" />
              Start Building Dashboard
            </Button>
            <Button 
              variant="outline" 
              className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3 text-lg"
              size="lg"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700 p-6 hover:bg-slate-750 transition-colors duration-200">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Upload Your Data</h3>
              <p className="text-slate-300">
                Drop your CSV, Excel, or JSON file. Our AI instantly analyzes structure and data types.
              </p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Describe Your Problem</h3>
              <p className="text-slate-300">
                Tell us what business questions you want to answer in plain English.
              </p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Get Your Dashboard</h3>
              <p className="text-slate-300">
                Receive a custom dashboard with insights, charts, and downloadable prototypes.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <Card className="bg-slate-800 border-slate-700 p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Why Choose Our AI Agent?</h2>
              </div>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <Zap className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Perfect for:</h3>
              <div className="space-y-2 text-slate-300">
                <p>• Business analysts seeking quick insights</p>
                <p>• Managers needing executive dashboards</p>
                <p>• Data teams prototyping visualizations</p>
                <p>• Anyone wanting to understand their data</p>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Data?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already discovered the power of AI-driven dashboard generation.
          </p>
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            size="lg"
          >
            Get Started for Free
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
