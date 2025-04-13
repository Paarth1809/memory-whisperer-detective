export interface Process {
  pid: number;
  name: string;
  path: string;
  user: string;
  startTime: string;
  memoryUsage: string;
  cmdline: string;
  isSuspicious: boolean;
  suspiciousReason?: string;
}

export interface NetworkConnection {
  pid: number;
  processName: string;
  protocol: string;
  localAddress: string;
  localPort: number;
  remoteAddress: string;
  remotePort: number;
  state: string;
  isSuspicious: boolean;
}

export interface SystemMemoryInfo {
  totalMemory: string;
  usedMemory: string;
  freeMemory: string;
  memoryUsagePercentage: number;
}

export const mockProcesses: Process[] = [
  {
    pid: 4,
    name: "System",
    path: "",
    user: "SYSTEM",
    startTime: "2023-04-13 00:00:00",
    memoryUsage: "120 KB",
    cmdline: "",
    isSuspicious: false
  },
  {
    pid: 400,
    name: "svchost.exe",
    path: "C:\\Windows\\System32\\svchost.exe",
    user: "SYSTEM",
    startTime: "2023-04-13 08:32:15",
    memoryUsage: "12.5 MB",
    cmdline: "C:\\Windows\\System32\\svchost.exe -k netsvcs",
    isSuspicious: false
  },
  {
    pid: 1024,
    name: "explorer.exe",
    path: "C:\\Windows\\explorer.exe",
    user: "User",
    startTime: "2023-04-13 09:15:22",
    memoryUsage: "45.2 MB",
    cmdline: "C:\\Windows\\explorer.exe",
    isSuspicious: false
  },
  {
    pid: 1337,
    name: "cmd.exe",
    path: "C:\\Windows\\System32\\cmd.exe",
    user: "User",
    startTime: "2023-04-13 10:45:12",
    memoryUsage: "4.8 MB",
    cmdline: "C:\\Windows\\System32\\cmd.exe",
    isSuspicious: false
  },
  {
    pid: 1338,
    name: "powershell.exe",
    path: "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
    user: "Administrator",
    startTime: "2023-04-13 10:46:33",
    memoryUsage: "78.5 MB",
    cmdline: "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe -NoP -NonI -W Hidden",
    isSuspicious: true,
    suspiciousReason: "Hidden window parameter"
  },
  {
    pid: 1339,
    name: "svchost.exe",
    path: "C:\\Users\\User\\AppData\\Local\\Temp\\svchost.exe",
    user: "User",
    startTime: "2023-04-13 10:48:22",
    memoryUsage: "15.7 MB",
    cmdline: "C:\\Users\\User\\AppData\\Local\\Temp\\svchost.exe",
    isSuspicious: true,
    suspiciousReason: "System binary running from non-standard location"
  },
  {
    pid: 1600,
    name: "chrome.exe",
    path: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    user: "User",
    startTime: "2023-04-13 11:30:45",
    memoryUsage: "250.2 MB",
    cmdline: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe --type=renderer",
    isSuspicious: false
  }
];

export const mockNetworkConnections: NetworkConnection[] = [
  {
    pid: 400,
    processName: "svchost.exe",
    protocol: "TCP",
    localAddress: "192.168.1.100",
    localPort: 49233,
    remoteAddress: "20.189.173.15",
    remotePort: 443,
    state: "ESTABLISHED",
    isSuspicious: false
  },
  {
    pid: 1600,
    processName: "chrome.exe",
    protocol: "TCP",
    localAddress: "192.168.1.100",
    localPort: 49234,
    remoteAddress: "142.250.185.174",
    remotePort: 443,
    state: "ESTABLISHED",
    isSuspicious: false
  },
  {
    pid: 1338,
    processName: "powershell.exe",
    protocol: "TCP",
    localAddress: "192.168.1.100",
    localPort: 49500,
    remoteAddress: "45.77.123.18",
    remotePort: 443,
    state: "ESTABLISHED",
    isSuspicious: true
  },
  {
    pid: 1339,
    processName: "svchost.exe",
    protocol: "TCP",
    localAddress: "192.168.1.100",
    localPort: 49501,
    remoteAddress: "103.195.103.66",
    remotePort: 8080,
    state: "ESTABLISHED",
    isSuspicious: true
  }
];

export const mockSystemInfo: SystemMemoryInfo = {
  totalMemory: "16.0 GB",
  usedMemory: "8.5 GB",
  freeMemory: "7.5 GB",
  memoryUsagePercentage: 53
};

export const mockAnalyzeSystemMemory = (): Promise<{
  processes: Process[],
  connections: NetworkConnection[],
  systemInfo: SystemMemoryInfo
}> => {
  // In a real application, this would call system APIs to get real memory information
  // For now, we'll just return our mock data after a delay to simulate processing
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        processes: mockProcesses,
        connections: mockNetworkConnections,
        systemInfo: mockSystemInfo
      });
    }, 1000);
  });
};
