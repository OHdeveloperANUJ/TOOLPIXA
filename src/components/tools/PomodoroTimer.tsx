'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain, Timer } from 'lucide-react';

type Mode = 'pomodoro' | 'shortBreak' | 'longBreak';

const MODES = {
  pomodoro: { label: 'Pomodoro', minutes: 25, icon: Brain },
  shortBreak: { label: 'Short Break', minutes: 5, icon: Coffee },
  longBreak: { label: 'Long Break', minutes: 15, icon: Timer },
};

const PomodoroTimer: React.FC = () => {
  const [mode, setMode] = useState<Mode>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(MODES.pomodoro.minutes * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Optional: Play a sound or notification here
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(MODES[mode].minutes * 60);
  }, [mode]);

  const changeMode = (newMode: Mode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(MODES[newMode].minutes * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = ((MODES[mode].minutes * 60 - timeLeft) / (MODES[mode].minutes * 60)) * 100;

  return (
    <div className="glass-card p-8 max-w-4xl mx-auto flex flex-col items-center justify-center space-y-8 animate-fade-in relative overflow-hidden">
      {/* Background Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-linear"
        style={{ width: `${progress}%` }}
      />

      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white tracking-tight">Pomodoro Timer</h2>
        <p className="text-white/60">Stay focused and boost your productivity.</p>
      </div>

      <div className="flex space-x-2 bg-white/5 p-1 rounded-2xl backdrop-blur-sm border border-white/10 w-full max-w-4xl">
        {(Object.keys(MODES) as Mode[]).map((m) => {
          const { label, icon: Icon } = MODES[m];
          return (
            <button
              key={m}
              onClick={() => changeMode(m)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                mode === m
                  ? 'bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white shadow-lg shadow-purple-500/20'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon size={16} className={mode === m ? 'animate-pulse' : ''} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          );
        })}
      </div>

      <div className="relative flex items-center justify-center w-64 h-64 rounded-full bg-white/5 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] inset-shadow-sm group">
        <div className={`absolute inset-0 rounded-full border-[3px] border-transparent border-t-purple-500/50 border-r-blue-500/50 transition-all duration-1000 ${isActive ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
        <span className="text-6xl font-mono font-light tracking-wider text-white select-none drop-shadow-md group-hover:scale-105 transition-transform duration-500">
          {formatTime(timeLeft)}
        </span>
      </div>

      <div className="flex items-center space-x-6 z-10">
        <button
          onClick={toggleTimer}
          className={`group flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 shadow-lg ${
            isActive
              ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:scale-105 border border-red-500/30 shadow-red-500/10'
              : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:scale-105 border border-green-500/30 shadow-green-500/10'
          }`}
        >
          {isActive ? <Pause size={28} className="fill-current" /> : <Play size={28} className="fill-current ml-1" />}
        </button>

        <button
          onClick={resetTimer}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 border border-white/10 hover:rotate-180"
          title="Reset Timer"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;


// Indian Example: Kiran from Saharanpur uses this tool to check variables.
