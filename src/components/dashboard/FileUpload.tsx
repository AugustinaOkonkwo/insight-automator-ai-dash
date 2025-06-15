
import { useState, useCallback } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataFile } from '@/pages/Dashboard';

interface FileUploadProps {
  onFileUpload: (file: DataFile) => void;
}

export const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(async (file: File) => {
    setUploading(true);
    setError(null);

    try {
      const text = await file.text();
      let data: any[] = [];
      let columns: string[] = [];

      if (file.name.endsWith('.csv')) {
        // Simple CSV parsing
        const lines = text.split('\n').filter(line => line.trim());
        if (lines.length === 0) throw new Error('Empty file');
        
        columns = lines[0].split(',').map(col => col.trim().replace(/"/g, ''));
        data = lines.slice(1).map(line => {
          const values = line.split(',').map(val => val.trim().replace(/"/g, ''));
          const row: any = {};
          columns.forEach((col, index) => {
            row[col] = values[index] || '';
          });
          return row;
        });
      } else if (file.name.endsWith('.json')) {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
          data = parsed;
          columns = data.length > 0 ? Object.keys(data[0]) : [];
        } else {
          throw new Error('JSON must be an array of objects');
        }
      } else {
        throw new Error('Unsupported file format. Please use CSV or JSON.');
      }

      const processedFile: DataFile = {
        name: file.name,
        type: file.type,
        data: data.slice(0, 1000), // Limit to first 1000 rows for demo
        columns
      };

      onFileUpload(processedFile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
    } finally {
      setUploading(false);
    }
  }, [onFileUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  return (
    <Card className="bg-slate-800 border-slate-700">
      <div className="p-8">
        <div className="text-center mb-6">
          <FileText className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Upload Your Dataset</h2>
          <p className="text-slate-300">
            Supported formats: CSV, Excel, JSON. Maximum file size: 10MB
          </p>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 ${
            dragOver
              ? 'border-blue-400 bg-blue-400/10'
              : 'border-slate-600 hover:border-slate-500'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
        >
          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-lg text-slate-300 mb-4">
            {dragOver ? 'Drop your file here' : 'Drag and drop your file here'}
          </p>
          <p className="text-slate-400 mb-6">or</p>
          
          <div className="relative">
            <input
              type="file"
              accept=".csv,.json,.xlsx"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={uploading}
            />
            <Button 
              disabled={uploading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {uploading ? 'Processing...' : 'Choose File'}
            </Button>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <span className="text-red-300">{error}</span>
          </div>
        )}

        <div className="mt-6 text-sm text-slate-400">
          <p className="mb-2"><strong>Tips for best results:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Ensure your data has clear column headers</li>
            <li>Include relevant numerical data for metrics and KPIs</li>
            <li>Date columns should be in a standard format (YYYY-MM-DD)</li>
            <li>Remove any sensitive or confidential information</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
