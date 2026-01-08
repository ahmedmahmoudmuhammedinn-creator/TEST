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
    <div className="w-full h-[300px] md:h-[400px] bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
      <h3 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
        Client Efficiency Growth
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorSecurity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b'}} />
          <YAxis stroke="#64748b" tick={{fill: '#64748b'}} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
            itemStyle={{ color: '#f8fafc' }}
          />
          <Area 
            type="monotone" 
            dataKey="efficiency" 
            stroke="#22d3ee" 
            fillOpacity={1} 
            fill="url(#colorEfficiency)" 
            name="Operational Efficiency"
          />
           <Area 
            type="monotone" 
            dataKey="security" 
            stroke="#3b82f6" 
            fillOpacity={1} 
            fill="url(#colorSecurity)" 
            name="Security Score"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;
