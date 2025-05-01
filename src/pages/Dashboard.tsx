import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import StatisticsPanel from '../components/StatisticsPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Filter, Download, RefreshCw } from 'lucide-react';
import { spamTrie } from '../utils/trieStructure';

const COLORS = ['#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'];

const Dashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState('weekly');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [stats, setStats] = useState(spamTrie.getStatistics());
  
  // Helper function to format date strings
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: timeframe === 'weekly' ? 'short' : undefined,
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Refresh stats
  const refreshStats = () => {
    setStats(spamTrie.getStatistics());
  };
  
  // Convert stats to chart data
  const getWeeklyData = () => {
    const weeklyData = [];
    
    // Get dates from last 8 weeks
    const dates = Object.keys(stats.detectionsByDay).sort();
    if (dates.length === 0) {
      // Return mock data if no real data is available
      return [
        { name: 'Week 1', spam: 0, safe: 0 },
        { name: 'Week 2', spam: 0, safe: 0 },
        { name: 'Week 3', spam: 0, safe: 0 },
        { name: 'Week 4', spam: 0, safe: 0 },
        { name: 'Week 5', spam: 0, safe: 0 },
        { name: 'Week 6', spam: 0, safe: 0 },
        { name: 'Week 7', spam: 0, safe: 0 },
        { name: 'Week 8', spam: 0, safe: 0 }
      ];
    }
    
    // Group by week
    const weeks: Record<string, { spam: number, safe: number }> = {};
    let weekCounter = 1;
    
    for (let i = 0; i < dates.length; i += 7) {
      const weekDates = dates.slice(i, i + 7);
      const weekName = `Week ${weekCounter}`;
      weeks[weekName] = { spam: 0, safe: 0 };
      
      for (const date of weekDates) {
        const dayData = stats.detectionsByDay[date];
        if (dayData) {
          weeks[weekName].spam += dayData.spam;
          weeks[weekName].safe += dayData.safe;
        }
      }
      
      weekCounter++;
    }
    
    // Convert to array for chart
    for (const week in weeks) {
      weeklyData.push({
        name: week,
        spam: weeks[week].spam,
        safe: weeks[week].safe
      });
    }
    
    // Ensure we have at least 8 weeks of data
    while (weeklyData.length < 8) {
      weeklyData.push({
        name: `Week ${weeklyData.length + 1}`,
        spam: 0,
        safe: 0
      });
    }
    
    // Only keep the latest 8 weeks
    return weeklyData.slice(-8);
  };
  
  // Group data by month for monthly view
  const getMonthlyData = () => {
    const monthlyData = [];
    const months: Record<string, { spam: number, safe: number }> = {};
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    // Get all dates
    const dates = Object.keys(stats.detectionsByDay).sort();
    if (dates.length === 0) {
      // Return mock data if no real data
      return [
        { name: 'Jan', spam: 0, safe: 0 },
        { name: 'Feb', spam: 0, safe: 0 },
        { name: 'Mar', spam: 0, safe: 0 },
        { name: 'Apr', spam: 0, safe: 0 },
        { name: 'May', spam: 0, safe: 0 }
      ];
    }
    
    // Group by month
    for (const dateStr of dates) {
      const date = new Date(dateStr);
      const month = monthNames[date.getMonth()];
      
      if (!months[month]) {
        months[month] = { spam: 0, safe: 0 };
      }
      
      const dayData = stats.detectionsByDay[dateStr];
      if (dayData) {
        months[month].spam += dayData.spam;
        months[month].safe += dayData.safe;
      }
    }
    
    // Convert to array for chart
    for (let i = 0; i < monthNames.length; i++) {
      const month = monthNames[i];
      if (months[month]) {
        monthlyData.push({
          name: month,
          spam: months[month].spam,
          safe: months[month].safe
        });
      } else {
        monthlyData.push({
          name: month,
          spam: 0,
          safe: 0
        });
      }
    }
    
    // Return only the months that have data, or at least 5 months
    const monthsWithData = monthlyData.filter(month => month.spam > 0 || month.safe > 0);
    if (monthsWithData.length >= 5) {
      return monthsWithData;
    } else {
      // Return the current month and 4 previous months
      const currentMonth = new Date().getMonth();
      return monthlyData.slice(Math.max(0, currentMonth - 4), currentMonth + 1);
    }
  };
  
  // Get spam categories data
  const getCategoryData = () => {
    const categories = stats.detectionsByCategory;
    
    if (Object.values(categories).every(val => val === 0)) {
      // Return mock data if no real data
      return [
        { name: 'Phishing', value: 0 },
        { name: 'Promotional', value: 0 },
        { name: 'Financial', value: 0 },
        { name: 'Malware', value: 0 }
      ];
    }
    
    return [
      { name: 'Phishing', value: categories.phishing || 0 },
      { name: 'Promotional', value: categories.promotional || 0 },
      { name: 'Financial', value: categories.financial || 0 },
      { name: 'Malware', value: categories.malware || 0 }
    ].filter(item => item.value > 0);
  };
  
  // Calculate statistics based on the selected timeframe
  const currentData = timeframe === 'weekly' ? getWeeklyData() : getMonthlyData();
  const totalMessages = currentData.reduce((sum, item) => sum + item.spam + item.safe, 0);
  const totalSpam = currentData.reduce((sum, item) => sum + item.spam, 0);
  const spamPercentage = totalMessages ? Math.round((totalSpam / totalMessages) * 100) : 0;
  const spamPerDay = totalMessages ? Math.round(totalSpam / currentData.length) : 0;
  const categoryData = getCategoryData();
  
  // Refresh stats when component mounts or timeframe changes
  useEffect(() => {
    refreshStats();
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Dashboard</h1>
            <p className="text-muted-foreground">Monitor and analyze spam detection statistics.</p>
          </div>
          
          <div className="flex mt-4 lg:mt-0 space-x-2">
            <Button variant="outline" size="sm" onClick={refreshStats}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Total Processed</CardTitle>
              <CardDescription>Messages analyzed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalMessages.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {stats.totalMessages} messages analyzed in total
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Spam Detected</CardTitle>
              <CardDescription>Total spam messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalSpam.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {spamPercentage}% of total messages
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Daily Average</CardTitle>
              <CardDescription>Spam per day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{spamPerDay}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Over the past {timeframe === 'weekly' ? 'weeks' : 'months'}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="lg:col-span-3">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-medium">Message History</CardTitle>
                  <CardDescription>Spam vs. Safe messages over time</CardDescription>
                </div>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeframe === 'weekly' ? getWeeklyData() : getMonthlyData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="safe" stroke="#22c55e" strokeWidth={2} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="spam" stroke="#ef4444" strokeWidth={2} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Spam Types</CardTitle>
              <CardDescription>Distribution by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-base font-medium">Recent History</CardTitle>
              <CardDescription>Daily detection statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="weekly">
                <TabsList className="mb-4">
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
                <TabsContent value="weekly" className="space-y-4">
                  <StatisticsPanel />
                </TabsContent>
                <TabsContent value="monthly" className="space-y-4">
                  <div className="h-64 w-full bg-white/50 rounded-xl p-4 shadow-sm">
                    <h3 className="text-sm font-medium mb-4">Monthly Message Analysis</h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getMonthlyData()} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
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
                        <Line type="monotone" dataKey="safe" stroke="#22c55e" strokeWidth={2} />
                        <Line type="monotone" dataKey="spam" stroke="#ef4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Calendar</CardTitle>
              <CardDescription>View detection by date</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <div className="mt-3 text-xs text-center text-muted-foreground">
                {stats.history.length > 0 
                  ? `${stats.history.length} messages analyzed in total`
                  : 'No message history yet'
                }
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="py-10 bg-secondary/30 mt-24 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-sm text-muted-foreground">
            SpamTrie Sentinel &copy; {new Date().getFullYear()} &middot; Advanced spam detection using trie data structures
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;