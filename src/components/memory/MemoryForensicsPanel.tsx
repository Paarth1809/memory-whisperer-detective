
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import UploadMemoryDump from '@/components/UploadMemoryDump';
import { 
  HardDrive, Cpu, Library, Network, ShieldX, Text, Database, 
  Key, Search, Clock, CheckCircle, XCircle, Loader2 
} from 'lucide-react';

interface MemoryForensicsPanelProps {
  onAnalysisComplete?: (results: any) => void;
}

const MemoryForensicsPanel: React.FC<MemoryForensicsPanelProps> = ({ onAnalysisComplete }) => {
  const [activeTab, setActiveTab] = useState<string>('memory-dump');
  const [memoryDumpUploaded, setMemoryDumpUploaded] = useState<boolean>(false);
  const [analysisInProgress, setAnalysisInProgress] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [completedAnalyses, setCompletedAnalyses] = useState<string[]>([]);

  const handleMemoryDumpUpload = (file: File) => {
    setMemoryDumpUploaded(true);
    // In a real implementation, we would process the file here
  };

  const startAnalysis = (analysisType: string) => {
    setAnalysisInProgress(true);
    setAnalysisProgress(0);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setAnalysisInProgress(false);
          setCompletedAnalyses(prev => [...prev, analysisType]);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const isAnalysisCompleted = (analysisType: string) => {
    return completedAnalyses.includes(analysisType);
  };

  const renderFeatureCard = (
    title: string, 
    icon: React.ReactNode, 
    description: string,
    analysisType: string
  ) => {
    const isCompleted = isAnalysisCompleted(analysisType);
    const isInProgress = analysisInProgress && !isCompleted;
    
    return (
      <Card className="bg-cyber-dark border border-cyber-blue/30 hover:border-cyber-blue/60 transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="text-cyber-blue flex items-center gap-2">
            {icon}
            {title}
            {isCompleted && <CheckCircle size={16} className="text-green-400 ml-auto" />}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {isInProgress ? (
            <div className="space-y-2">
              <Progress value={analysisProgress} className="h-1.5" />
              <div className="text-xs text-muted-foreground">{Math.round(analysisProgress)}% complete</div>
            </div>
          ) : (
            <Button 
              onClick={() => startAnalysis(analysisType)} 
              className="w-full bg-cyber-blue/20 text-cyber-blue hover:bg-cyber-blue/30"
              disabled={!memoryDumpUploaded || isCompleted}
            >
              {isCompleted ? 'Analysis Complete' : 'Run Analysis'}
            </Button>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Card className="border border-cyber-blue/30 bg-cyber-dark shadow-lg mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-cyber-blue cyber-text-shadow">Memory Forensics Tools</CardTitle>
        <CardDescription>Advanced memory analysis and forensic capabilities</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-3 mb-4 bg-cyber-darker">
            <TabsTrigger value="memory-dump" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-cyber-dark">
              Memory Dump
            </TabsTrigger>
            <TabsTrigger value="analysis-tools" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-cyber-dark">
              Analysis Tools
            </TabsTrigger>
            <TabsTrigger value="detection-tools" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-cyber-dark">
              Detection Tools
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="memory-dump" className="space-y-4 mt-0">
            <UploadMemoryDump onUploadComplete={handleMemoryDumpUpload} />
          </TabsContent>
          
          <TabsContent value="analysis-tools" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderFeatureCard(
                "Process & Thread Analysis", 
                <Cpu size={18} className="text-cyan-400" />, 
                "Analyze running processes and thread structures",
                "process-analysis"
              )}
              
              {renderFeatureCard(
                "DLL & Handle Enumeration", 
                <Library size={18} className="text-purple-400" />, 
                "List loaded DLLs and open handles",
                "dll-enumeration"
              )}
              
              {renderFeatureCard(
                "Network Connections", 
                <Network size={18} className="text-blue-400" />, 
                "Map active network connections and sockets",
                "network-analysis"
              )}
              
              {renderFeatureCard(
                "String Extraction", 
                <Text size={18} className="text-green-400" />, 
                "Extract and analyze strings from memory",
                "string-extraction"
              )}
              
              {renderFeatureCard(
                "Registry Dumping", 
                <Database size={18} className="text-amber-400" />, 
                "Extract registry hives from memory",
                "registry-dump"
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="detection-tools" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderFeatureCard(
                "Malware Detection", 
                <ShieldX size={18} className="text-red-400" />, 
                "Scan for malware signatures in memory",
                "malware-detection"
              )}
              
              {renderFeatureCard(
                "Cryptographic Key Detection", 
                <Key size={18} className="text-yellow-400" />, 
                "Locate encryption keys in memory",
                "crypto-detection"
              )}
              
              {renderFeatureCard(
                "YARA Rule Scanning", 
                <Search size={18} className="text-indigo-400" />, 
                "Apply custom YARA rules to memory",
                "yara-scan"
              )}
              
              {renderFeatureCard(
                "Timeline Reconstruction", 
                <Clock size={18} className="text-teal-400" />, 
                "Reconstruct system event timeline",
                "timeline-analysis"
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {completedAnalyses.length > 0 && (
          <div className="mt-6 p-4 bg-cyber-darker rounded-md border border-cyber-blue/20">
            <h3 className="text-sm font-medium mb-2">Completed Analyses</h3>
            <div className="space-y-2">
              {completedAnalyses.map((analysis, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-green-400" />
                    {analysis.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MemoryForensicsPanel;
