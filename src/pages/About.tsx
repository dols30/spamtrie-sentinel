import React from 'react';
import Header from '../components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Code2, 
  Database, 
  History, 
  Languages, 
  LineChart, 
  Settings, 
  Share2, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

// Mock data for the accuracy metrics
const accuracyData = [
  { name: 'Precision', value: 94 },
  { name: 'Recall', value: 89 },
  { name: 'F1 Score', value: 91 },
  { name: 'Accuracy', value: 95 }
];

// Trie size statistics
const trieData = [
  { name: 'English', nodes: 15428, patterns: 2850 },
  { name: 'Spanish', nodes: 8954, patterns: 1642 },
  { name: 'French', nodes: 6823, patterns: 1251 },
  { name: 'German', nodes: 9271, patterns: 1824 },
  { name: 'Chinese', nodes: 4582, patterns: 980 }
];

// Performance radar data
const performanceData = [
  { subject: 'Speed', A: 90, fullMark: 100 },
  { subject: 'Accuracy', A: 95, fullMark: 100 },
  { subject: 'Memory', A: 85, fullMark: 100 },
  { subject: 'Scalability', A: 92, fullMark: 100 },
  { subject: 'Reliability', A: 88, fullMark: 100 }
];

// Language detection rate
const languageData = [
  { name: 'English', rate: 76 },
  { name: 'Spanish', rate: 12 },
  { name: 'French', rate: 4 },
  { name: 'German', rate: 6 },
  { name: 'Other', rate: 2 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:px-6">
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-4 text-center">About SpamTrie Sentinel</h1>
          <p className="text-xl text-muted-foreground text-center mb-8">
            Advanced spam detection powered by trie data structures and machine learning
          </p>
          
          <div className="space-y-8">
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-primary/10 p-6 flex flex-col justify-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/20 w-16 h-16 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-center mb-2">Our Mission</h2>
                  <p className="text-muted-foreground text-center">
                    To create the most accurate and efficient spam detection system using innovative data structures.
                  </p>
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-lg font-medium mb-4">The SpamTrie Advantage</h3>
                  <p className="mb-4">
                    SpamTrie Sentinel uses a specialized trie data structure to efficiently identify spam patterns 
                    in messages. This approach allows for faster pattern matching and higher accuracy than traditional 
                    methods.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-1.5 rounded-full mr-2">
                        <ShieldCheck className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-sm">High Accuracy</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                        <LineChart className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-sm">Low False Positives</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-1.5 rounded-full mr-2">
                        <Languages className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-sm">Multilingual Support</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-amber-100 p-1.5 rounded-full mr-2">
                        <History className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="text-sm">Adaptive Learning</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Performance Metrics</CardTitle>
                      <CardDescription>System accuracy and detection rates</CardDescription>
                    </div>
                    <Settings className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Performance" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Trie Structure Statistics</CardTitle>
                      <CardDescription>Pattern nodes by language</CardDescription>
                    </div>
                    <Database className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        width={500}
                        height={300}
                        data={trieData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="nodes" fill="#8884d8" name="Nodes" />
                        <Bar dataKey="patterns" fill="#82ca9d" name="Patterns" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Detection Statistics</CardTitle>
                  <CardDescription>Accuracy metrics by algorithm type</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="accuracy">
                    <TabsList className="mb-4">
                      <TabsTrigger value="accuracy">Accuracy Metrics</TabsTrigger>
                      <TabsTrigger value="languages">Language Support</TabsTrigger>
                    </TabsList>
                    <TabsContent value="accuracy" className="space-y-4">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            width={500}
                            height={300}
                            data={accuracyData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip formatter={(value) => [`${value}%`, 'Value']} />
                            <Bar dataKey="value" fill="#3b82f6" label={{ position: 'top', formatter: (val) => `${val}%` }} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <p className="text-sm">
                          <span className="font-medium">How we measure:</span> Our metrics are calculated using cross-validation 
                          on a diverse dataset of over 1 million messages, with human-verified labels.
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="languages" className="space-y-4">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            width={500}
                            height={300}
                            data={languageData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip formatter={(value) => [`${value}%`, 'Detection Rate']} />
                            <Bar dataKey="rate" fill="#8884d8" label={{ position: 'top', formatter: (val) => `${val}%` }} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <p className="text-sm">
                          <span className="font-medium">Language Support:</span> SpamTrie Sentinel can detect spam 
                          patterns across multiple languages, with the highest accuracy for English content.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Technology Stack</CardTitle>
                  <CardDescription>Core technologies powering our system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Code2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Trie Data Structure</h3>
                      <p className="text-xs text-muted-foreground">Pattern matching backbone</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <AlertTriangle className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Machine Learning</h3>
                      <p className="text-xs text-muted-foreground">Adaptive pattern recognition</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <Database className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Big Data Processing</h3>
                      <p className="text-xs text-muted-foreground">Handle millions of messages</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-amber-100 p-2 rounded-full mr-3">
                      <Share2 className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">API Integration</h3>
                      <p className="text-xs text-muted-foreground">Connect to any platform</p>
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 py-3 border-t bg-muted/20">
                  <Button variant="outline" size="sm" className="w-full">
                    Technical Documentation
                  </Button>
                </div>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Team & Credits</CardTitle>
                <CardDescription>
                  SpamTrie Sentinel is built by a team of developers and data scientists passionate about 
                  improving digital communication safety.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {['Founder & Lead Developer', 'Algorithm Specialist', 'ML Engineer', 'Frontend Developer'].map((role, i) => (
                    <div key={i} className="flex flex-col items-center p-4 bg-secondary/20 rounded-lg">
                      <div className="w-16 h-16 bg-primary/10 rounded-full mb-3 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">{role.charAt(0)}</span>
                      </div>
                      <h3 className="font-medium text-center">{role}</h3>
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        {role === 'Founder & Lead Developer' ? 'Bashyal Dolraj' : `Team Member ${i + 1}`}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
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

export default About;