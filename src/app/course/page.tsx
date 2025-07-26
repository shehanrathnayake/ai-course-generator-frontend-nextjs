'use client';
import { useEffect, useState } from 'react';
import { CourseResponse } from '../types/course';

export default function CoursePage() {
  const [data, setData] = useState<CourseResponse | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizVisible, setQuizVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('course_data');
    if (stored) setData(JSON.parse(stored));
  }, []);

  if (!data) return <div className="p-6">Loading course...</div>;
  console.log(data)

  const currentModule = data.modules[currentIndex];

  const handleNext = () => {
    if (currentIndex < data.modules.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setQuizVisible(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{currentModule.title}</h2>
      <p className="text-gray-600 mb-4">{currentModule.description}</p>

      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: currentModule.content.replace(/\n/g, '<br/>') }}
      />

      {!quizVisible ? (
        <button
          onClick={() => setQuizVisible(true)}
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
        >
          Take Quiz
        </button>
      ) : (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Quiz</h3>
          {currentModule.quiz.map((q, idx) => (
            <div key={idx} className="mt-4 p-4 border rounded bg-gray-50">
              <p className="font-medium">{q.question}</p>
              {q.choices ? (
                <ul className="list-disc list-inside mt-2">
                  {q.choices.map((choice, i) => (
                    <li key={i}>{choice}</li>
                  ))}
                </ul>
              ) : null}
              <p className="text-sm mt-2">
                <strong>Answer:</strong> {q.answer}
              </p>
              <p className="text-xs text-gray-500">
                <strong>Explanation:</strong> {q.explanation}
              </p>
            </div>
          ))}

          <button
            onClick={handleNext}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next Module
          </button>
        </div>
      )}
    </div>
  );
}
