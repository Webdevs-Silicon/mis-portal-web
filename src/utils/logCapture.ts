// src/utils/logCapture.ts

interface LogEntry {
  type: 'log' | 'error' | 'warn' | 'info' | 'debug';
  timestamp: string;
  args: any[];
}

class LogCapture {
  private logs: LogEntry[] = [];
  private maxLogs = 1000; // Limit to prevent memory issues
  private isCapturing = false;

  // Store original console methods
  private original = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info,
    debug: console.debug,
    group: console.group,
    groupCollapsed: console.groupCollapsed,
    groupEnd: console.groupEnd,
  };

  startCapture() {
    if (this.isCapturing) return;
    this.isCapturing = true;

    console.log('🔍 Starting log capture...');

    // Override console methods
    console.log = (...args: any[]) => {
      this.addLog('log', args);
      this.original.log.apply(console, args);
    };

    console.error = (...args: any[]) => {
      this.addLog('error', args);
      this.original.error.apply(console, args);
    };

    console.warn = (...args: any[]) => {
      this.addLog('warn', args);
      this.original.warn.apply(console, args);
    };

    console.info = (...args: any[]) => {
      this.addLog('info', args);
      this.original.info.apply(console, args);
    };

    console.debug = (...args: any[]) => {
      this.addLog('debug', args);
      this.original.debug.apply(console, args);
    };

    // Handle console groups
    console.group = (...args: any[]) => {
      this.addLog('log', ['┌─ ' + args.join(' ')]);
      this.original.group.apply(console, args);
    };

    console.groupCollapsed = (...args: any[]) => {
      this.addLog('log', ['┌─ ' + args.join(' ')]);
      this.original.groupCollapsed.apply(console, args);
    };

    console.groupEnd = () => {
      this.addLog('log', ['└─']);
      this.original.groupEnd.apply(console);
    };

    // Expose methods globally
    (window as any).logCapture = this;
  }

  stopCapture() {
    if (!this.isCapturing) return;
    this.isCapturing = false;

    // Restore original console methods
    console.log = this.original.log;
    console.error = this.original.error;
    console.warn = this.original.warn;
    console.info = this.original.info;
    console.debug = this.original.debug;
    console.group = this.original.group;
    console.groupCollapsed = this.original.groupCollapsed;
    console.groupEnd = this.original.groupEnd;

    console.log('🛑 Stopped log capture');
  }

  private addLog(type: LogEntry['type'], args: any[]) {
    this.logs.push({
      type,
      timestamp: new Date().toISOString(),
      args: args.map(arg => {
        // Handle circular references and large objects
        try {
          if (typeof arg === 'object' && arg !== null) {
            // For API responses, keep them readable
            if (arg.data || arg.params || arg.RC !== undefined) {
              return JSON.parse(JSON.stringify(arg));
            }
            // For large objects, show summary
            if (Object.keys(arg).length > 10) {
              return { _type: 'large_object', keys: Object.keys(arg) };
            }
          }
          return arg;
        } catch {
          return String(arg);
        }
      })
    });

    // Keep only last N logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  // Export logs as text file
  exportAsFile(filename = 'console-logs.txt') {
    const logText = this.logs.map(log => {
      const time = log.timestamp.split('T')[1].split('.')[0];
      const type = log.type.toUpperCase().padEnd(5);
      const message = log.args.map(arg => {
        if (typeof arg === 'object') {
          return JSON.stringify(arg, null, 2);
        }
        return String(arg);
      }).join(' ');
      
      return `[${time}] ${type} ${message}`;
    }).join('\n');

    // Create download link
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log(`💾 Logs exported as ${filename}`);
    return filename;
  }

  // Export logs as JSON
  exportAsJson(filename = 'console-logs.json') {
    const json = JSON.stringify(this.logs, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log(`💾 JSON logs exported as ${filename}`);
    return filename;
  }

  // Get filtered logs
  getLogs(filter?: string | RegExp) {
    if (!filter) return this.logs;
    
    return this.logs.filter(log => 
      log.args.some(arg => {
        const text = typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
        return typeof filter === 'string' 
          ? text.includes(filter)
          : filter.test(text);
      })
    );
  }

  // Show logs in console
  showLogs(filter?: string) {
    const filtered = this.getLogs(filter);
    
    console.group(`📊 Showing ${filtered.length} logs${filter ? ` (filtered by: ${filter})` : ''}`);
    filtered.forEach(log => {
      const method = console[log.type] || console.log;
      method.apply(console, [`[${log.timestamp.split('T')[1].split('.')[0]}]`, ...log.args]);
    });
    console.groupEnd();
  }

  // Clear logs
  clearLogs() {
    this.logs = [];
    console.log('🧹 All logs cleared');
  }

  // Get stats
  getStats() {
    const stats = {
      total: this.logs.length,
      byType: {} as Record<string, number>,
      lastHour: this.logs.filter(log => {
        const logTime = new Date(log.timestamp).getTime();
        return Date.now() - logTime < 3600000;
      }).length
    };

    this.logs.forEach(log => {
      stats.byType[log.type] = (stats.byType[log.type] || 0) + 1;
    });

    return stats;
  }
}

// Create singleton instance
const logCapture = new LogCapture();

// Auto-start in development
if (process.env.NODE_ENV === 'development') {
  logCapture.startCapture();
  
  // Expose global commands
  (window as any).logUtils = {
    export: () => logCapture.exportAsFile(),
    exportJson: () => logCapture.exportAsJson(),
    show: (filter?: string) => logCapture.showLogs(filter),
    clear: () => logCapture.clearLogs(),
    stats: () => logCapture.getStats(),
    apiLogs: () => logCapture.showLogs('📤|✅|❌|🔑|📱'), // Show API-related logs
    start: () => logCapture.startCapture(),
    stop: () => logCapture.stopCapture(),
  };

  console.log('🚀 Log capture initialized. Available commands:');
  console.log('  logUtils.export()     - Export logs as text file');
  console.log('  logUtils.exportJson() - Export logs as JSON');
  console.log('  logUtils.show(filter) - Show filtered logs');
  console.log('  logUtils.apiLogs()    - Show API logs only');
  console.log('  logUtils.clear()      - Clear all logs');
  console.log('  logUtils.stats()      - Show log statistics');
}

export default logCapture;