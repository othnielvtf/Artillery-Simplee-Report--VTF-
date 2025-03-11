import React, { useState } from 'react';
import { BarChart, Activity, Users, Clock, AlertTriangle } from 'lucide-react';
import type { ArtilleryReport } from './types';

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(Math.round(num * 100) / 100);
};

const formatDuration = (ms: number): string => {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
};

function App() {
  const [report, setReport] = useState<ArtilleryReport | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          setReport(json);
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {!report ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-zinc-900 p-8 rounded-lg border border-zinc-800 max-w-md w-full">
            <BarChart className="w-16 h-16 mx-auto mb-4 text-white" strokeWidth={1.5} />
            <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Upload Artillery Report</h1>
            <p className="text-zinc-400 mb-6">
              Upload your Artillery JSON report to visualize the load test results
            </p>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Load Test Results</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-blue-400 mr-2" strokeWidth={1.5} />
                <h2 className="text-lg font-medium text-white">Virtual Users</h2>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Created:</span>
                  <span className="font-medium text-white">{formatNumber(report.aggregate.counters['vusers.created'])}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Completed:</span>
                  <span className="font-medium text-emerald-400">{formatNumber(report.aggregate.counters['vusers.completed'])}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Failed:</span>
                  <span className="font-medium text-red-400">{formatNumber(report.aggregate.counters['vusers.failed'])}</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
              <div className="flex items-center mb-4">
                <Activity className="w-6 h-6 text-emerald-400 mr-2" strokeWidth={1.5} />
                <h2 className="text-lg font-medium text-white">HTTP Metrics</h2>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Requests:</span>
                  <span className="font-medium text-white">{formatNumber(report.aggregate.counters['http.requests'])}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Responses:</span>
                  <span className="font-medium text-white">{formatNumber(report.aggregate.counters['http.responses'])}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Request Rate:</span>
                  <span className="font-medium text-white">{formatNumber(report.aggregate.rates['http.request_rate'])}/sec</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-cyan-400 mr-2" strokeWidth={1.5} />
                <h2 className="text-lg font-medium text-white">Response Time</h2>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Median:</span>
                  <span className="font-medium text-white">{formatDuration(report.aggregate.summaries['http.response_time'].median)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">95th percentile:</span>
                  <span className="font-medium text-white">{formatDuration(report.aggregate.summaries['http.response_time'].p95)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">99th percentile:</span>
                  <span className="font-medium text-white">{formatDuration(report.aggregate.summaries['http.response_time'].p99)}</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-400 mr-2" strokeWidth={1.5} />
                <h2 className="text-lg font-medium text-white">Status Codes</h2>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">200 OK:</span>
                  <span className="font-medium text-emerald-400">{formatNumber(report.aggregate.counters['http.codes.200'])}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Success Rate:</span>
                  <span className="font-medium text-white">
                    {formatNumber((report.aggregate.counters['http.codes.200'] / report.aggregate.counters['http.requests']) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
            <h2 className="text-xl font-medium mb-4 text-white">Detailed Metrics</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-800">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">Metric</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider">Min</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider">Max</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider">Mean</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider">Median</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider">p95</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider">p99</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {Object.entries(report.aggregate.summaries).map(([key, value]) => (
                    <tr key={key} className="hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{key}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-zinc-400">{formatDuration(value.min)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-zinc-400">{formatDuration(value.max)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-zinc-400">{formatDuration(value.mean)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-zinc-400">{formatDuration(value.median)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-zinc-400">{formatDuration(value.p95)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-zinc-400">{formatDuration(value.p99)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;