import { SystemMemoryInfo } from '@/services/mockData';

export interface BottleneckInfo {
  name: string;
  impact: string;
  suggestion: string;
}

export interface MemoryForensicFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'analysis' | 'detection' | 'extraction' | 'visualization' | 'utilities';
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

// Forensics-specific utility functions
export const analyzeMemoryDump = (fileSize: number) => {
  // In a real implementation, this would analyze an actual memory dump file
  const analysisTime = Math.round(fileSize / (1024 * 1024) * 2); // 2 seconds per MB
  return {
    estimatedTime: analysisTime,
    supportedAnalyses: [
      "process-analysis", 
      "dll-enumeration", 
      "network-analysis", 
      "malware-detection", 
      "string-extraction",
      "file-extraction",
      "volatile-data-parsing",
      "browser-artifact-recovery",
      "credential-harvesting",
      "command-line-history",
      "memory-visualization",
      "registry-dump",
      "timeline-analysis",
      "crypto-detection",
      "yara-scan",
      "plugin-support",
      "report-generation",
      "file-hashing",
      "cross-platform-analysis"
    ]
  };
};

export const getForensicAnalysisStatus = (analysisType: string, completedAnalyses: string[]) => {
  if (completedAnalyses.includes(analysisType)) {
    return "completed";
  }
  return "pending";
};

export const formatAnalysisName = (analysisType: string) => {
  return analysisType
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Get comprehensive list of forensic features
export const getAllForensicFeatures = (): MemoryForensicFeature[] => {
  return [
    {
      id: "process-analysis",
      title: "Process & Thread Analysis",
      description: "Analyze running processes and thread structures",
      icon: "cpu",
      category: "analysis"
    },
    {
      id: "dll-enumeration",
      title: "DLL & Handle Enumeration",
      description: "List loaded DLLs and open handles",
      icon: "library",
      category: "analysis"
    },
    {
      id: "network-analysis",
      title: "Network Connections",
      description: "Map active network connections and sockets",
      icon: "network",
      category: "analysis"
    },
    {
      id: "string-extraction",
      title: "String Extraction",
      description: "Extract and analyze strings from memory",
      icon: "text",
      category: "extraction"
    },
    {
      id: "registry-dump",
      title: "Registry Dumping",
      description: "Extract registry hives from memory",
      icon: "database",
      category: "extraction"
    },
    
    {
      id: "malware-detection",
      title: "Malware Detection",
      description: "Scan for malware signatures in memory",
      icon: "shield-x",
      category: "detection"
    },
    {
      id: "crypto-detection",
      title: "Cryptographic Key Detection",
      description: "Locate encryption keys in memory",
      icon: "key",
      category: "detection"
    },
    {
      id: "yara-scan",
      title: "YARA Rule Scanning",
      description: "Apply custom YARA rules to memory",
      icon: "search",
      category: "detection"
    },
    {
      id: "timeline-analysis",
      title: "Timeline Reconstruction",
      description: "Reconstruct system event timeline",
      icon: "clock",
      category: "analysis"
    },
    
    {
      id: "file-extraction",
      title: "File Extraction",
      description: "Extract files directly from memory dumps",
      icon: "file",
      category: "extraction"
    },
    {
      id: "volatile-data-parsing",
      title: "Volatile Data Parsing",
      description: "Extract volatile system configurations and settings",
      icon: "settings",
      category: "extraction"
    },
    {
      id: "browser-artifact-recovery",
      title: "Browser Artifact Recovery",
      description: "Recover browser history, cookies and cache",
      icon: "globe",
      category: "extraction"
    },
    {
      id: "credential-harvesting",
      title: "Credential Harvesting Detection",
      description: "Identify potential credential theft in memory",
      icon: "key-round",
      category: "detection"
    },
    {
      id: "command-line-history",
      title: "Command Line History",
      description: "Extract command history from shells",
      icon: "terminal",
      category: "extraction"
    },
    
    {
      id: "memory-visualization",
      title: "Memory Visualization",
      description: "Visualize memory structures and relationships",
      icon: "bar-chart-2",
      category: "visualization"
    },
    {
      id: "plugin-support",
      title: "Plugins Support",
      description: "Load additional analysis plugins",
      icon: "puzzle",
      category: "utilities"
    },
    {
      id: "report-generation",
      title: "Report Generation",
      description: "Create detailed forensic reports",
      icon: "file-text",
      category: "utilities"
    },
    {
      id: "file-hashing",
      title: "Integrity Checking",
      description: "Calculate and verify file hashes",
      icon: "hash",
      category: "utilities"
    },
    {
      id: "cross-platform-analysis",
      title: "Cross-Platform Support",
      description: "Analyze memory dumps from various OS platforms",
      icon: "layers",
      category: "utilities"
    },
    
    {
      id: "volatility",
      title: "Volatility Analysis",
      description: "Leverage the Volatility Framework for advanced memory forensics.",
      icon: "cpu",
      category: "analysis"
    },
    {
      id: "flash",
      title: "Flash Artifact Analysis",
      description: "Analyze volatile data with the Flash memory forensics tool.",
      icon: "search",
      category: "analysis"
    },
    {
      id: "flask_sqlalchemy",
      title: "Flask SQLAlchemy Artifacts",
      description: "Detect and analyze Flask SQLAlchemy ORM artifacts in memory.",
      icon: "server",
      category: "analysis"
    }
  ];
};

// Get features by category
export const getFeaturesByCategory = (category: string): MemoryForensicFeature[] => {
  return getAllForensicFeatures().filter(feature => feature.category === category);
};
