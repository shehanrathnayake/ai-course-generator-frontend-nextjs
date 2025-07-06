import PingClient from "./components/PingClient";

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-green-600">AI Course Generator Frontend</h1>
      <p className="mt-4 mb-4">Testing connection to backend:</p>
      <PingClient />
    </main>
  );
}
