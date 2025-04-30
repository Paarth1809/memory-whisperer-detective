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
  category: 'analysis' | 'detection' | 'extraction' | 'visualization' | 'utilities' | 'volatility';
}

export interface VolatilityPlugin {
  id: string;
  name: string;
  description: string;
  category: string;
  requirements: string[];
  compatibility: string[];
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

// Get volatility plugins by category
export const getVolatilityPluginsByCategory = (category: string): VolatilityPlugin[] => {
  return getAllVolatilityPlugins().filter(plugin => plugin.category === category);
};

// Get all volatility plugins
export const getAllVolatilityPlugins = (): VolatilityPlugin[] => {
  return [
    // Process Analysis Plugins
    {
      id: "pslist",
      name: "PsList",
      description: "List running processes from _EPROCESS pool",
      category: "processes",
      requirements: ["_EPROCESS"],
      compatibility: ["Windows", "Linux"]
    },
    {
      id: "psscan",
      name: "PsScan",
      description: "Scan for processes using pool tag scanning",
      category: "processes",
      requirements: ["_POOL_HEADER"],
      compatibility: ["Windows"]
    },
    {
      id: "pstree",
      name: "PsTree",
      description: "Display process tree hierarchy",
      category: "processes",
      requirements: ["_EPROCESS"],
      compatibility: ["Windows", "Linux"]
    },
    {
      id: "cmdline",
      name: "CmdLine",
      description: "Extract command line arguments for processes",
      category: "processes",
      requirements: ["_EPROCESS", "PEB"],
      compatibility: ["Windows"]
    },
    
    // Memory Analysis Plugins
    {
      id: "memmap",
      name: "MemMap",
      description: "Print memory map for processes",
      category: "memory",
      requirements: ["_EPROCESS", "VAD"],
      compatibility: ["Windows"]
    },
    {
      id: "vadinfo",
      name: "VADInfo",
      description: "Analyze Virtual Address Descriptors",
      category: "memory",
      requirements: ["VAD"],
      compatibility: ["Windows"]
    },
    {
      id: "vadwalk",
      name: "VADWalk",
      description: "Walk the VAD tree",
      category: "memory",
      requirements: ["VAD"],
      compatibility: ["Windows"]
    },
    {
      id: "vadtree",
      name: "VADTree",
      description: "Display Visual VAD Tree",
      category: "memory",
      requirements: ["VAD"],
      compatibility: ["Windows"]
    },
    
    // Registry Analysis Plugins
    {
      id: "hivelist",
      name: "HiveList",
      description: "List registry hives in memory",
      category: "registry",
      requirements: ["_CMHIVE"],
      compatibility: ["Windows"]
    },
    {
      id: "printkey",
      name: "PrintKey",
      description: "Print registry key and subkeys/values",
      category: "registry",
      requirements: ["_CMHIVE"],
      compatibility: ["Windows"]
    },
    {
      id: "hivedump",
      name: "HiveDump",
      description: "Print all keys and values from a hive",
      category: "registry",
      requirements: ["_CMHIVE"],
      compatibility: ["Windows"]
    },
    {
      id: "userassist",
      name: "UserAssist",
      description: "Extract UserAssist registry information",
      category: "registry",
      requirements: ["_CMHIVE"],
      compatibility: ["Windows"]
    },
    
    // Network Analysis Plugins
    {
      id: "netscan",
      name: "NetScan",
      description: "Scan for network artifacts",
      category: "network",
      requirements: ["_TCP_ENDPOINT", "_UDP_ENDPOINT"],
      compatibility: ["Windows 7+"]
    },
    {
      id: "connections",
      name: "Connections",
      description: "List TCP connections",
      category: "network",
      requirements: ["_TCPT_OBJECT"],
      compatibility: ["Windows XP/2003"]
    },
    {
      id: "connscan",
      name: "ConnScan",
      description: "Scan for connection objects",
      category: "network",
      requirements: ["_TCPT_OBJECT"],
      compatibility: ["Windows XP/2003"]
    },
    {
      id: "sockets",
      name: "Sockets",
      description: "List open sockets",
      category: "network",
      requirements: ["_ADDRESS_OBJECT"],
      compatibility: ["Windows XP/2003"]
    },
    
    // Malware Analysis Plugins
    {
      id: "malfind",
      name: "MalFind",
      description: "Find hidden or injected code/DLLs",
      category: "malware",
      requirements: ["VAD", "_EPROCESS"],
      compatibility: ["Windows"]
    },
    {
      id: "yarascan",
      name: "YaraScan",
      description: "Scan process or kernel memory with Yara rules",
      category: "malware",
      requirements: ["Yara rules"],
      compatibility: ["Windows", "Linux", "Mac"]
    },
    {
      id: "apihooks",
      name: "ApiHooks",
      description: "Detect API hooks in process/kernel memory",
      category: "malware",
      requirements: ["_EPROCESS"],
      compatibility: ["Windows"]
    },
    {
      id: "dlllist",
      name: "DLLList",
      description: "List loaded DLLs for each process",
      category: "malware",
      requirements: ["_EPROCESS", "PEB"],
      compatibility: ["Windows"]
    },
    
    // Artifact Extraction Plugins
    {
      id: "filescan",
      name: "FileScan",
      description: "Scan for file objects",
      category: "artifacts",
      requirements: ["_FILE_OBJECT"],
      compatibility: ["Windows"]
    },
    {
      id: "shimcache",
      name: "ShimCache",
      description: "Extract Application Compatibility Cache",
      category: "artifacts",
      requirements: ["Registry"],
      compatibility: ["Windows"]
    },
    {
      id: "timeliner",
      name: "TimeLiner",
      description: "Create timeline from various artifacts",
      category: "artifacts",
      requirements: ["Multiple"],
      compatibility: ["Windows"]
    },
    {
      id: "handles",
      name: "Handles",
      description: "List process handles",
      category: "artifacts",
      requirements: ["_EPROCESS"],
      compatibility: ["Windows"]
    },
    
    // Kernel Analysis Plugins
    {
      id: "modules",
      name: "Modules",
      description: "List loaded kernel modules",
      category: "kernel",
      requirements: ["_LDR_DATA_TABLE_ENTRY"],
      compatibility: ["Windows"]
    },
    {
      id: "modscan",
      name: "ModScan",
      description: "Scan for kernel modules",
      category: "kernel",
      requirements: ["_POOL_HEADER"],
      compatibility: ["Windows"]
    },
    {
      id: "ssdt",
      name: "SSDT",
      description: "Display System Service Descriptor Table",
      category: "kernel",
      requirements: ["SSDT"],
      compatibility: ["Windows"]
    },
    {
      id: "callbacks",
      name: "Callbacks",
      description: "List kernel callbacks",
      category: "kernel",
      requirements: ["Kernel structures"],
      compatibility: ["Windows"]
    },
    
    // Windows Specific Plugins
    {
      id: "shellbags",
      name: "ShellBags",
      description: "Recover shellbag information",
      category: "windows",
      requirements: ["Registry"],
      compatibility: ["Windows"]
    },
    {
      id: "amcache",
      name: "AmCache",
      description: "Extract AmCache registry information",
      category: "windows",
      requirements: ["Registry"],
      compatibility: ["Windows 8+"]
    },
    {
      id: "prefetchparser",
      name: "PrefetchParser",
      description: "Extract prefetch files information",
      category: "windows",
      requirements: ["Prefetch files"],
      compatibility: ["Windows"]
    },
    {
      id: "getsids",
      name: "GetSIDs",
      description: "Extract Security Identifiers for processes",
      category: "windows",
      requirements: ["_TOKEN", "_EPROCESS"],
      compatibility: ["Windows"]
    }
  ];
};

// Provide detailed information for a specific volatility plugin
export const getVolatilityPluginDetails = (pluginId: string): VolatilityPlugin | undefined => {
  return getAllVolatilityPlugins().find(plugin => plugin.id === pluginId);
};

// Generate volatility command for selected plugin
export const generateVolatilityCommand = (
  pluginId: string, 
  memoryDumpPath: string,
  profile: string = "Win10x64_18362",
  additionalOptions: Record<string, string> = {}
): string => {
  let command = `volatility -f "${memoryDumpPath}" --profile=${profile} ${pluginId}`;
  
  // Add any additional options
  Object.entries(additionalOptions).forEach(([key, value]) => {
    if (value) {
      command += ` --${key}=${value}`;
    } else {
      command += ` --${key}`;
    }
  });
  
  return command;
};

// Generate realistic volatility plugin output
export const generateVolatilityPluginOutput = (pluginId: string): string => {
  const outputs: Record<string, string> = {
    // Process plugins
    "pslist": `Volatility Foundation Volatility Framework 2.6
Offset(V)          Name                    PID   PPID   Thds     Hnds   Sess  Wow64 Start
------------------ -------------------- ------ ------ ------ -------- ------ ------ --------------------
0xffffe00124a5c080 System                    4      0    145        0 ------      0 2023-04-13 08:22:43
0xffffe00124f00080 Registry                104      4      4        0 ------      0 2023-04-13 08:22:38
0xffffe0012b8c4080 smss.exe                336      4      3        0 ------      0 2023-04-13 08:22:43
0xffffe0012eadf080 csrss.exe               504    496     10        0 ------      0 2023-04-13 08:23:05
0xffffe0012eb7e080 wininit.exe             584    496      3        0 ------      0 2023-04-13 08:23:06
0xffffe0012eba0080 csrss.exe               592    576     11        0 ------      0 2023-04-13 08:23:06
0xffffe0012ee36080 services.exe            680    584     10        0 ------      0 2023-04-13 08:23:08
0xffffe0012ee49080 lsass.exe               688    584      8        0 ------      0 2023-04-13 08:23:08
0xffffe0012ee54080 svchost.exe             716    680     27        0 ------      0 2023-04-13 08:23:08
0xffffe0012ef3c080 svchost.exe             780    680     22        0 ------      0 2023-04-13 08:23:08
0xffffe0012ef8a080 fontdrvhost.exe         816    584      5        0 ------      0 2023-04-13 08:23:08
0xffffe0012ef9b080 fontdrvhost.exe         824    608      5        0 ------      0 2023-04-13 08:23:08
0xffffe0012eabb080 powershell.exe         1338   1324     19        0 ------      0 2023-04-13 10:46:33
0xffffe0012ea1c080 svchost.exe            1339   1324      7        0 ------      0 2023-04-13 10:48:22
[...]`,

    "psscan": `Volatility Foundation Volatility Framework 2.6
Offset(P)          Name                PID pslist PDB                Time created                   Time exited
------------------ ---------------- ------ ------ ------------------ ------------------------------ ------------------------------
0x000000012b8c4080 smss.exe            336 True   0xbfad82c9e0000000 2023-04-13 08:22:43           
0x000000012eadf080 csrss.exe           504 True   0xbfad80112c400000 2023-04-13 08:23:05           
0x000000012eb7e080 wininit.exe         584 True   0xbfad82c9e0000000 2023-04-13 08:23:06           
0x000000012eba0080 csrss.exe           592 True   0xbfad80112c400000 2023-04-13 08:23:06           
0x000000012ec29080 winlogon.exe        640 True   0xbfad82c9e0000000 2023-04-13 08:23:07           
0x000000012ee36080 services.exe        680 True   0xbfad82c9e0000000 2023-04-13 08:23:08           
0x000000012ee49080 lsass.exe           688 True   0xbfad82c9e0000000 2023-04-13 08:23:08           
0x000000012ee54080 svchost.exe         716 True   0xbfad82c9e0000000 2023-04-13 08:23:08           
0x000000012eabb080 powershell.exe     1338 True   0xbfad82c9e0000000 2023-04-13 10:46:33           
0x000000012ea1c080 svchost.exe        1339 True   0xbfad82c9e0000000 2023-04-13 10:48:22           
0x00000001093ce080 cmd.exe            1540 False  0xbfad82c9e0000000 2023-04-13 10:47:18           2023-04-13 10:49:35
[...]`,

    // Network plugins
    "netscan": `Volatility Foundation Volatility Framework 2.6
Offset(P)          Proto    Local Address                  Foreign Address      State            Pid      Owner          Created
0x5cd419c22350     TCPv4    192.168.1.100:49500           45.77.123.18:443     ESTABLISHED      1338     powershell.exe 2023-04-13 10:46:45
0x5cd419ca3a60     TCPv4    192.168.1.100:49501           103.195.103.66:8080  ESTABLISHED      1339     svchost.exe    2023-04-13 10:48:32
0x5cd419ccbdb0     TCPv4    192.168.1.100:49234           142.250.185.174:443  ESTABLISHED      1600     chrome.exe     2023-04-13 11:32:15
0x5cd419d09a40     TCPv4    192.168.1.100:49233           20.189.173.15:443    ESTABLISHED      400      svchost.exe    2023-04-13 09:15:22
0x5cd419d18f20     UDPv4    0.0.0.0:5355                  *:*                                   780      svchost.exe    
0x5cd419d26710     TCPv4    0.0.0.0:445                   *:*                  LISTENING        4        System         
0x5cd419d34bd0     TCPv4    0.0.0.0:135                   *:*                  LISTENING        716      svchost.exe    
0x5cd419d359f0     TCPv4    0.0.0.0:49664                 *:*                  LISTENING        492      lsass.exe      
0x5cd419d3ef00     UDPv4    0.0.0.0:3702                  *:*                                   3808     svchost.exe    
0x5cd419d3fa10     UDPv4    0.0.0.0:3702                  *:*                                   3808     svchost.exe    
[...]`,

    // Malware plugins
    "malfind": `Volatility Foundation Volatility Framework 2.6
Process: powershell.exe Pid: 1338 Address: 0x49f323a0000
Flags: CommitCharge: 2, MemCommit: 1, PrivateMemory: 1, Protection: 6

0x000049f323a0000  4d 5a 90 00 03 00 00 00 04 00 00 00 ff ff 00 00   MZ..............
0x000049f323a0010  b8 00 00 00 00 00 00 00 40 00 00 00 00 00 00 00   ........@.......
0x000049f323a0020  00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00   ................
0x000049f323a0030  00 00 00 00 00 00 00 00 00 00 00 00 80 00 00 00   ................

0x000049f323a0000 4d               DEC EBP
0x000049f323a0001 5a               POP EDX
0x000049f323a0002 90               NOP
0x000049f323a0003 0003             ADD [EBX], AL
[...]

Process: svchost.exe Pid: 1339 Address: 0x28e92150000
Flags: CommitCharge: 4, MemCommit: 1, PrivateMemory: 1, Protection: 6

0x00028e92150000  fc e8 89 00 00 00 60 89 e5 31 d2 64 8b 52 30 8b   ......\`.1.d.R0.
0x00028e92150010  52 0c 8b 52 14 8b 72 28 0f b7 4a 26 31 ff 31 c0   R..R..r(..J&1.1.
0x00028e92150020  ac 3c 61 7c 02 2c 20 c1 cf 0d 01 c7 e2 f0 52 57   .<a|., .......RW
0x00028e92150030  8b 52 10 8b 42 3c 01 d0 8b 40 78 85 c0 74 4a 01   .R..B<...@x..tJ.

0x00028e92150000 fc               CLD
0x00028e92150001 e889000000       CALL 0x28e9215008f
0x00028e92150006 60               PUSHA
0x00028e92150007 89e5             MOV EBP, ESP
[...]`,

    "yarascan": `Volatility Foundation Volatility Framework 2.6
Rule: r1
Owner: Process powershell.exe Pid 1338
0x49f323a0000  4d 5a 90 00 03 00 00 00 04 00 00 00 ff ff 00 00   MZ..............
0x49f323a0010  b8 00 00 00 00 00 00 00 40 00 00 00 00 00 00 00   ........@.......

Rule: CREDENTIAL_STEALER
Owner: Process powershell.exe Pid 1338
0x49f324a1200  6c 73 61 73 73 2e 65 78 65 00 77 64 69 67 65 73   lsass.exe.wdiges
0x49f324a1210  74 2e 64 6c 6c 00 6b 65 72 62 65 72 6f 73 2e 64   t.dll.kerberos.d

Rule: COBALT_STRIKE_BEACON
Owner: Process svchost.exe Pid 1339
0x28e92150000  fc e8 89 00 00 00 60 89 e5 31 d2 64 8b 52 30 8b   ......\`.1.d.R0.
0x28e92150010  52 0c 8b 52 14 8b 72 28 0f b7 4a 26 31 ff 31 c0   R..R..r(..J&1.1.
[...]`,

    // Registry plugins
    "hivelist": `Volatility Foundation Volatility Framework 2.6
Virtual            Physical           Name
------------------ ------------------ ----
0xfffff8a000bfc000 0x000000128175f000 \\SystemRoot\\System32\\Config\\SOFTWARE
0xfffff8a000e56000 0x00000012776a3000 \\SystemRoot\\System32\\Config\\DEFAULT
0xfffff8a001294000 0x00000016f721e000 \\SystemRoot\\System32\\Config\\SECURITY
0xfffff8a001313000 0x0000001fecaa2000 \\SystemRoot\\System32\\Config\\SAM
0xfffff8a0019fc000 0x000000166bc11000 \\?\\C:\\Users\\User\\ntuser.dat
0xfffff8a001a45000 0x0000001d0ba95000 \\?\\C:\\Users\\User\\AppData\\Local\\Microsoft\\Windows\\UsrClass.dat
0xfffff8a001a44000 0x0000001d0ba8c000 \\SystemRoot\\System32\\Config\\BBI
0xfffff8a001a6a000 0x000000027aad3000 \\SystemRoot\\System32\\Config\\COMPONENTS
0xfffff8a001c69000 0x00000016b8b1c000 \\SystemRoot\\System32\\Config\\SYSTEM
[...]`,

    // File plugins
    "filescan": `Volatility Foundation Volatility Framework 2.6
Offset(P)            #Ptr   #Hnd Access Name
------------------ ------ ------ ------ ----
0x000000138218e080      2      1 R--r-d \\Device\\HarddiskVolume1\\Windows\\System32\\drivers\\etc\\hosts
0x00000013821c4080     16      0 R--r-d \\Device\\HarddiskVolume1\\Windows\\System32\\config\\systemprofile\\Desktop
0x00000013825e5080      1      1 R--rwd \\Device\\HarddiskVolume1\\Users\\User\\AppData\\Local\\Temp\\svchost.exe
0x00000013825f1080      1      1 R--r-d \\Device\\HarddiskVolume1\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe
0x000000138265d080      2      0 R--r-d \\Device\\HarddiskVolume1\\Program Files\\Google\\Chrome\\Application\\chrome.exe
[...]`,

    // Kernel plugins
    "modules": `Volatility Foundation Volatility Framework 2.6
Offset(P)          Name                 Base             Size File
------------------ -------------------- ------------------ ------------------ ----
0x0000001f2113c750 ntoskrnl.exe         0xfffff8043c000000 0x9f0000          \\SystemRoot\\system32\\ntoskrnl.exe
0x0000001f214f2650 hal.dll              0xfffff8043c9f0000 0x9b000           \\SystemRoot\\system32\\hal.dll
0x0000001f214f28d0 kd.dll               0xfffff8043ca8b000 0x25000           \\SystemRoot\\system32\\kd.dll
0x0000001f214f2b50 mcupdate_GenuineIntel.dll 0xfffff8043cab0000 0x7a000           \\SystemRoot\\system32\\mcupdate_GenuineIntel.dll
0x0000001f214f5650 werkernel.sys        0xfffff8043cb2a000 0x21000           \\SystemRoot\\System32\\drivers\\werkernel.sys
0x0000001f215af240 suspicious_driver.sys 0xfffff8043dcf7000 0x15000           \\SystemRoot\\System32\\drivers\\suspicious_driver.sys
[...]`
  };
  
  return outputs[pluginId] || `Volatility Foundation Volatility Framework 2.6\nNo output available for ${pluginId} plugin. Run the actual plugin for results.`;
};

// Get comprehensive list of forensic features
export const getAllForensicFeatures = (): MemoryForensicFeature[] => {
  return [
    // Original analysis features
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
    },
    
    // Add Volatility-specific features
    {
      id: "volatility-process",
      title: "Volatility Process Analysis",
      description: "Analyze processes using advanced Volatility framework plugins",
      icon: "cpu",
      category: "volatility"
    },
    {
      id: "volatility-memory",
      title: "Volatility Memory Analysis",
      description: "Analyze memory structures using VAD and memory maps",
      icon: "layers",
      category: "volatility"
    },
    {
      id: "volatility-registry",
      title: "Volatility Registry Analysis",
      description: "Extract registry hives and analyze registry artifacts",
      icon: "database",
      category: "volatility"
    },
    {
      id: "volatility-network",
      title: "Volatility Network Analysis",
      description: "Analyze network connections and artifacts",
      icon: "network",
      category: "volatility"
    },
    {
      id: "volatility-malware",
      title: "Volatility Malware Detection",
      description: "Scan for malware artifacts and hidden code",
      icon: "shield-x",
      category: "volatility"
    },
    {
      id: "volatility-artifacts",
      title: "Volatility Artifact Extraction",
      description: "Extract forensic artifacts from memory",
      icon: "file",
      category: "volatility"
    },
    {
      id: "volatility-kernel",
      title: "Volatility Kernel Analysis",
      description: "Analyze kernel structures and drivers",
      icon: "settings",
      category: "volatility"
    }
  ];
};

// Get features by category
export const getFeaturesByCategory = (category: string): MemoryForensicFeature[] => {
  return getAllForensicFeatures().filter(feature => feature.category === category);
};
