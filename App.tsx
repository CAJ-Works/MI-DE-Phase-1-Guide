import React, { useState } from 'react';
import { QUESTIONS } from './questions';
import { AppMode, OptionKey, UserAnswers } from './types';
import { QuizView } from './components/QuizView';
import { ResultSummary } from './components/ResultSummary';
import { BookOpen, PenTool, Car } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState<AppMode>('menu');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [isFinished, setIsFinished] = useState(false);

  const startApp = (selectedMode: AppMode) => {
    setMode(selectedMode);
    setUserAnswers({});
    setIsFinished(false);
    
    if (selectedMode === 'test') {
      setCurrentQuestionIndex(0);
    } else {
      // Practice mode starts with a random question
      setRandomQuestion();
    }
  };

  const setRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * QUESTIONS.length);
    setCurrentQuestionIndex(randomIndex);
  };

  const handleAnswer = (questionId: number, answer: OptionKey) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (mode === 'test') {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Practice mode: load next random question
      setRandomQuestion();
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  const goHome = () => {
    setMode('menu');
    setIsFinished(false);
  };

  // Menu View
  if (mode === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 rounded-full">
              <Car className="w-16 h-16 text-blue-600" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Driver's Ed Prep</h1>
            <p className="text-lg text-gray-500">Segment 1 Practice Test & Study Guide</p>
          </div>

          <div className="space-y-4 pt-4">
            <button
              onClick={() => startApp('test')}
              className="group w-full flex items-center justify-between p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 text-left"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <PenTool size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Take the Test</h3>
                  <p className="text-sm text-gray-500">Full 100-question simulated exam.</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => startApp('practice')}
              className="group w-full flex items-center justify-between p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-200 text-left"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Practice Mode</h3>
                  <p className="text-sm text-gray-500">Continuous questions with instant feedback.</p>
                </div>
              </div>
            </button>
          </div>
          
          <p className="text-xs text-gray-400 mt-8">Based on Segment 1 Knowledge Test Materials</p>
        </div>
      </div>
    );
  }

  // Result View (Only for Test Mode)
  if (isFinished && mode === 'test') {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
        <ResultSummary 
          questions={QUESTIONS} 
          userAnswers={userAnswers}
          onRestart={() => startApp('test')}
          onHome={goHome}
        />
      </div>
    );
  }

  // Active Quiz View (Practice or Test)
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2 font-bold text-gray-800">
           <Car className="text-blue-600" />
           <span className="hidden sm:inline">Driver's Ed Prep</span>
        </div>
        <button 
            onClick={goHome}
            className="text-sm text-gray-500 hover:text-gray-900 font-medium"
        >
            Exit
        </button>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <QuizView
          mode={mode}
          question={QUESTIONS[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={QUESTIONS.length}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onFinish={handleFinish}
          onExit={goHome}
        />
      </main>
    </div>
  );
}
