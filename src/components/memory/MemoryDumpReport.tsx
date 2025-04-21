
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText } from 'lucide-react';

interface MemoryDumpReportProps {
  analysisResults: Record<string, string>;
}

const MemoryDumpReport: React.FC<MemoryDumpReportProps> = ({ analysisResults }) => {
  // Only show completed
  const completed = Object.entries(analysisResults);

  if (completed.length === 0) return null;

  return (
    <Card className="border border-cyber-blue/20 bg-cyber-darker mt-8">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <FileText size={18} className="text-cyber-blue" />
          <CardTitle className="text-cyber-blue text-lg">Memory Dump Analysis Report</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completed.map(([type, result]) => (
                <TableRow key={type}>
                  <TableCell className="font-medium text-cyber-blue">{type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</TableCell>
                  <TableCell>{result}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemoryDumpReport;

