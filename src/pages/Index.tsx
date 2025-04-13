
import React, { useState, useEffect } from 'react';
import Dashboard from '@/components/Dashboard';
import { mockAnalyzeSystemMemory, Process, NetworkConnection, SystemMemoryInfo } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { RotateCcw, RefreshCw } from 'lucide-react';

const Index = () => {
  const [analysisResults, setAnalysisResults] = useState<{
    processes: Process[];
    connections: NetworkConnection[];
    systemInfo: SystemMemoryInfo;
  } | null>(null);
  
  const [analyzing, setAnalyzing] = useState(false);

  const analyzeSystemMemory = async () => {
    setAnalyzing(true);
    try {
      const results = await mockAnalyzeSystemMemory();
      setAnalysisResults(results);
    } catch (error) {
      console.error('Error analyzing system memory:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  // Analyze system memory when the page loads
  useEffect(() => {
    analyzeSystemMemory();
  }, []);

  return (
    <div className="min-h-screen bg-cyber-darker">
      <header className="bg-cyber-dark border-b border-cyber-blue/30 px-6 py-4 mb-6 shadow-lg shadow-cyber-blue/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-cyber-blue animate-pulse-glow flex items-center justify-center">
              <span className="text-cyber-dark font-bold">SM</span>
            </div>
            <h1 className="text-cyber-blue text-2xl font-bold cyber-text-shadow">
              SystemMind Analyzer
            </h1>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/10"
            onClick={analyzeSystemMemory}
            disabled={analyzing}
          >
            <RefreshCw size={16} className={`mr-2 ${analyzing ? 'animate-spin' : ''}`} />
            Refresh Analysis
          </Button>
        </div>
      </header>
      
      <main className="container px-4 py-6 max-w-7xl mx-auto">
        {analyzing ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-16 w-16 rounded-full border-4 border-cyber-blue border-t-transparent animate-spin mb-4" />
            <h2 className="text-xl font-medium mb-2">Analyzing System Memory</h2>
            <p className="text-muted-foreground">
              Examining processes, connections, and identifying suspicious activities...
            </p>
          </div>
        ) : analysisResults ? (
          <Dashboard 
            processes={analysisResults.processes} 
            connections={analysisResults.connections}
            systemInfo={analysisResults.systemInfo}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-xl font-medium mb-4">No System Analysis Available</h2>
            <Button 
              onClick={analyzeSystemMemory}
              className="bg-cyber-blue text-cyber-dark hover:bg-cyber-blue/90"
            >
              <RefreshCw size={16} className="mr-2" />
              Analyze System Memory
            </Button>
          </div>
        )}
      </main>
      
      <footer className="border-t border-cyber-blue/20 py-4 px-6 text-center text-sm text-muted-foreground mt-12">
        <p>SystemMind Memory Analyzer &copy; 2025</p>
      </footer>
    </div>
  );
};

export default Index;
