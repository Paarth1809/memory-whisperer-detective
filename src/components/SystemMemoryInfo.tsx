
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SystemMemoryInfo } from '@/services/mockData';
import { Database } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import MemoryOverviewTab from './memory/MemoryOverviewTab';
import MemoryAdvancedTab from './memory/MemoryAdvancedTab';
import MemoryScanSection from './memory/MemoryScanSection';
import { 
  getRiskLevel, 
  calculateFragmentationPercentage, 
  calculateTimeUntilMemoryIssues, 
  calculateBottlenecks 
} from './memory/utils/memoryAnalysisHelpers';

interface SystemMemoryInfoProps {
  systemInfo: SystemMemoryInfo;
}

const SystemMemoryInfoComponent: React.FC<SystemMemoryInfoProps> = ({ systemInfo }) => {
  const [showCard, setShowCard] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showScanProgress, setShowScanProgress] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [memoryAnalysisScore, setMemoryAnalysisScore] = useState<number | null>(null);
  const [memoryHealth, setMemoryHealth] = useState<number | null>(null);
  const [memoryEfficiency, setMemoryEfficiency] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'advanced'>('overview');

  useEffect(() => {
    // Reduced delay between animations and shortened duration
    setShowCard(true);
    
    const statsTimer = setTimeout(() => {
      setShowStats(true);
    }, 100);
    
    const metricsTimer = setTimeout(() => {
      setShowMetrics(true);
    }, 200);
    
    const detailsTimer = setTimeout(() => {
      setShowDetails(true);
      setShowScanProgress(true);
    }, 300);
    
    return () => {
      clearTimeout(statsTimer);
      clearTimeout(metricsTimer);
      clearTimeout(detailsTimer);
    };
  }, []);

  useEffect(() => {
    if (!showScanProgress) return;
    
    // Simulate memory analysis progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const next = prev + Math.random() * 5;
        if (next >= 100) {
          clearInterval(interval);
          // Calculate memory analysis score based on memory usage and allocation
          // Lower scores are better (less fragmentation and better performance)
          const score = Math.round(
            (systemInfo.memoryUsagePercentage * 0.6) + 
            (systemInfo.processesMemoryPercentage * 0.4) - 
            15 // Offset for better results
          );
          setMemoryAnalysisScore(Math.max(0, Math.min(100, score)));
          
          // Calculate memory health (higher is better)
          const health = Math.round(
            100 - (systemInfo.memoryUsagePercentage * 0.7)
          );
          setMemoryHealth(Math.max(0, Math.min(100, health)));
          
          // Calculate memory efficiency (higher is better)
          const efficiency = Math.round(
            100 - (systemInfo.processesMemoryPercentage * 0.5) - (score * 0.2)
          );
          setMemoryEfficiency(Math.max(0, Math.min(100, efficiency)));
          
          return 100;
        }
        return next;
      });
    }, 80); // Faster update frequency
    
    return () => clearInterval(interval);
  }, [showScanProgress, systemInfo]);

  // Calculate derived values
  const riskLevel = getRiskLevel(memoryAnalysisScore);
  const fragmentationPercentage = calculateFragmentationPercentage(systemInfo);
  const bottlenecks = calculateBottlenecks(systemInfo, memoryAnalysisScore, fragmentationPercentage);

  return (
    <Card 
      className={`border border-cyber-blue/30 bg-cyber-dark shadow-lg transition-all duration-300 ${
        showCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-cyber-blue cyber-text-shadow flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className={`h-5 w-5 text-cyber-blue transition-transform duration-300 ${showCard ? 'rotate-0' : 'rotate-180'}`} />
            Advanced Memory Analysis
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setSelectedTab('overview')}
              className={`text-sm px-3 py-1 rounded-md transition-colors ${
                selectedTab === 'overview' 
                  ? 'bg-cyber-blue text-cyber-dark' 
                  : 'bg-cyber-darker text-cyber-blue hover:bg-cyber-blue/20'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setSelectedTab('advanced')}
              className={`text-sm px-3 py-1 rounded-md transition-colors ${
                selectedTab === 'advanced' 
                  ? 'bg-cyber-blue text-cyber-dark' 
                  : 'bg-cyber-darker text-cyber-blue hover:bg-cyber-blue/20'
              }`}
            >
              Advanced
            </button>
          </div>
        </CardTitle>
        <CardDescription>Detailed memory performance analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className={`space-y-2 transition-all duration-300 delay-100 ${
            showStats ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="flex justify-between text-sm">
              <span>Memory Usage</span>
              <span className="text-cyber-blue">{systemInfo.memoryUsagePercentage}%</span>
            </div>
            <Progress 
              value={showStats ? systemInfo.memoryUsagePercentage : 0} 
              className="h-2 bg-cyber-darker transition-all duration-500" 
              indicatorClassName="bg-gradient-to-r from-cyan-500 to-cyber-blue" 
            />
          </div>
          
          {selectedTab === 'overview' && (
            <MemoryOverviewTab
              systemInfo={systemInfo}
              showMetrics={showMetrics}
              showDetails={showDetails}
            />
          )}
          
          {selectedTab === 'advanced' && (
            <MemoryAdvancedTab
              systemInfo={systemInfo}
              showDetails={showDetails}
              memoryAnalysisScore={memoryAnalysisScore}
              memoryEfficiency={memoryEfficiency}
              bottlenecks={bottlenecks}
            />
          )}
          
          <MemoryScanSection
            systemInfo={systemInfo}
            showScanProgress={showScanProgress}
            scanProgress={scanProgress}
            memoryAnalysisScore={memoryAnalysisScore}
            riskLevel={riskLevel}
            fragmentationPercentage={fragmentationPercentage}
            calculateTimeUntilMemoryIssues={() => calculateTimeUntilMemoryIssues(riskLevel)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemMemoryInfoComponent;
