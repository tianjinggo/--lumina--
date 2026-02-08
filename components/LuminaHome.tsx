
import React, { useState, useEffect, useRef } from 'react';

interface LuminaHomeProps {
  onStart: (story: string) => void;
}

const LuminaHome: React.FC<LuminaHomeProps> = ({ onStart }) => {
  const [story, setStory] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [story]);

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-12">
      {/* 装饰性表情 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[5%] left-[-15%] animate-float" style={{ animationDelay: '0s' }}>
          <div className="w-20 h-20 rounded-full bg-yellow-200 dark:bg-yellow-600/30 flex items-center justify-center text-4xl shadow-xl glass border-yellow-300">😊</div>
        </div>
        <div className="absolute top-[40%] left-[-20%] animate-float" style={{ animationDelay: '1.5s' }}>
          <div className="w-16 h-16 rounded-full bg-blue-200 dark:bg-blue-600/30 flex items-center justify-center text-2xl shadow-xl glass border-blue-300">😌</div>
        </div>
        <div className="absolute top-[10%] right-[-15%] animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-16 h-16 rounded-full bg-purple-200 dark:bg-purple-600/30 flex items-center justify-center text-3xl shadow-xl glass border-purple-300">🧘</div>
        </div>
        <div className="absolute bottom-[20%] right-[-20%] animate-float" style={{ animationDelay: '2.5s' }}>
          <div className="w-24 h-24 rounded-full bg-pink-200 dark:bg-pink-600/30 flex items-center justify-center text-4xl shadow-xl glass border-pink-300">✨</div>
        </div>
      </div>

      <div className="space-y-4">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/50 dark:bg-white/10 text-primary font-semibold text-sm tracking-wider uppercase">你的治愈旅程由此开启</span>
        <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight dark:text-white">
          每个故事都有一个 <br/>
          <span className="text-primary italic">新的开始。</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light">
          通过深度内省和创意表达，重塑你的内在叙事。你今天感觉如何？
        </p>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 rounded-[40px] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative glass rounded-[40px] p-8 md:p-12 shadow-2xl">
          <div className="scroll-paper rounded-2xl min-h-[300px] p-6 md:p-10 flex flex-col items-center justify-center bg-white/60 dark:bg-slate-900/40 transition-colors">
            <textarea 
              ref={textareaRef}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 text-2xl md:text-3xl font-display text-center placeholder-slate-400 dark:placeholder-slate-500 dark:text-white min-h-[200px] resize-none overflow-hidden" 
              placeholder="在此书写你的故事..." 
              rows={4}
            />
            <div className="flex items-center space-x-4 mt-8">
              <button className="p-3 rounded-full hover:bg-white/50 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400">
                <span className="material-symbols-rounded">sentiment_satisfied</span>
              </button>
              <button className="p-3 rounded-full hover:bg-white/50 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400">
                <span className="material-symbols-rounded">image</span>
              </button>
              <button className="p-3 rounded-full hover:bg-white/50 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400">
                <span className="material-symbols-rounded">draw</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <button 
          onClick={() => story.trim() && onStart(story)}
          disabled={!story.trim()}
          className={`group relative px-10 py-5 rounded-full font-bold text-xl shadow-2xl transition-all active:scale-95 ${
            story.trim() 
            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105' 
            : 'bg-slate-300 dark:bg-slate-700 text-slate-100 dark:text-slate-500 cursor-not-allowed'
          }`}
        >
          <span className="relative z-10 flex items-center">
            开始蜕变
            <span className="material-symbols-rounded ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </span>
        </button>
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 italic">拒绝批判，专注成长。你的隐私是我们的头等大事。</p>
      </div>

      <div className="max-w-7xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full pb-12">
        <div className="glass p-8 rounded-3xl text-center space-y-3">
          <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center text-pink-500 mx-auto">
            <span className="material-symbols-rounded">auto_stories</span>
          </div>
          <h3 className="font-display text-xl font-bold dark:text-white">漫画疗愈</h3>
          <p className="text-slate-600 dark:text-slate-400">通过个性化的漫画叙事，将情感可视化。</p>
        </div>
        <div className="glass p-8 rounded-3xl text-center space-y-3">
          <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center text-teal-500 mx-auto">
            <span className="material-symbols-rounded">psychology</span>
          </div>
          <h3 className="font-display text-xl font-bold dark:text-white">人生向导</h3>
          <p className="text-slate-600 dark:text-slate-400">在人生的复杂章节中，获得专家的内省指导。</p>
        </div>
        <div className="glass p-8 rounded-3xl text-center space-y-3">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-500 mx-auto">
            <span className="material-symbols-rounded">group</span>
          </div>
          <h3 className="font-display text-xl font-bold dark:text-white">共同成长</h3>
          <p className="text-slate-600 dark:text-slate-400">在一个安全受控的空间中，与同行者建立联系。</p>
        </div>
      </div>
    </div>
  );
};

export default LuminaHome;
