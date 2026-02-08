
import React, { useState, useEffect } from 'react';
import { AppView, UserStoryData, HealingResult } from './types';
import LuminaHome from './components/LuminaHome';
import AetherSession from './components/AetherSession';
import BloomDashboard from './components/BloomDashboard';
import { processHealingJourney } from './services/aliyunService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [storyData, setStoryData] = useState<UserStoryData>({ story: '' });
  const [result, setResult] = useState<HealingResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleStartTransformation = async (story: string) => {
    setStoryData({ story });
    setLoading(true);
    setView(AppView.SESSION);

    try {
      const data = await processHealingJourney(story);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcknowledge = () => {
    setView(AppView.DASHBOARD);
  };

  const resetJourney = () => {
    setView(AppView.LANDING);
    setStoryData({ story: '' });
    setResult(null);
  };

  return (
    <div className={`min-h-screen gradient-bg font-sans transition-colors duration-500`}>
      {/* 导航栏 */}
      <nav className="fixed top-0 w-full z-50 px-4 md:px-8 py-4 md:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-full">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={resetJourney}>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-rounded">auto_awesome</span>
            </div>
            <span className="text-xl md:text-2xl font-display font-bold tracking-tight dark:text-white">流光</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-10 font-medium text-slate-600 dark:text-slate-300">
            <a className="hover:text-primary transition-colors" href="#">我的旅程</a>
            <a className="hover:text-primary transition-colors" href="#">内省引导</a>
            <a className="hover:text-primary transition-colors" href="#">社区</a>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-full glass hover:scale-110 transition-transform dark:text-white" 
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <span className="material-symbols-rounded block dark:hidden">dark_mode</span>
              <span className="material-symbols-rounded hidden dark:block">light_mode</span>
            </button>
            <button 
              className="bg-primary text-white px-4 md:px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
              onClick={resetJourney}
            >
              开启新篇
            </button>
          </div>
        </div>
      </nav>

      {/* 主体内容 */}
      <main className="pt-24 pb-12">
        {view === AppView.LANDING && (
          <LuminaHome onStart={handleStartTransformation} />
        )}
        {view === AppView.SESSION && (
          <AetherSession 
            loading={loading} 
            result={result} 
            onNext={handleAcknowledge} 
          />
        )}
        {view === AppView.DASHBOARD && result && (
          <BloomDashboard 
            result={result} 
            onReset={resetJourney}
          />
        )}
      </main>

      {/* 页脚 */}
      <footer className="py-10 px-8 border-t border-white/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs">
              <span className="material-symbols-rounded text-sm">auto_awesome</span>
            </div>
            <span className="font-display font-bold dark:text-white">流光 Lumina</span>
          </div>
          <div className="flex space-x-8 text-sm text-slate-500 dark:text-slate-400">
            <a className="hover:text-primary transition-colors" href="#">隐私政策</a>
            <a className="hover:text-primary transition-colors" href="#">服务条款</a>
            <a className="hover:text-primary transition-colors" href="#">联系我们</a>
          </div>
          <div className="flex space-x-4">
            <button className="p-2 rounded-full glass hover:text-primary transition-all dark:text-white">
              <span className="material-symbols-rounded text-xl">share</span>
            </button>
            <button className="p-2 rounded-full glass hover:text-primary transition-all dark:text-white">
              <span className="material-symbols-rounded text-xl">favorite</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
