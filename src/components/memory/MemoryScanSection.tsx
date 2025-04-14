
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { SystemMemoryInfo } from '@/services/mockData';
import { MemoryStick, Shield, BarChart3, AlertTriangle } from 'lucide-react';

interface MemoryScanSectionProps {
  systemInfo: SystemMemoryInfo;
  showScanProgress: boolean;
  scanProgress: number;
  memoryAnalysisScore: number | null;
  riskLevel: { level: string; color: string };
  fragmentationPercentage: number;
  calculateTimeUntilMemoryIssues: () => string;
}

const MemoryScanSection: React.FC<MemoryScanSectionProps> = ({
  systemInfo,
  showScanProgress,
  scanProgress,
  memoryAnalysisScore,
  riskLevel,
  fragmentationPercentage,
  calculateTimeUntilMemoryIssues
}) => {
  return (
    <div className={`mt-6 transition-all duration-300 delay-400 ${
      showScanProgress ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <MemoryStick size={16} className="text-cyber-blue animate-pulse" />
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
              <div className={riskLevel.color + " text-xl font-medium cyber-text-shadow"}>
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
  );
};

export default MemoryScanSection;
