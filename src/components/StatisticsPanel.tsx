import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ShieldCheck, AlertTriangle, PieChart as PieChartIcon, Clock, RefreshCw } from 'lucide-react';
import { spamTrie } from '../utils/trieStructure';
import { Button } from '@/components/ui/button';

const COLORS = ['#ef4444', '#22c55e'];
const CATEGORY_COLORS = ['#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'];

const StatisticsPanel: React.FC = () => {
  const [stats, setStats] = useState(spamTrie.getStatistics());
  
  // Helper function to format date strings
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  // Convert daily stats to chart data format
  const getDailyData = () => {
    const dailyData = [];
    
    // Get the last 7 days (or fewer if we don't have that much data)
    const dates = Object.keys(stats.detectionsByDay).sort();
    const recentDates = dates.slice(-7);
    
    for (const date of recentDates) {
      const dayStats = stats.detectionsByDay[date];
      dailyData.push({
        name: formatDate(date),
        spam: dayStats.spam,
        safe: dayStats.safe
      });
    }
    
    // If we have fewer than 7 days of data, pad with zeros
    if (dailyData.length < 7) {
      const daysToAdd = 7 - dailyData.length;
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      const today = new Date();
      for (let i = 0; i < daysToAdd; i++) {
        const day = new Date();
        day.setDate(today.getDate() - dailyData.length - i);
        const dayName = dayNames[day.getDay()];
        
        dailyData.unshift({
          name: dayName,
          spam: 0,
          safe: 0
        });
      }
    }
    
    return dailyData;
  };
  
  // Prepare category data for pie chart
  const getCategoryData = () => {
    return [
      { name: 'Phishing', value: stats.detectionsByCategory.phishing || 0 },
      { name: 'Financial', value: stats.detectionsByCategory.financial || 0 },
      { name: 'Promotional', value: stats.detectionsByCategory.promotional || 0 },
      { name: 'Malware', value: stats.detectionsByCategory.malware || 0 }
    ].filter(item => item.value > 0);
  };
  
  // Simple breakdown of spam vs safe for pie chart
  const getOverallData = () => {
    return [
      { name: 'Spam', value: stats.spamMessages },
      { name: 'Safe', value: stats.safeMessages }
    ];
  };
  
  // Function to refresh stats from the trie
  const refreshStats = () => {
    setStats(spamTrie.getStatistics());
  };
  
  // Refresh stats when component mounts
  useEffect(() => {
    refreshStats();
  }, []);
  
  // Get data for charts
  const dailyData = getDailyData();
  const categoryData = getCategoryData();
  const overallData = getOverallData();
  
  // Handle no data scenario
  const hasData = stats.totalMessages > 0;
  const hasCategories = categoryData.some(item => item.value > 0);
  
  // Calculate summary statistics
  const totalMessages = stats.totalMessages;
  const totalSpam = stats.spamMessages;
  const spamPercentage = totalMessages > 0 ? Math.round((totalSpam / totalMessages) * 100) : 0;
  
  return (
    <div className="w-full">
      <div className="glass rounded-2xl p-6 animate-fade-in animate-delay-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Spam Statistics</h2>
          <div className="flex gap-2 items-center">
            <div className="text-sm text-muted-foreground flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Recent Activity
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshStats} 
              className="h-8 px-2 text-xs"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh
            </Button>
          </div>
        </div>
        
        {!hasData ? (
          <div className="bg-secondary/20 text-muted-foreground text-center py-8 px-4 rounded-lg">
            <p className="mb-2">No statistics available yet</p>
            <p className="text-sm">Start analyzing messages to generate statistics</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/50 rounded-xl p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Messages</p>
                    <h3 className="text-3xl font-semibold mt-1">{totalMessages}</h3>
                  </div>
                  <div className="p-2 rounded-full bg-secondary/80">
                    <PieChartIcon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                  Messages analyzed with SpamTrie
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
                    <h3 className="text-3xl font-semibold mt-1">{stats.safeMessages}</h3>
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2 bg-white/50 rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-medium mb-4">Daily Message Analysis</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
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
              
              <div className="bg-white/50 rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-medium mb-4">Message Distribution</h3>
                {totalMessages > 0 ? (
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={overallData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {overallData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    No data available
                  </div>
                )}
              </div>
            </div>
            
            {hasCategories && (
              <div className="bg-white/50 rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-medium mb-4">Spam Categories</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-secondary/20 rounded-lg text-center text-sm text-muted-foreground">
              <p>
                Statistics based on {stats.totalMessages} messages analyzed with an average confidence of {Math.round(stats.avgConfidence)}%
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StatisticsPanel;
