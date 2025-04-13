
import React, { useState } from 'react';
import UploadMemoryDump from '@/components/UploadMemoryDump';
import Dashboard from '@/components/Dashboard';
import { mockAnalyzeMemoryDump, Process, NetworkConnection } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

const Index = () => {
  const [analysisResults, setAnalysisResults] = useState<{
    processes: Process[];
    connections: NetworkConnection[];
  } | null>(null);
  
  const [analyzing, setAnalyzing] = useState(false);

  const handleUploadComplete = async (file: File) => {
    setAnalyzing(true);
    try {
      const results = await mockAnalyzeMemoryDump(file);
      setAnalysisResults(results);
    } catch (error) {
      console.error('Error analyzing memory dump:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysisResults(null);
  };

  return (
    <div className="min-h-screen bg-cyber-darker">
      <header className="bg-cyber-dark border-b border-cyber-blue/30 px-6 py-4 mb-6 shadow-lg shadow-cyber-blue/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-cyber-blue animate-pulse-glow flex items-center justify-center">
              <span className="text-cyber-dark font-bold">MW</span>
            </div>
            <h1 className="text-cyber-blue text-2xl font-bold cyber-text-shadow">
              MemoryWhisperer
            </h1>
          </div>
          
          {analysisResults && (
            <Button 
              variant="outline" 
              size="sm"
              className="border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10"
              onClick={handleReset}
            >
              <RotateCcw size={16} className="mr-2" />
              New Analysis
            </Button>
          )}
        </div>
      </header>
      
      <main className="container px-4 py-6 max-w-7xl mx-auto">
        {analyzing ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-16 w-16 rounded-full border-4 border-cyber-blue border-t-transparent animate-spin mb-4" />
            <h2 className="text-xl font-medium mb-2">Analyzing Memory Dump</h2>
            <p className="text-muted-foreground">
              Extracting processes, connections, and identifying suspicious activities...
            </p>
          </div>
        ) : analysisResults ? (
          <Dashboard 
            processes={analysisResults.processes} 
            connections={analysisResults.connections} 
          />
        ) : (
          <div className="max-w-xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-2 text-cyber-blue cyber-text-shadow">
                Memory Forensics Analysis Tool
              </h2>
              <p className="text-muted-foreground">
                Upload a memory dump file to analyze running processes, network connections, and identify suspicious activities
              </p>
            </div>
            <UploadMemoryDump onUploadComplete={handleUploadComplete} />
            
            <div className="mt-8 p-4 border border-cyber-blue/20 rounded-lg bg-cyber-dark/50">
              <h3 className="text-cyber-blue font-medium mb-2">About MemoryWhisperer</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This tool helps security professionals analyze memory dumps to identify potential security threats 
                and forensic artifacts. The analysis includes process enumeration, network connection analysis, 
                and automatic detection of potentially suspicious activities.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="p-3 border border-cyber-blue/20 rounded-md">
                  <h4 className="font-medium text-cyber-blue mb-1">Process Analysis</h4>
                  <p className="text-muted-foreground">Identify running processes, their paths, and command line parameters</p>
                </div>
                <div className="p-3 border border-cyber-blue/20 rounded-md">
                  <h4 className="font-medium text-cyber-blue mb-1">Network Connections</h4>
                  <p className="text-muted-foreground">Detect active network connections and related processes</p>
                </div>
                <div className="p-3 border border-cyber-blue/20 rounded-md">
                  <h4 className="font-medium text-cyber-blue mb-1">Threat Detection</h4>
                  <p className="text-muted-foreground">Automatically flag suspicious processes and connections</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="border-t border-cyber-blue/20 py-4 px-6 text-center text-sm text-muted-foreground mt-12">
        <p>MemoryWhisperer Forensic Analysis Tool &copy; 2025</p>
      </footer>
    </div>
  );
};

export default Index;
