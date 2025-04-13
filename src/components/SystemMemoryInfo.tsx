
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SystemMemoryInfo } from '@/services/mockData';
import { Cpu, Database, Server } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface SystemMemoryInfoProps {
  systemInfo: SystemMemoryInfo;
}

const SystemMemoryInfoComponent: React.FC<SystemMemoryInfoProps> = ({ systemInfo }) => {
  const [showCard, setShowCard] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Stagger the animations for a more dynamic effect
    setShowCard(true);
    
    const statsTimer = setTimeout(() => {
      setShowStats(true);
    }, 300);
    
    const metricsTimer = setTimeout(() => {
      setShowMetrics(true);
    }, 600);
    
    const detailsTimer = setTimeout(() => {
      setShowDetails(true);
    }, 900);
    
    return () => {
      clearTimeout(statsTimer);
      clearTimeout(metricsTimer);
      clearTimeout(detailsTimer);
    };
  }, []);

  return (
    <Card 
      className={`border border-cyber-blue/30 bg-cyber-dark shadow-lg transition-all duration-500 ${
        showCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-cyber-blue cyber-text-shadow flex items-center gap-2">
          <Database className={`h-5 w-5 text-cyber-blue transition-transform duration-500 ${showCard ? 'rotate-0' : 'rotate-180'}`} />
          System Memory
        </CardTitle>
        <CardDescription>Current memory usage statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className={`space-y-2 transition-all duration-500 delay-300 ${
            showStats ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="flex justify-between text-sm">
              <span>Memory Usage</span>
              <span className="text-cyber-blue">{systemInfo.memoryUsagePercentage}%</span>
            </div>
            <Progress 
              value={showStats ? systemInfo.memoryUsagePercentage : 0} 
              className="h-2 bg-cyber-darker transition-all duration-1000" 
              indicatorClassName="bg-gradient-to-r from-cyan-500 to-cyber-blue" 
            />
          </div>
          
          <div className={`grid grid-cols-3 gap-4 transition-all duration-500 delay-500 ${
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

          <div className={`grid grid-cols-2 gap-4 transition-all duration-500 delay-700 ${
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
                    className="h-full bg-cyber-blue transition-all duration-1000"
                    style={{ width: showDetails ? `${systemInfo.processesMemoryPercentage}%` : '0%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemMemoryInfoComponent;
