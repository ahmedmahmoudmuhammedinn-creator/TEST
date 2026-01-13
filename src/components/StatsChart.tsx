import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', efficiency: 65, security: 70 },
  { name: 'Feb', efficiency: 72, security: 75 },
  { name: 'Mar', efficiency: 78, security: 82 },
  { name: 'Apr', efficiency: 85, security: 88 },
  { name: 'May', efficiency: 92, security: 95 },
  { name: 'Jun', efficiency: 98, security: 99 },
];

const StatsChart: React.FC = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px] glass-card p-10 rounded-[2rem]">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Performance Metrics</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest">Real-time infrastructure health</p>
        </div>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Efficiency</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-900"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Security</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorSecurity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#064e3b" stopOpacity={0.5}/>
              <stop offset="95%" stopColor="#064e3b" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#10b981" vertical={false} opacity={0.05} />
          <XAxis 
            dataKey="name" 
            stroke="#10b981" 
            tick={{fill: '#475569', fontSize: 10, fontWeight: 700}} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="#10b981" 
            tick={{fill: '#475569', fontSize: 10, fontWeight: 700}} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px' }}
            itemStyle={{ color: '#10b981', fontWeight: 800, fontSize: '12px' }}
          />
          <Area 
            type="monotone" 
            dataKey="efficiency" 
            stroke="#10b981" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorEfficiency)" 
          />
           <Area 
            type="monotone" 
            dataKey="security" 
            stroke="#064e3b" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorSecurity)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;