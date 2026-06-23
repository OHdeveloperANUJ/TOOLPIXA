'use client';

import React, { useState, useEffect } from 'react';
import { Course, GradingScale, calculateGPA, scaleMaps } from '@/utils/gpaLogic';
import { GraduationCap, Plus, Trash2, Award, Info } from 'lucide-react';

function useAnimatedNumber(value: number, duration: number = 800) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = currentValue;
    const endValue = value;
    if (startValue === endValue) {
      setCurrentValue(endValue);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const ease = 1 - Math.pow(1 - percentage, 4);
      setCurrentValue(startValue + (endValue - startValue) * ease);
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(endValue);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, duration]);

  return currentValue;
}

export default function GpaCalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', grade: '', credits: 3 },
    { id: '2', name: '', grade: '', credits: 3 },
    { id: '3', name: '', grade: '', credits: 3 },
  ]);
  const [scale, setScale] = useState<GradingScale>('US_4_0');
  
  let result = { gpa: 0, totalCredits: 0, totalGradePoints: 0 };
  try {
    result = calculateGPA(courses, scale);
  } catch (e) {
    console.error(e);
  }

  const animatedGpa = useAnimatedNumber(result.gpa);

  const addCourse = (credits: number = 3) => {
    setCourses([...courses, { id: Math.random().toString(), name: '', grade: '', credits }]);
  };

  const updateCourse = (id: string, field: keyof Course, value: any) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const gradesOptions = Object.keys(scaleMaps[scale]);
  const maxGpa = scale.startsWith('INDIA') ? 10.0 : 4.0;
  
  const gpaColorClass = result.gpa >= (maxGpa * 0.85) 
    ? 'text-purple-600 dark:text-purple-400' 
    : result.gpa >= (maxGpa * 0.6) 
      ? 'text-cyan-600 dark:text-cyan-400' 
      : 'text-rose-600 dark:text-rose-400';

  const gpaStrokeColor = result.gpa >= (maxGpa * 0.85) 
    ? '#a855f7' // purple-500
    : result.gpa >= (maxGpa * 0.6) 
      ? '#22d3ee' // cyan-400
      : '#fb7185'; // rose-400

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Calculator Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6 gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-1">
                  <GraduationCap className="text-purple-500" /> Course Entry
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Enter your courses to calculate your cumulative GPA.</p>
              </div>
              <select 
                value={scale} 
                onChange={(e) => setScale(e.target.value as GradingScale)}
                className="bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-4 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors"
              >
                <option value="US_4_0">US (4.0 Scale)</option>
                <option value="INDIA_10_O">India (10.0 O-P Scale)</option>
                <option value="INDIA_10_S">India (10.0 S-E Scale)</option>
              </select>
            </div>

            <div className="space-y-4">
              {/* Headers */}
              <div className="grid grid-cols-12 gap-2 md:gap-4 px-2 pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <div className="col-span-5 md:col-span-6">Course Name</div>
                <div className="col-span-3">Grade</div>
                <div className="col-span-3 md:col-span-2 text-center">Credits</div>
                <div className="col-span-1"></div>
              </div>

              {/* Course Rows */}
              <div className="space-y-3">
                {courses.map((course, idx) => (
                  <div key={course.id} className="grid grid-cols-12 gap-2 md:gap-4 items-center group">
                    <div className="col-span-5 md:col-span-6">
                      <input 
                        type="text" 
                        value={course.name}
                        onChange={(e) => updateCourse(course.id!, 'name', e.target.value)}
                        placeholder={`Course ${idx + 1}`}
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-purple-400/50 transition-all"
                      />
                    </div>
                    <div className="col-span-3 relative">
                      <select 
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id!, 'grade', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-purple-400/50 transition-all appearance-none cursor-pointer font-bold text-center"
                      >
                        <option value="" disabled>--</option>
                        {gradesOptions.map(g => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-3 md:col-span-2">
                      <input 
                        type="number" 
                        min="0"
                        step="0.5"
                        value={course.credits}
                        onChange={(e) => updateCourse(course.id!, 'credits', parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-purple-400/50 transition-all text-center"
                      />
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <button 
                        onClick={() => removeCourse(course.id!)}
                        className="p-2 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 opacity-50 hover:opacity-100"
                        title="Remove Course"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="pt-4 flex flex-wrap gap-3">
                <button 
                  onClick={() => addCourse(3)}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-sm font-bold hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors active:scale-95"
                >
                  <Plus size={16} /> 3 Credit
                </button>
                <button 
                  onClick={() => addCourse(4)}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 text-sm font-bold hover:bg-cyan-100 dark:hover:bg-cyan-900/40 transition-colors active:scale-95"
                >
                  <Plus size={16} /> 4 Credit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-4 relative">
          <div className="glass-card p-8 rounded-2xl sticky top-24 flex flex-col items-center justify-center min-h-[400px]">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-8 text-center">Academic Standing</p>
            
            <div className="relative flex justify-center items-center mb-8">
              {/* GPA Circle */}
              <div className="w-48 h-48 rounded-full border-8 border-slate-100 dark:border-slate-800/50 flex items-center justify-center relative shadow-inner">
                 <svg className="absolute inset-0 w-full h-full -rotate-90">
                   <circle 
                     cx="96" cy="96" r="88" 
                     fill="transparent" 
                     stroke={gpaStrokeColor} 
                     strokeWidth="16" 
                     strokeDasharray="553" 
                     strokeDashoffset={553 - (553 * (animatedGpa / maxGpa))}
                     strokeLinecap="round"
                     className="transition-all duration-1000 ease-out drop-shadow-md"
                   />
                 </svg>
                 <div className="text-center relative z-10 flex flex-col items-center">
                   <div className={`text-5xl font-black ${gpaColorClass}`}>
                     {animatedGpa.toFixed(2)}
                   </div>
                   <div className="text-slate-400 text-xs mt-1 font-bold">OUT OF {maxGpa.toFixed(1)}</div>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center text-center">
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1 font-bold">Total Credits</span>
                <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">{result.totalCredits}</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center text-center">
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1 font-bold">Total Points</span>
                <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">{result.totalGradePoints}</span>
              </div>
            </div>
            
            {/* Dynamic Status */}
            <div className={`w-full mt-6 p-4 rounded-xl border flex items-start gap-3 
              ${result.gpa >= (maxGpa * 0.85) ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-500/20 text-purple-700 dark:text-purple-300' : 
                result.gpa >= (maxGpa * 0.6) ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-300' : 
                'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-300'}`}
            >
              <Award className="shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-bold text-sm mb-1">
                  {result.gpa >= (maxGpa * 0.85) ? 'Dean\'s List Eligible!' : result.gpa >= (maxGpa * 0.6) ? 'Good Standing' : 'Academic Warning'}
                </h4>
                <p className="text-xs opacity-80">
                  {result.gpa >= (maxGpa * 0.85) ? 'Excellent performance! You qualify for top scholarships.' : 'Keep pushing! Small improvements make big impacts over time.'}
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}


// Indian Example: Varun from Aurangabad uses this tool to check variables.
