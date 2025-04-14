
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SystemMemoryInfo } from '@/services/mockData';
import { Cpu, Database, Server, Memory, BarChart3, Shield, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface SystemMemoryInfoProps {
  systemInfo: SystemMemoryInfo;
}

const SystemMemoryInfoComponent: React.FC<SystemMemoryInfoProps> = ({ systemInfo }) => {
  const [showCard, setShowCard] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showScanProgress, setShowScanProgress] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [memoryAnalysisScore, setMemoryAnalysisScore] = useState<number | null>(null);

  useEffect(() => {
    // Reduced delay between animations and shortened duration
    setShowCard(true);
    
    const statsTimer = setTimeout(() => {
      setShowStats(true);
    }, 100);
    
    const metricsTimer = setTimeout(() => {
      setShowMetrics(true);
    }, 200);
    
    const detailsTimer = setTimeout(() => {
      setShowDetails(true);
      setShowScanProgress(true);
    }, 300);
    
    return () => {
      clearTimeout(statsTimer);
      clearTimeout(metricsTimer);
      clearTimeout(detailsTimer);
    };
  }, []);

  useEffect(() => {
    if (!showScanProgress) return;
    
    // Simulate memory analysis progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const next = prev + Math.random() * 5;
        if (next >= 100) {
          clearInterval(interval);
          // Calculate memory analysis score based on memory usage and allocation
          // Lower scores are better (less fragmentation and better performance)
          const score = Math.round(
            (systemInfo.memoryUsagePercentage * 0.6) + 
            (systemInfo.processesMemoryPercentage * 0.4) - 
            15 // Offset for better results
          );
          setMemoryAnalysisScore(Math.max(0, Math.min(100, score)));
          return 100;
        }
        return next;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [showScanProgress, systemInfo]);

  // Determine risk level based on memory analysis score
  const getRiskLevel = () => {
    if (memoryAnalysisScore === null) return { level: "scanning", color: "text-cyber-blue" };
    if (memoryAnalysisScore < 30) return { level: "Low", color: "text-green-400" };
    if (memoryAnalysisScore < 60) return { level: "Moderate", color: "text-yellow-400" };
    return { level: "High", color: "text-cyber-red" };
  };

  // Calculate memory fragmentation percentage based on usage patterns
  const fragmentationPercentage = Math.round(systemInfo.memoryUsagePercentage * 0.2 + systemInfo.processesMemoryPercentage * 0.3);

  // Calculate projected time until memory issues
  const calculateTimeUntilMemoryIssues = () => {
    const risk = getRiskLevel();
    if (risk.level === "Low") return "None expected";
    if (risk.level === "Moderate") return "4-6 hours";
    if (risk.level === "High") return "1-2 hours";
    return "Calculating...";
  };

  const riskLevel = getRiskLevel();

  return (
    <Card 
      className={`border border-cyber-blue/30 bg-cyber-dark shadow-lg transition-all duration-300 ${
        showCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-cyber-blue cyber-text-shadow flex items-center gap-2">
          <Database className={`h-5 w-5 text-cyber-blue transition-transform duration-300 ${showCard ? 'rotate-0' : 'rotate-180'}`} />
          Advanced Memory Analysis
        </CardTitle>
        <CardDescription>Detailed memory performance analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className={`space-y-2 transition-all duration-300 delay-100 ${
            showStats ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="flex justify-between text-sm">
              <span>Memory Usage</span>
              <span className="text-cyber-blue">{systemInfo.memoryUsagePercentage}%</span>
            </div>
            <Progress 
              value={showStats ? systemInfo.memoryUsagePercentage : 0} 
              className="h-2 bg-cyber-darker transition-all duration-500" 
              indicatorClassName="bg-gradient-to-r from-cyan-500 to-cyber-blue" 
            />
          </div>
          
          <div className={`grid grid-cols-3 gap-4 transition-all duration-300 delay-200 ${
            showMetrics ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="bg-cyber-darker p-3 rounded-md border border-cyber-blue/20 hover:border-cyber-blue/50 transition-colors">
              <div className="text-xs text-muted-foreground">Total Memory</div>
              <div className="text-lg font-medium cyber-text-shadow memory-scanner-effect">{systemInfo.totalMemory}</div>
            </div>
            <div className="bg-cyber-darker p-3 rounded-md border border-cyber-blue/20 hover:border-cyber-blue/50 transition-colors">
              <div className="text-xs text-muted-foreground">Used Memory</div>
              <div className="text-lg font-medium cyber-text-shadow memory-scanner-effect">{systemInfo.usedMemory}</div>
            </div>
            <div className="bg-cyber-darker p-3 rounded-md border border-cyber-blue/20 hover:border-cyber-blue/50 transition-colors">
              <div className="text-xs text-muted-foreground">Free Memory</div>
              <div className="text-lg font-medium cyber-text-shadow memory-scanner-effect">{systemInfo.freeMemory}</div>
            </div>
          </div>

          <div className={`grid grid-cols-2 gap-4 transition-all duration-300 delay-300 ${
            showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-cyber-darker p-3 rounded-md border border-cyber-blue/20 hover:border-cyber-blue/50 transition-all hover:-translate-y-1">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Server size={12} className="animate-pulse" />
                Physical Memory
              </div>
              <div className="text-sm font-medium mt-1">{systemInfo.totalMemory} Physical RAM</div>
              <div className="mt-2">
                <Progress 
                  value={showDetails ? systemInfo.memoryUsagePercentage : 0} 
                  className="h-1.5 bg-cyber-darker/50" 
                  indicatorClassName="bg-green-500" 
                />
              </div>
            </div>
            <div className="bg-cyber-darker p-3 rounded-md border border-cyber-blue/20 hover:border-cyber-blue/50 transition-all hover:-translate-y-1">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Cpu size={12} className="animate-pulse" />
                Memory Allocation
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs">Processes: {systemInfo.processesMemoryPercentage}%</span>
                <span className="text-xs">System: {100 - systemInfo.processesMemoryPercentage}%</span>
              </div>
              <div className="mt-2">
                <div className="w-full bg-cyber-darker/50 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyber-blue transition-all duration-500"
                    style={{ width: showDetails ? `${systemInfo.processesMemoryPercentage}%` : '0%' }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* New deep memory scan section */}
          <div className={`mt-6 transition-all duration-300 delay-400 ${
            showScanProgress ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Memory size={16} className="text-cyber-blue animate-pulse" />
                <span className="text-sm font-medium">Deep Memory Scan</span>
              </div>
              <span className="text-xs text-cyber-blue">{Math.min(100, Math.round(scanProgress))}%</span>
            </div>
            <Progress 
              value={scanProgress} 
              className="h-1.5 bg-cyber-darker/70" 
              indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500" 
            />
            
            {memoryAnalysisScore !== null && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* Memory Risk Score */}
                <div className="bg-cyber-darker p-3 rounded-md border border-cyber-blue/20">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Shield size={12} className={riskLevel.color} />
                    Memory Risk Assessment
                  </div>
                  <div className="mt-2 flex items-end justify-between">
                    <div className="text-xl font-medium cyber-text-shadow" className={riskLevel.color}>
                      {riskLevel.level}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Score: {memoryAnalysisScore}/100
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={memoryAnalysisScore} 
                      className="h-1.5 bg-cyber-darker/50" 
                      indicatorClassName={`${
                        memoryAnalysisScore < 30 ? 'bg-green-500' : 
                        memoryAnalysisScore < 60 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`} 
                    />
                  </div>
                </div>
                
                {/* Memory Fragmentation */}
                <div className="bg-cyber-darker p-3 rounded-md border border-cyber-blue/20">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <BarChart3 size={12} className="text-yellow-400" />
                    Memory Fragmentation
                  </div>
                  <div className="mt-2 flex items-end justify-between">
                    <div className="text-xl font-medium cyber-text-shadow">
                      {fragmentationPercentage}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {fragmentationPercentage < 30 ? 'Optimal' : 
                      fragmentationPercentage < 50 ? 'Normal' : 
                      'Degraded'}
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={fragmentationPercentage} 
                      className="h-1.5 bg-cyber-darker/50" 
                      indicatorClassName="bg-yellow-400" 
                    />
                  </div>
                </div>
                
                {/* Time until memory issues */}
                <div className="bg-cyber-darker p-3 rounded-md border border-cyber-blue/20">
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <AlertTriangle size={12} className={riskLevel.level === "High" ? "text-cyber-red animate-pulse" : "text-yellow-400"} />
                    Projected Memory Issues
                  </div>
                  <div className="mt-2">
                    <div className="text-lg font-medium cyber-text-shadow">
                      {calculateTimeUntilMemoryIssues()}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {riskLevel.level === "Low" 
                        ? "Memory performance stable" 
                        : riskLevel.level === "Moderate"
                          ? "Consider closing unused applications"
                          : "Memory optimization recommended"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemMemoryInfoComponent;
