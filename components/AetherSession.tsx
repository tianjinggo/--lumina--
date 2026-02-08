
import React from 'react';
import { HealingResult } from '../types';

interface AetherSessionProps {
  loading: boolean;
  result: HealingResult | null;
  onNext: () => void;
}

const AetherSession: React.FC<AetherSessionProps> = ({ loading, result, onNext }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 md:p-20 relative overflow-hidden">
      {/* 背景光斑 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/30 dark:bg-blue-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200/30 dark:bg-purple-900/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        <div className="relative flex justify-center items-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <div className="absolute inset-0 bg-slate-400/20 dark:bg-slate-700/30 rounded-full blur-3xl animate-pulse-slow"></div>
            <img 
              alt="抽象治愈隐喻" 
              className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-lighten opacity-80 filter grayscale brightness-50 dark:brightness-110 animate-float"
              src="https://picsum.photos/seed/healing/600/600" 
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass p-8 md:p-12 rounded-[2.5rem] relative">
            <div className="absolute -top-12 -left-4 animate-float">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(209,163,255,0.4)]">
                <span className="material-symbols-rounded text-white text-3xl">flare</span>
              </div>
            </div>
            
            {loading ? (
              <div className="space-y-6">
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-full w-3/4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-full animate-pulse"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-4/6 animate-pulse"></div>
                </div>
                <p className="text-slate-400 italic text-sm text-center pt-4">正在将你的叙事转化为平静...</p>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h2 className="text-3xl font-light mb-4 dark:text-white font-outfit">
                  {result?.sessionTitle || "深度和谐中"}
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed italic font-outfit">
                  “{result?.metaphor}”
                </p>
                
                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                  <button 
                    onClick={onNext}
                    className="bg-secondary text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-all flex items-center space-x-2 group shadow-xl shadow-secondary/20"
                  >
                    <span>领悟并继续</span>
                    <span className="material-symbols-rounded group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 进度 HUD */}
      <div className="fixed bottom-0 left-0 w-full p-4 md:p-8 z-50">
        <div className="max-w-4xl mx-auto glass p-4 md:p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="text-xs font-semibold uppercase tracking-widest opacity-50 dark:text-white">治愈进度</span>
            <div className="w-32 md:w-64 h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r from-secondary to-blue-400 rounded-full transition-all duration-1000 ${loading ? 'w-[30%] animate-pulse' : 'w-[100%]'}`}
              ></div>
            </div>
            <span className="text-xs font-bold text-secondary">{loading ? '30%' : '100%'}</span>
          </div>
          <div className="flex items-center space-x-4">
             <button className="text-xs font-semibold uppercase tracking-widest text-secondary flex items-center space-x-2 hover:opacity-70 transition-opacity">
                <span>{loading ? '分析中...' : '专注模式已激活'}</span>
                <span className={`material-symbols-rounded text-xl ${loading ? 'animate-spin' : ''}`}>
                  {loading ? 'sync' : 'lens'}
                </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AetherSession;
