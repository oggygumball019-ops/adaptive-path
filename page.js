'use client';
import { useState } from 'react';

export default function Home() {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [aiExplanation, setAiExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const lesson = {
    title: "Module 1: Introduction to Python Lists",
    content: "Python lists are ordered, mutable collections used to store multiple items in a single variable. Items are indexed starting from 0. You can add elements using .append() and remove them using .remove().",
    question: "Which method is used to add an item to the end of a Python list?",
    options: [".add()", ".append()", ".insert()", ".push()"],
    correct: ".append()"
  };

  const handleAnswer = (option) => {
    setSelectedOption(option);
    if (option === lesson.correct) {
      setIsCorrect(true);
      setAiExplanation("Great job! You mastered this concept.");
    } else {
      setIsCorrect(false);
      fetchAIExplanation(option);
    }
  };

  const fetchAIExplanation = async (wrongAnswer) => {
    setLoading(true);
    // Simulating adaptive AI response for hackathon demo speed and reliability
    setTimeout(() => {
      setAiExplanation(`Adaptive AI Analysis: You selected "${wrongAnswer}", but lists in Python use ".append()" to add items to the end. Think of it like "appending" (attaching) a new page to the back of a notebook! Let's try an easier check.`);
      setLoading(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6 md:p-12 font-sans">
      <div className="max-w-2xl mx-auto bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            AdaptivePath EdTech Engine
          </h1>
          <span className="text-xs bg-blue-600 px-3 py-1 rounded-full font-semibold">Round 2 Prototype</span>
        </div>

        {/* Step 1: Lesson View */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">{lesson.title}</h2>
            <p className="text-slate-300 leading-relaxed mb-6 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
              {lesson.content}
            </p>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-blue-600 hover:bg-blue-500 font-semibold py-3 rounded-xl transition shadow-lg"
            >
              Take Micro-Quiz
            </button>
          </div>
        )}

        {/* Step 2: Quiz & Adaptive Feedback View */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-medium mb-4 text-slate-200">{lesson.question}</h2>
            
            <div className="space-y-3 mb-6">
              {lesson.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt)}
                  className={`w-full text-left p-4 rounded-xl border transition ${
                    selectedOption === opt
                      ? opt === lesson.correct
                        ? 'bg-green-600/30 border-green-500 text-green-200'
                        : 'bg-red-600/30 border-red-500 text-red-200'
                      : 'bg-slate-900/50 border-slate-700 hover:border-slate-500 text-slate-200'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* AI Adaptive Feedback Box */}
            {isCorrect === false && (
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl mb-6">
                <h3 className="text-amber-400 font-semibold text-sm mb-1">🤖 Adaptive AI Tutor Intervened</h3>
                {loading ? (
                  <p className="text-slate-400 text-sm animate-pulse">Analyzing knowledge gap...</p>
                ) : (
                  <p className="text-slate-300 text-sm leading-relaxed">{aiExplanation}</p>
                )}
              </div>
            )}

            {isCorrect === true && (
              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl mb-6">
                <h3 className="text-green-400 font-semibold text-sm mb-1">🎉 Concept Mastered!</h3>
                <p className="text-slate-300 text-sm">{aiExplanation}</p>
              </div>
            )}

            <button
              onClick={() => {
                setStep(1);
                setSelectedOption(null);
                setIsCorrect(null);
                setAiExplanation('');
              }}
              className="w-full bg-slate-700 hover:bg-slate-600 font-semibold py-3 rounded-xl transition"
            >
              Reset Lesson
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
