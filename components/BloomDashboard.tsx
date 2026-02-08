
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HealingResult } from '../types';

interface BloomDashboardProps {
  result: HealingResult;
  onReset: () => void;
}

const BloomDashboard: React.FC<BloomDashboardProps> = ({ result, onReset }) => {
  const chartData = [
    { name: '第一周', stress: 80 },
    { name: '第二周', stress: 72 },
    { name: '第三周', stress: 65 },
    { name: '今日', stress: 65 + result.stressLevelChange },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
      <header className="mb-10 text-center md:text-left">
        <h1 className="font-display text-4xl font-bold mb-2 dark:text-white">治愈结果</h1>
        <p className="text-slate-500 dark:text-slate-400">你已完成本次探索课程。深呼吸，你做得非常好。</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 左列：漫画卡片和导师见解 */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-gradient-to-br from-[#fdf4ff] via-[#e0e7ff] to-[#f5f3ff] dark:from-[#1e1b4b] dark:to-[#312e81] rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden shadow-xl border border-white/50 dark:border-white/5">
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              {/* 拍立得卡片 */}
              <div className="w-full md:w-1/2 aspect-[4/5] bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-4 rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <div className="h-full border-2 border-slate-100 dark:border-slate-800 rounded-lg overflow-hidden relative">
                  <img 
                    alt="治愈漫画艺术" 
                    className="w-full h-full object-cover opacity-90" 
                    src={`https://picsum.photos/seed/${result.comicCaption}/800/1000`}
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-slate-900/95 p-4 rounded-xl shadow-lg backdrop-blur-md">
                    <p className="text-sm md:text-base italic font-medium font-quicksand dark:text-white">
                      “{result.comicCaption}”
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">
                    课程 #24
                  </div>
                </div>
              </div>

              {/* 智者见解 */}
              <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/80 dark:bg-slate-800/80 rounded-full flex items-center justify-center text-primary shadow-sm">
                    <span className="material-symbols-rounded">psychology</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl dark:text-white">智者导师：</h3>
                    <p className="text-[10px] text-primary font-semibold uppercase tracking-wider">送给你灵魂的寄语</p>
                  </div>
                </div>
                <blockquote className="text-lg md:text-xl font-medium leading-relaxed text-slate-700 dark:text-slate-200 italic font-quicksand">
                  “{result.mentorSageInsight}”
                </blockquote>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-primary text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20">
                    <span className="material-symbols-rounded">share</span>
                    分享我的宁静
                  </button>
                  <button className="bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all dark:text-white">
                    <span className="material-symbols-rounded text-xl">download</span>
                    保存卡片
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 情感流向图 */}
          <div className="bg-white dark:bg-slate-900/50 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="font-display font-bold text-2xl dark:text-white">情绪流向</h3>
                <p className="text-sm text-slate-500">你最近一周的压力指数趋势</p>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <span className="material-symbols-rounded text-sm">trending_down</span>
                  压力降低了 {Math.abs(result.stressLevelChange)}%
                </span>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="stress" 
                    stroke="#ec4899" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorStress)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 右列：统计信息 */}
        <div className="lg:col-span-4 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-[2rem] border border-blue-100 dark:border-blue-800">
              <span className="material-symbols-rounded text-blue-500 mb-2">auto_stories</span>
              <p className="text-3xl font-bold font-outfit dark:text-white">24</p>
              <p className="text-xs font-semibold opacity-60 dark:text-white uppercase tracking-wider">探索次数</p>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-[2rem] border border-pink-100 dark:border-pink-800">
              <span className="material-symbols-rounded text-pink-500 mb-2">favorite</span>
              <p className="text-3xl font-bold font-outfit dark:text-white">12</p>
              <p className="text-xs font-semibold opacity-60 dark:text-white uppercase tracking-wider">平静印记</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display font-bold text-xl dark:text-white">过往旅程</h3>
              <button className="text-primary text-xs font-bold hover:underline">查看全部</button>
            </div>
            <div className="space-y-4">
              {[
                { title: "寂静森林", date: "10月12日", mood: "极度清晰", color: "blue" },
                { title: "海洋呼吸", date: "10月08日", mood: "安宁", color: "teal" },
                { title: "星空回响", date: "10月05日", mood: "深刻反思", color: "purple" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm bg-slate-200 dark:bg-slate-700">
                    <img alt="Past" src={`https://picsum.photos/seed/${item.title}/100/100`} className="group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold dark:text-white">{item.title}</h4>
                    <p className="text-[10px] text-slate-500">{item.date} • {item.mood}</p>
                  </div>
                  <span className="material-symbols-rounded text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 font-bold text-sm hover:border-primary hover:text-primary transition-all">
              <span className="material-symbols-rounded text-base align-middle mr-1">history</span>
              探索更早的足迹
            </button>
          </div>

          <div className="bg-gradient-to-br from-primary to-indigo-600 p-8 rounded-[2.5rem] text-white shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
             <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">每日箴言</p>
             <p className="text-xl font-display font-medium leading-snug">“治愈不是一个终点，而是一种行走的方式。”</p>
             <div className="mt-6 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <img key={i} alt="Member" className="inline-block h-8 w-8 rounded-full ring-2 ring-primary" src={`https://picsum.photos/seed/user${i}/32/32`} />
                  ))}
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">+1.2k</div>
                </div>
                <p className="text-[10px] opacity-70">共有 1,240 位同行者</p>
             </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center py-8">
        <button 
          onClick={onReset}
          className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all active:scale-95"
        >
          开启新的叙事
        </button>
      </div>
    </div>
  );
};

export default BloomDashboard;
