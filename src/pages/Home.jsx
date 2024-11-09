import { Link } from 'react-router-dom';

function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
			<nav className="flex justify-between items-center px-8 py-6 bg-white shadow-sm">
				<div className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
					FlareUp 🔥
				</div>
				<div className="flex gap-4">
					<button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
						Add to Chrome
					</button>
				</div>
			</nav>

			<main className="flex justify-center items-center px-8 py-16">
				<div className="text-center max-w-6xl">
					<h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
						Light up your
						<br />
						Tinder experience
					</h1>
					<p className="text-xl md:text-2xl text-gray-600 mb-12">
						Ignite better matches, spark conversations, and fuel connections
					</p>

					<div className="grid md:grid-cols-3 gap-8 mt-12">
						<div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform">
							<span className="text-4xl mb-4 block">⚡</span>
							<h3 className="text-xl font-bold text-gray-800 mb-2">
								Power filters
							</h3>
							<p className="text-gray-600">Find your perfect match faster</p>
						</div>

						<div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform">
							<span className="text-4xl mb-4 block">✨</span>
							<h3 className="text-xl font-bold text-gray-800 mb-2">
								Spark assistant
							</h3>
							<p className="text-gray-600">Keep conversations burning bright</p>
						</div>

						<div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform">
							<span className="text-4xl mb-4 block">🔥</span>
							<h3 className="text-xl font-bold text-gray-800 mb-2">Heat map</h3>
							<p className="text-gray-600">Track your hottest matches</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Home;

