
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoVideoModal = ({ isOpen, onClose }: DemoVideoModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const demoSteps = [
    {
      title: "Upload Your Dataset",
      description: "User uploads a sales data CSV file",
      duration: 3000
    },
    {
      title: "Describe Business Problem", 
      description: "User types: 'I want to analyze monthly sales trends and identify top performing products'",
      duration: 4000
    },
    {
      title: "AI Analyzes Data",
      description: "AI processes the dataset and understands the business context",
      duration: 2000
    },
    {
      title: "Generate Dashboard",
      description: "AI creates charts showing sales trends, product performance KPIs, and data tables",
      duration: 4000
    },
    {
      title: "Export Results",
      description: "Download interactive dashboard or static HTML report",
      duration: 2000
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && isOpen) {
      interval = setInterval(() => {
        setProgress(prev => {
          const stepDuration = demoSteps[currentStep]?.duration || 3000;
          const increment = 100 / (stepDuration / 100);
          
          if (prev >= 100) {
            if (currentStep < demoSteps.length - 1) {
              setCurrentStep(current => current + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return prev + increment;
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentStep, isOpen]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleClose = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            AI Dashboard Generator Demo
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Video Player Mockup */}
          <div className="bg-slate-800 rounded-lg p-8 aspect-video flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
            
            {/* Demo Content */}
            <div className="text-center z-10">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {demoSteps[currentStep]?.title}
              </h3>
              <p className="text-slate-300 text-lg max-w-md mx-auto">
                {demoSteps[currentStep]?.description}
              </p>
              
              {/* Progress Indicator */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-center space-x-2">
                  {demoSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentStep
                          ? 'bg-blue-400'
                          : index < currentStep
                          ? 'bg-green-400'
                          : 'bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <div className="w-64 h-2 bg-slate-700 rounded-full mx-auto overflow-hidden">
                  <div 
                    className="h-full bg-blue-400 transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={handleRestart}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restart
            </Button>
            
            <Button
              onClick={handlePlayPause}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Play
                </>
              )}
            </Button>
          </div>

          {/* Demo Description */}
          <div className="bg-slate-800 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">What you'll see in this demo:</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Upload a sample sales dataset</li>
              <li>• Enter a business problem in natural language</li>
              <li>• Watch AI analyze and generate perfect visualizations</li>
              <li>• Export your custom dashboard</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
