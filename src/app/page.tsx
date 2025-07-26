'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [complexity, setComplexity] = useState('Beginner');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!topic.trim()) return;
    setLoading(true);
    console.log("topic: ", topic)
    console.log("complexity: ", complexity)
    
    const currentYear = String(new Date().getFullYear());
    console.log("currentYear: ", currentYear);

    fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ topic, complexity, currentYear }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log("data: ", data)
      localStorage.setItem('course_data', JSON.stringify(data)); // simple storage
      router.push('/course');
    })

    // const data = await res.json();
  };

  return (
    <form 
      onSubmit={handleGenerate}
      className="min-h-screen flex flex-col items-center justify-center gap-4">

      <h1 className="text-2xl font-semibold">Enter a Topic to Learn</h1>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border p-2 rounded w-80"
        placeholder="e.g. History of Sri Lanka"
      />

      <select
        value={complexity}
        onChange={(e) => setComplexity(e.target.value)}
        className="border p-2 cursor-pointer"
      >
        <option value="Beginner">Beginner</option>
        <option value="Advanced">Advanced</option>
      </select>

      <button
        disabled={loading} 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 cursor-pointer">
        {loading ? 'Generating...' : 'Generate Course'}
      </button>
    </form>
  );
}
