
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Process, NetworkConnection } from '@/services/mockData';
import ProcessList from './ProcessList';
import NetworkConnections from './NetworkConnections';
import { Activity, Cpu, Network, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardProps {
  processes: Process[];
  connections: NetworkConnection[];
}

const Dashboard: React.FC<DashboardProps> = ({ processes, connections }) => {
  const suspiciousProcesses = processes.filter(p => p.isSuspicious);
  const suspiciousConnections = connections.filter(c => c.isSuspicious);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-cyber-dark border border-cyber-blue/30">
          <CardHeader className="pb-2">
            <CardDescription>Total Processes</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Cpu size={20} className="text-cyber-blue" />
              {processes.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {suspiciousProcesses.length > 0 ? (
                <span className="text-cyber-red">
                  {suspiciousProcesses.length} suspicious processes detected
                </span>
              ) : (
                <span className="text-green-400">No suspicious processes detected</span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-cyber-dark border border-cyber-blue/30">
          <CardHeader className="pb-2">
            <CardDescription>Network Connections</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Network size={20} className="text-cyber-blue" />
              {connections.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {suspiciousConnections.length > 0 ? (
                <span className="text-cyber-red">
                  {suspiciousConnections.length} suspicious connections detected
                </span>
              ) : (
                <span className="text-green-400">No suspicious connections detected</span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-cyber-dark border border-cyber-blue/30">
          <CardHeader className="pb-2">
            <CardDescription>Memory Usage</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Activity size={20} className="text-cyber-blue" />
              406.9 MB
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Across {processes.length} running processes
            </div>
          </CardContent>
        </Card>

        <Card className="bg-cyber-dark border border-cyber-blue/30">
          <CardHeader className="pb-2">
            <CardDescription>Threat Assessment</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Shield size={20} className={suspiciousProcesses.length > 0 ? "text-cyber-red" : "text-green-400"} />
              {suspiciousProcesses.length > 0 ? "At Risk" : "Secure"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {suspiciousProcesses.length > 0 || suspiciousConnections.length > 0 ? (
                <span className="text-cyber-red">
                  {suspiciousProcesses.length + suspiciousConnections.length} total suspicious activities
                </span>
              ) : (
                <span className="text-green-400">No threats detected in memory dump</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="processes" className="w-full">
        <TabsList className="bg-cyber-darker border border-cyber-blue/30 w-full flex justify-start">
          <TabsTrigger 
            value="processes"
            className="data-[state=active]:bg-cyber-blue data-[state=active]:text-cyber-dark flex items-center gap-2"
          >
            <Cpu size={16} />
            Processes and Services
            {suspiciousProcesses.length > 0 && (
              <span className="bg-cyber-red text-white text-xs px-2 py-0.5 rounded-full ml-2">
                {suspiciousProcesses.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="network"
            className="data-[state=active]:bg-cyber-blue data-[state=active]:text-cyber-dark flex items-center gap-2"
          >
            <Network size={16} />
            Network Connections
            {suspiciousConnections.length > 0 && (
              <span className="bg-cyber-red text-white text-xs px-2 py-0.5 rounded-full ml-2">
                {suspiciousConnections.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="processes" className="mt-4">
          <ProcessList processes={processes} />
        </TabsContent>
        <TabsContent value="network" className="mt-4">
          <NetworkConnections connections={connections} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
