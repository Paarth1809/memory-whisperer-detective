
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { NetworkConnection } from '@/services/mockData';
import { Search, Network, AlertTriangle, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface NetworkConnectionsProps {
  connections: NetworkConnection[];
}

const NetworkConnections: React.FC<NetworkConnectionsProps> = ({ connections }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'suspicious'>('all');
  
  const filteredConnections = connections.filter((conn) => {
    const matchesSearch = 
      conn.processName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conn.localAddress.includes(searchTerm) ||
      conn.remoteAddress.includes(searchTerm) ||
      conn.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conn.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conn.pid.toString().includes(searchTerm);
      
    if (filter === 'suspicious') {
      return matchesSearch && conn.isSuspicious;
    }
    
    return matchesSearch;
  });

  return (
    <Card className="border border-cyber-blue/30 shadow-lg bg-cyber-dark">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-cyber-blue cyber-text-shadow flex items-center gap-2">
          <Network size={20} className="text-cyber-blue" />
          Network Connections
          <Badge className="ml-2 bg-cyan-700/50 text-cyan-100">
            {filteredConnections.length} / {connections.length}
          </Badge>
        </CardTitle>
        <div className="flex items-center w-1/3">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search connections..."
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
              All Connections
            </TabsTrigger>
            <TabsTrigger 
              value="suspicious" 
              onClick={() => setFilter('suspicious')}
              className="data-[state=active]:bg-cyber-red data-[state=active]:text-white"
            >
              Suspicious Only
              {connections.filter(c => c.isSuspicious).length > 0 && (
                <Badge className="ml-2 bg-cyber-red text-white">
                  {connections.filter(c => c.isSuspicious).length}
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
                <TableHead>Process</TableHead>
                <TableHead>Protocol</TableHead>
                <TableHead>Local Address</TableHead>
                <TableHead>Remote Address</TableHead>
                <TableHead>State</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredConnections.length > 0 ? (
                filteredConnections.map((connection, index) => (
                  <TableRow 
                    key={index}
                    className={
                      connection.isSuspicious 
                        ? "bg-red-900/20 hover:bg-red-900/30 border-l-4 border-l-cyber-red" 
                        : ""
                    }
                  >
                    <TableCell className="font-mono">{connection.pid}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {connection.processName}
                        {connection.isSuspicious && (
                          <AlertTriangle size={16} className="text-cyber-red animate-pulse" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{connection.protocol}</TableCell>
                    <TableCell className="font-mono">
                      {connection.localAddress}:{connection.localPort}
                    </TableCell>
                    <TableCell className="font-mono">
                      <span className="flex items-center gap-1">
                        <Globe size={14} />
                        {connection.remoteAddress}:{connection.remotePort}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          connection.state === "ESTABLISHED" 
                            ? "border-green-500 text-green-400" 
                            : "border-yellow-500 text-yellow-400"
                        }
                      >
                        {connection.state}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No connections match your filter criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {filteredConnections.filter(c => c.isSuspicious).length > 0 && (
          <div className="mt-4 p-3 bg-red-950/30 border border-cyber-red/40 rounded-md">
            <h3 className="text-cyber-red flex items-center gap-2 font-medium mb-2">
              <AlertTriangle size={16} />
              Suspicious Network Connections
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {filteredConnections
                .filter(c => c.isSuspicious)
                .map((conn, idx) => (
                  <li key={idx} className="text-sm">
                    <span className="text-cyber-red font-medium">{conn.processName} (PID: {conn.pid})</span> 
                    {' '}connecting to potentially malicious endpoint{' '}
                    <span className="font-mono">{conn.remoteAddress}:{conn.remotePort}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NetworkConnections;
