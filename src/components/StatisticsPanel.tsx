import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSpamStatistics } from '@/hooks/use-spam-statistics';
import { categoryLabels } from '@/lib/analysis';

const StatisticsPanel = () => {
  const stats = useSpamStatistics();
  const [days, setDays] = useState(7);
  const data = Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - days + index + 1);
    const key = date.toISOString().slice(0, 10);
    return { date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }), ...(stats.detectionsByDay[key] || { spam: 0, safe: 0 }) };
  });
  const hasPeriodData = data.some(day => day.spam + day.safe > 0);
  const categoryTotal = Object.values(stats.detectionsByCategory).reduce((sum, value) => sum + value, 0);
  return (
    <>
      <dl className="stat-summary">
        <div><dt>Messages checked</dt><dd>{stats.totalMessages.toLocaleString()}</dd></div>
        <div><dt>Spam detected</dt><dd>{stats.spamMessages.toLocaleString()}</dd></div>
        <div><dt>No spam detected</dt><dd>{stats.safeMessages.toLocaleString()}</dd></div>
        <div><dt>Flagged messages</dt><dd>{stats.totalMessages ? Math.round(stats.spamMessages / stats.totalMessages * 100) : 0}%</dd></div>
      </dl>
      <div className="analytics-grid">
        <section className="analytics-panel" aria-labelledby="activity-heading">
          <div className="panel-heading"><h2 id="activity-heading">Message activity</h2><div className="segmented-control" aria-label="Activity period">{[7, 30].map(value => <button key={value} aria-pressed={days === value} onClick={() => setDays(value)}>{value} days</button>)}</div></div>
          {hasPeriodData ? <>
            <div className="chart-area" role="img" aria-label={`Daily message counts over the last ${days} days: ${data.reduce((sum, day) => sum + day.spam, 0)} spam, ${data.reduce((sum, day) => sum + day.safe, 0)} without spam`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 0, left: -25, bottom: 0 }} barGap={3}>
                  <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} stroke="var(--text-secondary)" minTickGap={24} />
                  <YAxis allowDecimals={false} fontSize={10} tickLine={false} axisLine={false} stroke="var(--text-secondary)" />
                  <Tooltip cursor={{ fill: 'var(--surface-soft)' }} contentStyle={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--line)', borderRadius: 10, fontSize: 12 }} />
                  <Bar name="No spam" dataKey="safe" fill="var(--text-secondary)" radius={[3, 3, 0, 0]} maxBarSize={18} isAnimationActive={false} />
                  <Bar name="Spam" dataKey="spam" fill="var(--blue)" radius={[3, 3, 0, 0]} maxBarSize={18} isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-legend"><span><i className="legend-line normal" />No spam detected</span><span><i className="legend-line" />Spam detected</span></div>
          </> : <div className="dashboard-empty"><BarChart3 size={32} strokeWidth={1.3} /><h3>No activity yet.</h3><p>Message checks from this period will appear here.</p><Link className="text-link" to="/#detector">Check a message</Link></div>}
        </section>
        <section className="analytics-panel" aria-labelledby="categories-heading">
          <div className="panel-heading"><h2 id="categories-heading">Spam categories</h2></div>
          {categoryTotal > 0 ? <div className="category-list">{Object.entries(categoryLabels).map(([key, label]) => {
            const count = stats.detectionsByCategory[key] || 0;
            return <div key={key}><div className="category-row"><span>{label}</span><strong>{count}</strong></div>{count > 0 && <div className="category-meter" style={{ width: `${count / categoryTotal * 100}%` }} />}</div>;
          })}</div> : <div className="dashboard-empty"><ShieldCheck size={32} strokeWidth={1.3} /><h3>Nothing flagged.</h3><p>Detected categories will appear here.</p></div>}
        </section>
      </div>
    </>
  );
};
export default StatisticsPanel;
