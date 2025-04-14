
import { SystemMemoryInfo } from '@/services/mockData';

export interface BottleneckInfo {
  name: string;
  impact: string;
  suggestion: string;
}

// Determine risk level based on memory analysis score
export const getRiskLevel = (memoryAnalysisScore: number | null) => {
  if (memoryAnalysisScore === null) return { level: "scanning", color: "text-cyber-blue" };
  if (memoryAnalysisScore < 30) return { level: "Low", color: "text-green-400" };
  if (memoryAnalysisScore < 60) return { level: "Moderate", color: "text-yellow-400" };
  return { level: "High", color: "text-cyber-red" };
};

// Calculate memory fragmentation percentage based on usage patterns
export const calculateFragmentationPercentage = (systemInfo: SystemMemoryInfo) => {
  return Math.round(systemInfo.memoryUsagePercentage * 0.2 + systemInfo.processesMemoryPercentage * 0.3);
};

// Calculate projected time until memory issues
export const calculateTimeUntilMemoryIssues = (riskLevel: { level: string; color: string }) => {
  if (riskLevel.level === "Low") return "None expected";
  if (riskLevel.level === "Moderate") return "4-6 hours";
  if (riskLevel.level === "High") return "1-2 hours";
  return "Calculating...";
};

// Calculate memory bottlenecks
export const calculateBottlenecks = (
  systemInfo: SystemMemoryInfo,
  memoryAnalysisScore: number | null,
  fragmentationPercentage: number
): BottleneckInfo[] => {
  if (memoryAnalysisScore === null) return [];
  
  const bottlenecks: BottleneckInfo[] = [];
  
  if (systemInfo.memoryUsagePercentage > 70) {
    bottlenecks.push({
      name: "High Memory Usage",
      impact: "Severe",
      suggestion: "Close unused applications"
    });
  } else if (systemInfo.memoryUsagePercentage > 50) {
    bottlenecks.push({
      name: "Moderate Memory Usage",
      impact: "Medium",
      suggestion: "Monitor usage patterns"
    });
  }
  
  if (fragmentationPercentage > 40) {
    bottlenecks.push({
      name: "Memory Fragmentation",
      impact: fragmentationPercentage > 60 ? "Severe" : "Medium",
      suggestion: "Restart memory-intensive applications"
    });
  }
  
  if (systemInfo.processesMemoryPercentage > 80) {
    bottlenecks.push({
      name: "Process Memory Allocation",
      impact: "High",
      suggestion: "Identify memory-heavy processes"
    });
  }
  
  return bottlenecks;
};
