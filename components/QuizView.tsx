import React, { useState, useEffect } from 'react';
import { Question, OptionKey, AppMode } from '../types';
import { CheckCircle, XCircle, ArrowRight, Home } from 'lucide-react';
import { DiagramRenderer } from './Diagrams';

interface QuizViewProps {
  mode: AppMode;
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  onAnswer: (questionId: number, answer: OptionKey) => void;
  onNext: () => void;
  onFinish: () => void;
  onExit: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  mode,
  question,
  currentQuestionIndex,
  totalQuestions,
  onAnswer,
  onNext,
  onFinish,
  onExit,
}) => {
  const [selectedOption, setSelectedOption] = useState<OptionKey | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [practiceCount, setPracticeCount] = useState(1);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
  }, [question]);

  const handleOptionClick = (key: OptionKey) => {
    if (showFeedback && mode === 'practice') return; // Prevent changing answer in study mode after reveal
    
    setSelectedOption(key);
    
    if (mode === 'practice') {
      setShowFeedback(true);
      onAnswer(question.id, key);
    }
  };

  const handleNextClick = () => {
    if (mode === 'test') {
        if (selectedOption) {
            onAnswer(question.id, selectedOption);
        } else {
            if (!selectedOption) return;
        }
        
        if (currentQuestionIndex < totalQuestions - 1) {
          onNext();
        } else {
          onFinish();
        }
    } else {
      // Practice mode
      setPracticeCount(prev => prev + 1);
      onNext();
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      {/* Progress Bar or Status */}
      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
          {mode === 'test' ? (
            <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          ) : (
            <span>Questions Practiced: {practiceCount}</span>
          )}
          <span className={`uppercase tracking-wider text-xs font-bold px-2 py-1 rounded ${mode === 'practice' ? 'text-green-600 bg-green-100' : 'text-blue-600 bg-blue-100'}`}>
            {mode === 'practice' ? 'Practice Mode' : 'Test Mode'}
          </span>
        </div>
        
        {mode === 'test' && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">
             {question.text}
          </h2>

          {question.hasDiagram && (
            <div className="mb-6">
               <DiagramRenderer type={question.diagramType} />
            </div>
          )}

          <div className="space-y-3">
            {question.options.map((option) => {
              let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-start gap-3 group ";
              
              if (mode === 'practice' && showFeedback) {
                if (option.key === question.correctAnswer) {
                  buttonClass += "bg-green-50 border-green-500 text-green-800";
                } else if (option.key === selectedOption && selectedOption !== question.correctAnswer) {
                  buttonClass += "bg-red-50 border-red-500 text-red-800";
                } else {
                  buttonClass += "border-gray-200 text-gray-400 opacity-50";
                }
              } else {
                if (selectedOption === option.key) {
                  buttonClass += "border-blue-500 bg-blue-50 text-blue-900";
                } else {
                  buttonClass += "border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-700";
                }
              }

              return (
                <button
                  key={option.key}
                  onClick={() => handleOptionClick(option.key)}
                  disabled={mode === 'practice' && showFeedback}
                  className={buttonClass}
                >
                  <span className={`
                    flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold border
                    ${mode === 'practice' && showFeedback && option.key === question.correctAnswer 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : (mode === 'practice' && showFeedback && option.key === selectedOption && selectedOption !== question.correctAnswer 
                          ? 'bg-red-500 border-red-500 text-white' 
                          : (selectedOption === option.key ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-gray-300 text-gray-500 group-hover:border-blue-300'))}
                  `}>
                    {option.key.toUpperCase()}
                  </span>
                  <span className="mt-1">{option.text}</span>
                  
                  {mode === 'practice' && showFeedback && option.key === question.correctAnswer && (
                    <CheckCircle className="ml-auto text-green-600 flex-shrink-0" size={24} />
                  )}
                  {mode === 'practice' && showFeedback && option.key === selectedOption && selectedOption !== question.correctAnswer && (
                    <XCircle className="ml-auto text-red-600 flex-shrink-0" size={24} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-gray-50 p-6 border-t border-gray-100 flex justify-between items-center">
            {mode === 'practice' ? (
                <button 
                  onClick={onExit}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <Home size={18} />
                  End Practice
                </button>
            ) : (
                <div className="flex-1"></div> // Spacer for test mode
            )}
            
            <button
              onClick={handleNextClick}
              disabled={!selectedOption && mode === 'test'} // Only disable in test mode, in practice feedback shows up on selection
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-semibold shadow-sm transition-all
                ${(!selectedOption && mode === 'test') || (mode === 'practice' && !showFeedback)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md transform hover:-translate-y-0.5'}
              `}
            >
              {(mode === 'test' && currentQuestionIndex === totalQuestions - 1) ? 'Finish Test' : 'Next Question'}
              <ArrowRight size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};
