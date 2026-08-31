import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Search, Globe2, FileCheck2, Loader2, Sparkles } from 'lucide-react';

interface ProcessingStateProps {
  url: string;
}

export const ProcessingState: React.FC<ProcessingStateProps> = ({ url }) => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setCurrentStep(2), 600);
    const t2 = setTimeout(() => setCurrentStep(3), 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const steps = [
    {
      id: 1,
      title: 'Analyzing URL…',
      description: 'Detecting platform, content type, and verifying public accessibility',
      icon: <Search className="w-5 h-5" />,
    },
    {
      id: 2,
      title: 'Fetching available media…',
      description: 'Extracting video streams, high-res photos, and audio channels',
      icon: <Globe2 className="w-5 h-5" />,
    },
    {
      id: 3,
      title: 'Preparing download…',
      description: 'Formatting resolutions and generating secure direct links',
      icon: <FileCheck2 className="w-5 h-5" />,
    },
  ];

  return (
    <div
      id="processing-state-container"
      className="max-w-2xl mx-auto px-4 py-8 animate-in fade-in zoom-in-95 duration-300"
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Top Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full"
            initial={{ width: '20%' }}
            animate={{
              width: currentStep === 1 ? '35%' : currentStep === 2 ? '70%' : '95%',
            }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Step Indicator Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {steps[currentStep - 1].title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Processing requested social media stream
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            Step {currentStep} of 3
          </span>
        </div>

        {/* Step List */}
        <div className="space-y-3 mb-8">
          {steps.map((step) => {
            const isDone = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <div
                key={step.id}
                className={`flex items-start gap-3.5 p-3 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-pink-500/5 dark:bg-pink-950/20 border border-pink-500/20'
                    : isDone
                    ? 'bg-slate-50 dark:bg-slate-800/40 text-slate-400'
                    : 'opacity-40'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                    isDone
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-pink-500 text-white animate-pulse'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {isDone ? '✓' : step.id}
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-semibold ${
                      isCurrent
                        ? 'text-pink-600 dark:text-pink-400'
                        : isDone
                        ? 'text-slate-700 dark:text-slate-300'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Skeleton Card Preview */}
        <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col sm:flex-row gap-4 items-center">
          <div className="w-24 h-32 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse shrink-0" />
          <div className="flex-1 w-full space-y-2.5">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4 animate-pulse" />
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2 animate-pulse" />
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-full mt-3 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
