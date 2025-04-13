
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Process } from '@/services/mockData';
import { Search, AlertTriangle, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProcessListProps {
  processes: Process[];
}

const ProcessList: React.FC<ProcessListProps> = ({ processes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'suspicious'>('all');
  
  const filteredProcesses = processes.filter((process) => {
    const matchesSearch = 
      process.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.pid.toString().includes(searchTerm);
      
    if (filter === 'suspicious') {
      return matchesSearch && process.isSuspicious;
    }
    
    return matchesSearch;
  });

  return (
    <Card className="border border-cyber-blue/30 shadow-lg bg-cyber-dark">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-cyber-blue cyber-text-shadow flex items-center gap-2">
          Processes
          <Badge className="ml-2 bg-cyan-700/50 text-cyan-100">
            {filteredProcesses.length} / {processes.length}
          </Badge>
        </CardTitle>
        <div className="flex items-center w-1/3">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search processes..."
              className="pl-8 bg-cyber-darker border-cyber-blue/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="mb-4">
          <TabsList className="bg-cyber-darker border border-cyber-blue/20">
            <TabsTrigger 
              value="all" 
              onClick={() => setFilter('all')}
              className="data-[state=active]:bg-cyber-blue data-[state=active]:text-cyber-dark"
            >
              All Processes
            </TabsTrigger>
            <TabsTrigger 
              value="suspicious" 
              onClick={() => setFilter('suspicious')}
              className="data-[state=active]:bg-cyber-red data-[state=active]:text-white"
            >
              Suspicious Only
              {processes.filter(p => p.isSuspicious).length > 0 && (
                <Badge className="ml-2 bg-cyber-red text-white">
                  {processes.filter(p => p.isSuspicious).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="rounded-md border border-cyber-blue/30 overflow-hidden">
          <Table>
            <TableHeader className="bg-cyber-darker">
              <TableRow>
                <TableHead className="w-[80px]">PID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>Memory</TableHead>
                <TableHead>Command Line</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProcesses.length > 0 ? (
                filteredProcesses.map((process) => (
                  <TableRow 
                    key={process.pid}
                    className={
                      process.isSuspicious 
                        ? "bg-red-900/20 hover:bg-red-900/30 border-l-4 border-l-cyber-red" 
                        : ""
                    }
                  >
                    <TableCell className="font-mono">{process.pid}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {process.name}
                        {process.isSuspicious && (
                          <AlertTriangle size={16} className="text-cyber-red animate-pulse" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{process.path}</TableCell>
                    <TableCell>{process.user}</TableCell>
                    <TableCell>{process.startTime}</TableCell>
                    <TableCell>{process.memoryUsage}</TableCell>
                    <TableCell className="max-w-[300px] truncate font-mono text-xs">
                      {process.cmdline}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No processes match your filter criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {filteredProcesses.filter(p => p.isSuspicious).length > 0 && (
          <div className="mt-4 p-3 bg-red-950/30 border border-cyber-red/40 rounded-md">
            <h3 className="text-cyber-red flex items-center gap-2 font-medium mb-2">
              <AlertTriangle size={16} />
              Suspicious Process Details
            </h3>
            {filteredProcesses
              .filter(p => p.isSuspicious)
              .map(process => (
                <div key={`detail-${process.pid}`} className="mb-2 pb-2 border-b border-cyber-red/20 last:border-b-0 last:mb-0 last:pb-0">
                  <p className="text-sm">
                    <span className="text-cyber-red font-medium">{process.name} (PID: {process.pid})</span>: {process.suspiciousReason}
                  </p>
                </div>
              ))
            }
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProcessList;
