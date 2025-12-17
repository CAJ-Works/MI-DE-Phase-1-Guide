import React from 'react';
import { Question, UserAnswers } from '../types';
import { CheckCircle, XCircle, RotateCcw, Home } from 'lucide-react';

interface ResultSummaryProps {
  questions: Question[];
  userAnswers: UserAnswers;
  onRestart: () => void;
  onHome: () => void;
}

export const ResultSummary: React.FC<ResultSummaryProps> = ({
  questions,
  userAnswers,
  onRestart,
  onHome,
}) => {
  const correctCount = questions.filter(
    (q) => userAnswers[q.id] === q.correctAnswer
  ).length;
  
  const score = Math.round((correctCount / questions.length) * 100);
  const passed = score >= 70; // Assuming 70% is passing

  return (
    <div className="max-w-4xl mx-auto w-full pb-12">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-8">
        <div className={`p-8 text-center ${passed ? 'bg-green-50' : 'bg-red-50'}`}>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Test Complete</h2>
          <div className="flex flex-col items-center justify-center">
            <div className={`text-6xl font-black mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {score}%
            </div>
            <p className="text-gray-600 text-lg">
              You answered <span className="font-bold">{correctCount}</span> out of <span className="font-bold">{questions.length}</span> correctly.
            </p>
            <div className={`mt-4 px-4 py-2 rounded-full font-bold text-sm tracking-wide uppercase ${passed ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
              {passed ? 'Passed' : 'Needs Improvement'}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200">
           {questions.map((q, index) => {
             const userAnswer = userAnswers[q.id];
             const isCorrect = userAnswer === q.correctAnswer;
             const correctOptionText = q.options.find(o => o.key === q.correctAnswer)?.text;
             const userOptionText = q.options.find(o => o.key === userAnswer)?.text;

             return (
               <div key={q.id} className={`p-6 border-b border-gray-100 last:border-0 ${isCorrect ? 'bg-white' : 'bg-red-50/30'}`}>
                 <div className="flex items-start gap-4">
                   <div className="flex-shrink-0 mt-1">
                     {isCorrect ? (
                       <CheckCircle className="text-green-500" size={24} />
                     ) : (
                       <XCircle className="text-red-500" size={24} />
                     )}
                   </div>
                   <div className="flex-grow">
                     <p className="font-semibold text-gray-800 mb-2">
                       <span className="text-gray-500 mr-2">{q.id}.</span>
                       {q.text}
                     </p>
                     
                     <div className="space-y-2 text-sm">
                       {!isCorrect && (
                         <div className="flex items-start gap-2 text-red-700 bg-red-100 p-3 rounded-lg">
                           <span className="font-bold uppercase text-xs mt-0.5">Your Answer:</span>
                           <span>{userAnswer?.toUpperCase()}. {userOptionText || 'No Answer'}</span>
                         </div>
                       )}
                       <div className="flex items-start gap-2 text-green-800 bg-green-100 p-3 rounded-lg">
                         <span className="font-bold uppercase text-xs mt-0.5">Correct Answer:</span>
                         <span>{q.correctAnswer.toUpperCase()}. {correctOptionText}</span>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             );
           })}
        </div>
        
        <div className="bg-gray-50 p-6 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={20} />
            Retake Test
          </button>
          <button
            onClick={onHome}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 rounded-lg shadow-sm text-white font-medium hover:bg-blue-700 transition-colors"
          >
            <Home size={20} />
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};
