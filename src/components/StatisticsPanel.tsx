
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldCheck, AlertTriangle, PieChart, Clock } from 'lucide-react';

// Mock data for the statistics panel
const data = [
  { name: 'Mon', spam: 12, safe: 24 },
  { name: 'Tue', spam: 18, safe: 28 },
  { name: 'Wed', spam: 15, safe: 30 },
  { name: 'Thu', spam: 25, safe: 22 },
  { name: 'Fri', spam: 20, safe: 27 },
  { name: 'Sat', spam: 8, safe: 15 },
  { name: 'Sun', spam: 5, safe: 10 },
];

const StatisticsPanel: React.FC = () => {
  // Calculate summary statistics
  const totalMessages = data.reduce((sum, day) => sum + day.spam + day.safe, 0);
  const totalSpam = data.reduce((sum, day) => sum + day.spam, 0);
  const spamPercentage = Math.round((totalSpam / totalMessages) * 100);
  
  return (
    <div className="w-full">
      <div className="glass rounded-2xl p-6 animate-fade-in animate-delay-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Spam Statistics</h2>
          <div className="text-sm text-muted-foreground flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Last 7 days
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/50 rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Messages</p>
                <h3 className="text-3xl font-semibold mt-1">{totalMessages}</h3>
              </div>
              <div className="p-2 rounded-full bg-secondary/80">
                <PieChart className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              +12% from last week
            </div>
          </div>
          
          <div className="bg-white/50 rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Detected Spam</p>
                <h3 className="text-3xl font-semibold mt-1">{totalSpam}</h3>
              </div>
              <div className="p-2 rounded-full bg-destructive/10">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              {spamPercentage}% of total messages
            </div>
          </div>
          
          <div className="bg-white/50 rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Safe Messages</p>
                <h3 className="text-3xl font-semibold mt-1">{totalMessages - totalSpam}</h3>
              </div>
              <div className="p-2 rounded-full bg-green-500/10">
                <ShieldCheck className="w-5 h-5 text-green-500" />
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              {100 - spamPercentage}% of total messages
            </div>
          </div>
        </div>
        
        <div className="h-64 w-full bg-white/50 rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-medium mb-4">Weekly Message Analysis</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="safe" stackId="a" fill="rgba(34, 197, 94, 0.7)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="spam" stackId="a" fill="rgba(239, 68, 68, 0.7)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
