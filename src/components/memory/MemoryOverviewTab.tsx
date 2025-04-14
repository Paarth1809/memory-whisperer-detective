
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { SystemMemoryInfo } from '@/services/mockData';
import { Server, Cpu } from 'lucide-react';

interface MemoryOverviewTabProps {
  systemInfo: SystemMemoryInfo;
  showMetrics: boolean;
  showDetails: boolean;
}

const MemoryOverviewTab: React.FC<MemoryOverviewTabProps> = ({ 
  systemInfo, 
  showMetrics, 
  showDetails 
}) => {
  return (
    <>
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
    </>
  );
};

export default MemoryOverviewTab;
