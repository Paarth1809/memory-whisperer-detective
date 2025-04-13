
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SystemMemoryInfo } from '@/services/mockData';
import { Cpu, Database, Server } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface SystemMemoryInfoProps {
  systemInfo: SystemMemoryInfo;
}

const SystemMemoryInfoComponent: React.FC<SystemMemoryInfoProps> = ({ systemInfo }) => {
  return (
    <Card className="border border-cyber-blue/30 bg-cyber-dark shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-cyber-blue cyber-text-shadow flex items-center gap-2">
          <Database className="h-5 w-5 text-cyber-blue" />
          System Memory
        </CardTitle>
        <CardDescription>Current memory usage statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Memory Usage</span>
              <span className="text-cyber-blue">{systemInfo.memoryUsagePercentage}%</span>
            </div>
            <Progress 
              value={systemInfo.memoryUsagePercentage} 
              className="h-2 bg-cyber-darker" 
              indicatorClassName="bg-gradient-to-r from-cyan-500 to-cyber-blue" 
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-cyber-darker p-3 rounded-md border border-cyber-blue/20">
              <div className="text-xs text-muted-foreground">Total Memory</div>
              <div className="text-lg font-medium cyber-text-shadow">{systemInfo.totalMemory}</div>
            </div>
            <div className="bg-cyber-darker p-3 rounded-md border border-cyber-blue/20">
              <div className="text-xs text-muted-foreground">Used Memory</div>
              <div className="text-lg font-medium cyber-text-shadow">{systemInfo.usedMemory}</div>
            </div>
            <div className="bg-cyber-darker p-3 rounded-md border border-cyber-blue/20">
              <div className="text-xs text-muted-foreground">Free Memory</div>
              <div className="text-lg font-medium cyber-text-shadow">{systemInfo.freeMemory}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-cyber-darker p-3 rounded-md border border-cyber-blue/20">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Server size={12} />
                Physical Memory
              </div>
              <div className="text-sm font-medium mt-1">{systemInfo.totalMemory} Physical RAM</div>
              <div className="mt-2">
                <Progress 
                  value={systemInfo.memoryUsagePercentage} 
                  className="h-1.5 bg-cyber-darker/50" 
                  indicatorClassName="bg-green-500" 
                />
              </div>
            </div>
            <div className="bg-cyber-darker p-3 rounded-md border border-cyber-blue/20">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Cpu size={12} />
                Memory Allocation
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs">Processes: {systemInfo.processesMemoryPercentage}%</span>
                <span className="text-xs">System: {100 - systemInfo.processesMemoryPercentage}%</span>
              </div>
              <div className="mt-2">
                <div className="w-full bg-cyber-darker/50 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyber-blue" 
                    style={{ width: `${systemInfo.processesMemoryPercentage}%` }}
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
