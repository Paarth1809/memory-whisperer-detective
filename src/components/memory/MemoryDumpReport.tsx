
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download } from 'lucide-react';

// Extend to accept completion times
interface AnalysisCompletionData {
  result: string;
  completedAt?: string;
}

interface MemoryDumpReportProps {
  analysisResults: Record<string, string | AnalysisCompletionData>;
}

function getFeatureFormatted(type: string) {
  return type.replace(/_/g, ' ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function formatReportForDownload(analysisResults: Record<string, string | AnalysisCompletionData>) {
  let txt = '==== Memory Dump Forensics Report ====\n';
  txt += `Generated: ${new Date().toLocaleString()}\n\n`;
  txt += 'Analysis Results:\n';

  Object.entries(analysisResults).forEach(([type, resultObj], idx) => {
    let featureTitle = getFeatureFormatted(type);
    let result = typeof resultObj === 'string' ? resultObj : resultObj.result;
    let completedAt = typeof resultObj === 'string'
      ? undefined
      : resultObj.completedAt
        ? `Completed at: ${resultObj.completedAt}`
        : undefined;

    txt += `\n${idx + 1}. ${featureTitle}\n`;
    if (completedAt) txt += `   ${completedAt}\n`;
    txt += `   Details: ${result}\n`;
  });

  txt += '\n=====================================\n';
  return txt;
}

const MemoryDumpReport: React.FC<MemoryDumpReportProps> = ({ analysisResults }) => {
  // Support both legacy (string) and extended (object) result types
  const completed = Object.entries(analysisResults);

  if (completed.length === 0) return null;

  // If analysisResults is just a string, create a detail object
  const analysisRows = completed.map(([type, res]) => {
    if (typeof res === 'string') {
      return { type, result: res, completedAt: undefined };
    }
    return { type, result: res.result, completedAt: res.completedAt };
  });

  const downloadReport = () => {
    const reportText = formatReportForDownload(analysisResults);
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `MemoryDumpReport_${new Date().toISOString().replace(/[:.]/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 100);
  };

  return (
    <Card className="border border-cyber-blue/20 bg-cyber-darker mt-8">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <FileText size={18} className="text-cyber-blue" />
          <CardTitle className="text-cyber-blue text-lg flex items-center gap-4">
            Memory Dump Analysis Report
            <button
              onClick={downloadReport}
              type="button"
              className="ml-2 px-3 py-1 text-cyber-blue border border-cyber-blue/40 bg-cyber-dark rounded hover:bg-cyber-blue/10 flex items-center gap-1 transition"
            >
              <Download size={16} /> Download Report
            </button>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Completion Time</TableHead>
                <TableHead>Result Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analysisRows.map(({ type, result, completedAt }) => (
                <TableRow key={type}>
                  <TableCell className="font-medium text-cyber-blue">{getFeatureFormatted(type)}</TableCell>
                  <TableCell className="text-sm">{completedAt || '—'}</TableCell>
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
