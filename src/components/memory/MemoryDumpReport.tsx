import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileDown, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { Toast } from '@/components/ui/use-toast';

interface AnalysisResult {
  title: string;
  result: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'success':
      return <CheckCircle size={16} className="text-green-500 mr-2" />;
    case 'warning':
      return <AlertTriangle size={16} className="text-yellow-500 mr-2" />;
    case 'error':
      return <XCircle size={16} className="text-red-500 mr-2" />;
    case 'info':
      return <Info size={16} className="text-blue-500 mr-2" />;
    default:
      return null;
  }
};

const MemoryDumpReport: React.FC<{
  analysisResults: Record<string, { result: string; completedAt: string }>;
}> = ({ analysisResults }) => {
  const reportTitle = 'Memory Dump Analysis Report';
  const reportDate = new Date().toLocaleDateString();
  const reportTime = new Date().toLocaleTimeString();

  const generateReport = () => {
    let reportContent = `# ${reportTitle}\n\n`;
    reportContent += `**Date:** ${reportDate}\n`;
    reportContent += `**Time:** ${reportTime}\n\n`;
    reportContent += `## Analysis Results\n\n`;

    Object.entries(analysisResults).forEach(([key, value]) => {
      reportContent += `### ${key}\n`;
      reportContent += `**Completed At:** ${value.completedAt}\n`;
      reportContent += `\`\`\`text\n${value.result}\n\`\`\`\n\n`;
    });

    return reportContent;
  };

  const handleDownload = () => {
    const content = generateReport();
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'memory_dump_report.md';
    
    // Fix the URL revocation
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 100);
  };

  return (
    <Card className="border border-cyber-blue/30 bg-cyber-dark shadow-lg">
      <CardHeader>
        <CardTitle className="text-cyber-blue cyber-text-shadow">Memory Dump Analysis Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p>
            <strong>Date:</strong> {reportDate}
          </p>
          <p>
            <strong>Time:</strong> {reportTime}
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Analysis</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Completed At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(analysisResults).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell className="font-medium">{key}</TableCell>
                <TableCell>
                  <pre className="whitespace-pre-wrap break-words font-mono text-xs">
                    {value.result}
                  </pre>
                </TableCell>
                <TableCell>{value.completedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={handleDownload} className="mt-4 bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-dark font-medium">
          <FileDown className="mr-2" size={16} />
          Download Report
        </Button>
      </CardContent>
    </Card>
  );
};

export default MemoryDumpReport;
