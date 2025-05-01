import Link from "next/link";

export default function SubPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">K-AI Sub Pages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/(sub)/model-services"
          className="block p-6 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-2">Model Services</h2>
          <p className="text-gray-400">Discover our AI model services</p>
        </Link>
        <Link
          href="/(sub)/k-intelligence"
          className="block p-6 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-2">K Intelligence</h2>
          <p className="text-gray-400">Explore our AI intelligence solutions</p>
        </Link>
        <Link
          href="/(sub)/k-inspiration"
          className="block p-6 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-2">K Inspiration</h2>
          <p className="text-gray-400">Get inspired by our AI innovations</p>
        </Link>
        <Link
          href="/(sub)/k-experience"
          className="block p-6 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-2">K Experience</h2>
          <p className="text-gray-400">Experience our AI solutions</p>
        </Link>
        <Link href="/(sub)/k-ai-lab" className="block p-6 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
          <h2 className="text-2xl font-semibold mb-2">K AI Lab</h2>
          <p className="text-gray-400">Visit our AI research lab</p>
        </Link>
        <Link href="/(sub)/k-use-case" className="block p-6 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
          <h2 className="text-2xl font-semibold mb-2">K Use Case</h2>
          <p className="text-gray-400">Explore real-world AI applications</p>
        </Link>
      </div>
    </div>
  );
}
