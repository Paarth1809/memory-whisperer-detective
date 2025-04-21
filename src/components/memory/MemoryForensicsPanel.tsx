import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import UploadMemoryDump from '@/components/UploadMemoryDump';
import { 
  HardDrive, Cpu, Library, Network, ShieldX, Text, Database, 
  Key, Search, Clock, CheckCircle, XCircle, Loader2,
  File, Settings, Globe, KeyRound, Terminal, BarChart2,
  Puzzle, FileText, Hash, Layers
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  MemoryForensicFeature, 
  getAllForensicFeatures, 
  getFeaturesByCategory 
} from './utils/memoryAnalysisHelpers';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface MemoryForensicsPanelProps {
  onAnalysisComplete?: (results: any) => void;
}

const MemoryForensicsPanel: React.FC<MemoryForensicsPanelProps> = ({ onAnalysisComplete }) => {
  const [activeTab, setActiveTab] = useState<string>('memory-dump');
  const [memoryDumpUploaded, setMemoryDumpUploaded] = useState<boolean>(false);
  const [analysisInProgress, setAnalysisInProgress] = useState<boolean>(false);
  const [currentAnalysisType, setCurrentAnalysisType] = useState<string>('');
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [completedAnalyses, setCompletedAnalyses] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [batchAnalysisMode, setBatchAnalysisMode] = useState<boolean>(false);
  const [reportGenerating, setReportGenerating] = useState<boolean>(false);
  const [batchProgress, setBatchProgress] = useState<number>(0);
  const [analysisResults, setAnalysisResults] = useState<Record<string, string>>({});

  const handleMemoryDumpUpload = (file: File) => {
    setMemoryDumpUploaded(true);
    toast({
      title: "Memory Dump Uploaded",
      description: `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB) uploaded successfully.`,
    });
  };

  const startAnalysis = (analysisType: string) => {
    if (analysisInProgress) return;
    
    setAnalysisInProgress(true);
    setCurrentAnalysisType(analysisType);
    setAnalysisProgress(0);
    
    toast({
      title: "Analysis Started",
      description: `${getFeatureTitle(analysisType)} analysis in progress...`,
    });
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setAnalysisInProgress(false);
          setCompletedAnalyses(prev => [...prev, analysisType]);
          
          setAnalysisResults(prev => ({
            ...prev,
            [analysisType]: `Result: ${getFeatureTitle(analysisType)} found 0 critical anomalies. (Demo output)`
          }));
          
          toast({
            title: "Analysis Complete",
            description: `${getFeatureTitle(analysisType)} analysis completed successfully.`,
          });
          
          if (onAnalysisComplete) {
            onAnalysisComplete({
              type: analysisType,
              timestamp: new Date(),
              results: `Mock results for ${analysisType}`
            });
          }
          
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const startBatchAnalysis = () => {
    if (selectedFeatures.length === 0) {
      toast({
        title: "No Features Selected",
        description: "Please select at least one analysis feature.",
        variant: "destructive"
      });
      return;
    }
    
    setBatchAnalysisMode(true);
    setBatchProgress(0);
    
    toast({
      title: "Batch Analysis Started",
      description: `${selectedFeatures.length} features selected for analysis.`,
    });
    
    let featureIndex = 0;
    const processNextFeature = () => {
      if (featureIndex >= selectedFeatures.length) {
        setBatchAnalysisMode(false);
        toast({
          title: "Batch Analysis Complete",
          description: `All ${selectedFeatures.length} analyses completed.`,
        });
        return;
      }
      
      const feature = selectedFeatures[featureIndex];
      setCurrentAnalysisType(feature);
      setAnalysisInProgress(true);
      setAnalysisProgress(0);
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        setAnalysisProgress(Math.min(progress, 100));
        
        if (progress >= 100) {
          clearInterval(interval);
          setCompletedAnalyses(prev => [...prev, feature]);
          setAnalysisResults(prev => ({
            ...prev,
            [feature]: `Result: ${getFeatureTitle(feature)} found 0 critical anomalies. (Demo output)`
          }));
          featureIndex++;
          setBatchProgress((featureIndex / selectedFeatures.length) * 100);
          setAnalysisInProgress(false);
          processNextFeature();
        }
      }, 200);
    };
    
    processNextFeature();
  };

  const toggleFeatureSelection = (featureId: string) => {
    setSelectedFeatures(prev => {
      if (prev.includes(featureId)) {
        return prev.filter(id => id !== featureId);
      } else {
        return [...prev, featureId];
      }
    });
  };

  const generateReport = () => {
    if (completedAnalyses.length === 0) {
      toast({
        title: "No Analyses Completed",
        description: "Please complete at least one analysis to generate a report.",
        variant: "destructive"
      });
      return;
    }
    
    setReportGenerating(true);
    
    setTimeout(() => {
      setReportGenerating(false);
      
      toast({
        title: "Report Generated",
        description: "Forensic analysis report is ready for download.",
      });
      
      // In a real implementation, this would generate and offer download of an actual report
    }, 2000);
  };

  const isAnalysisCompleted = (analysisType: string) => {
    return completedAnalyses.includes(analysisType);
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      "cpu": <Cpu size={18} className="text-cyan-400" />,
      "library": <Library size={18} className="text-purple-400" />,
      "network": <Network size={18} className="text-blue-400" />,
      "text": <Text size={18} className="text-green-400" />,
      "database": <Database size={18} className="text-amber-400" />,
      "shield-x": <ShieldX size={18} className="text-red-400" />,
      "key": <Key size={18} className="text-yellow-400" />,
      "search": <Search size={18} className="text-indigo-400" />,
      "clock": <Clock size={18} className="text-teal-400" />,
      "file": <File size={18} className="text-blue-300" />,
      "settings": <Settings size={18} className="text-slate-400" />,
      "globe": <Globe size={18} className="text-blue-500" />,
      "key-round": <KeyRound size={18} className="text-amber-300" />,
      "terminal": <Terminal size={18} className="text-lime-400" />,
      "bar-chart-2": <BarChart2 size={18} className="text-pink-400" />,
      "puzzle": <Puzzle size={18} className="text-violet-400" />,
      "file-text": <FileText size={18} className="text-emerald-400" />,
      "hash": <Hash size={18} className="text-fuchsia-400" />,
      "layers": <Layers size={18} className="text-orange-400" />
    };
    
    return iconMap[iconName] || <HardDrive size={18} className="text-blue-200" />;
  };

  const getFeatureTitle = (featureId: string) => {
    const feature = getAllForensicFeatures().find(f => f.id === featureId);
    return feature ? feature.title : featureId;
  };

  const renderFeatureCard = (feature: MemoryForensicFeature) => {
    const isCompleted = isAnalysisCompleted(feature.id);
    const isInProgress = analysisInProgress && currentAnalysisType === feature.id;
    const isSelected = selectedFeatures.includes(feature.id);
    
    return (
      <Card className={`bg-cyber-dark border ${isSelected ? 'border-cyber-blue' : 'border-cyber-blue/30'} hover:border-cyber-blue/60 transition-all`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-1">
            <CardTitle className="text-cyber-blue flex items-center gap-2">
              {getIconComponent(feature.icon)}
              {feature.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              {isCompleted && <CheckCircle size={16} className="text-green-400" />}
              {!batchAnalysisMode && (
                <Checkbox 
                  checked={isSelected}
                  onCheckedChange={() => toggleFeatureSelection(feature.id)}
                  className="border-cyber-blue/50 data-[state=checked]:bg-cyber-blue data-[state=checked]:text-cyber-dark"
                />
              )}
            </div>
          </div>
          <CardDescription>{feature.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {isInProgress ? (
            <div className="space-y-2">
              <Progress value={analysisProgress} className="h-1.5" />
              <div className="text-xs text-muted-foreground">{Math.round(analysisProgress)}% complete</div>
            </div>
          ) : (
            <Button 
              onClick={() => startAnalysis(feature.id)} 
              className="w-full bg-cyber-blue/20 text-cyber-blue hover:bg-cyber-blue/30"
              disabled={!memoryDumpUploaded || isCompleted || batchAnalysisMode}
            >
              {isCompleted ? 'Analysis Complete' : 'Run Analysis'}
            </Button>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderFeaturesByCategory = (category: string, title: string) => {
    const features = getFeaturesByCategory(category);
    
    if (features.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-cyber-blue">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map(feature => renderFeatureCard(feature))}
        </div>
      </div>
    );
  };

  return (
    <Card className="border border-cyber-blue/30 bg-cyber-dark shadow-lg mb-6">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-cyber-blue cyber-text-shadow">Memory Forensics Tools</CardTitle>
          {completedAnalyses.length > 0 && (
            <Button
              onClick={generateReport}
              className="bg-cyber-blue/20 text-cyber-blue hover:bg-cyber-blue/30"
              disabled={reportGenerating}
            >
              {reportGenerating ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Generating Report...
                </>
              ) : (
                <>
                  <FileText size={16} className="mr-2" />
                  Generate Report
                </>
              )}
            </Button>
          )}
        </div>
        <CardDescription>Advanced memory analysis and forensic capabilities</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-4 mb-4 bg-cyber-darker">
            <TabsTrigger value="memory-dump" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-cyber-dark">
              Memory Dump
            </TabsTrigger>
            <TabsTrigger value="analysis-tools" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-cyber-dark">
              Analysis Tools
            </TabsTrigger>
            <TabsTrigger value="extraction-tools" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-cyber-dark">
              Extraction Tools
            </TabsTrigger>
            <TabsTrigger value="utilities" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-cyber-dark">
              Utilities
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="memory-dump" className="space-y-4 mt-0">
            <UploadMemoryDump onUploadComplete={handleMemoryDumpUpload} />
            
            {memoryDumpUploaded && selectedFeatures.length > 0 && (
              <div className="mt-4 p-4 bg-cyber-darker rounded-md border border-cyber-blue/20">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Batch Analysis</h3>
                  <Badge variant="outline" className="bg-cyber-blue/10">
                    {selectedFeatures.length} features selected
                  </Badge>
                </div>
                
                {batchAnalysisMode ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Overall Progress</span>
                        <span>{Math.round(batchProgress)}%</span>
                      </div>
                      <Progress value={batchProgress} className="h-1.5" />
                    </div>
                    
                    {analysisInProgress && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Current: {getFeatureTitle(currentAnalysisType)}</span>
                          <span>{Math.round(analysisProgress)}%</span>
                        </div>
                        <Progress value={analysisProgress} className="h-1.5" />
                      </div>
                    )}
                  </div>
                ) : (
                  <Button 
                    onClick={startBatchAnalysis}
                    className="w-full bg-cyber-blue text-cyber-dark hover:bg-cyber-blue/90"
                    disabled={!memoryDumpUploaded || analysisInProgress}
                  >
                    Start Batch Analysis
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="analysis-tools" className="mt-0">
            {renderFeaturesByCategory("analysis", "Process & System Analysis")}
            {renderFeaturesByCategory("detection", "Detection Tools")}
          </TabsContent>
          
          <TabsContent value="extraction-tools" className="mt-0">
            {renderFeaturesByCategory("extraction", "Data Extraction Tools")}
            {renderFeaturesByCategory("visualization", "Visualization Tools")}
          </TabsContent>
          
          <TabsContent value="utilities" className="mt-0">
            {renderFeaturesByCategory("utilities", "Utility Tools")}
          </TabsContent>
        </Tabs>
        
        {completedAnalyses.length > 0 && (
          <Collapsible className="mt-6">
            <CollapsibleTrigger className="w-full p-4 bg-cyber-darker rounded-md border border-cyber-blue/20 flex items-center justify-between">
              <h3 className="text-sm font-medium">Completed Analyses ({completedAnalyses.length})</h3>
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-400/30">
                  {completedAnalyses.length} completed
                </Badge>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 mt-2 bg-cyber-darker rounded-md border border-cyber-blue/20">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {completedAnalyses.map((analysis, index) => (
                  <div key={index} className="p-3 bg-cyber-dark/80 rounded-md border border-cyber-blue/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-green-400" />
                        {getFeatureTitle(analysis)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-xs mt-2 text-cyber-blue/90">
                      {analysisResults[analysis] ?? "No result."}
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
};

export default MemoryForensicsPanel;
