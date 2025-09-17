import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate("/");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-teal-600 flex items-center justify-center p-6 relative overflow-hidden">
			{/* Water waves animation */}
			<div className="absolute inset-0 opacity-30">
				<motion.div
					className="absolute top-1/2 left-0 w-full h-32 bg-gradient-to-r from-transparent via-white/20 to-transparent"
					animate={{
						x: [-100, window.innerWidth + 100],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "linear"
					}}
				/>
				<motion.div
					className="absolute top-1/3 left-0 w-full h-24 bg-gradient-to-r from-transparent via-white/10 to-transparent"
					animate={{
						x: [-150, window.innerWidth + 150],
					}}
					transition={{
						duration: 12,
						repeat: Infinity,
						ease: "linear",
						delay: 2
					}}
				/>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="max-w-lg w-full flex justify-center bg-white/95 backdrop-blur-sm items-center flex-col rounded-3xl shadow-2xl border-2 border-orange-200 p-8 text-center relative z-10"
			>
				{/* Dayung icon animation dengan gerakan mendayung */}
				<motion.div
					initial={{ scale: 0, rotate: -180 }}
					animate={{ scale: 1, rotate: 0 }}
					transition={{ 
						type: "spring", 
						stiffness: 200, 
						damping: 15,
						duration: 1
					}}
					className="mb-6 flex justify-center relative"
				>
					<div className="bg-gradient-to-br from-orange-400 to-red-500 p-6 rounded-full shadow-lg">
						<motion.div
							animate={{ 
								rotate: [-15, 15, -15]
							}}
							transition={{
								duration: 2.5,
								repeat: Infinity,
								ease: "easeInOut"
							}}
						>
							{/* SVG Dayung custom */}
							<svg
								width="64"
								height="64"
								viewBox="0 0 24 24"
								fill="none"
								stroke="white"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="drop-shadow-md"
							>
								{/* Gagang dayung */}
								<line x1="12" y1="2" x2="12" y2="18" />
								{/* Bilah dayung atas */}
								<ellipse cx="12" cy="5" rx="3" ry="2.5" />
								{/* Bilah dayung bawah */}
								<ellipse cx="12" cy="19" rx="3" ry="2.5" />
								{/* Detail tengah gagang */}
								<circle cx="12" cy="10" r="0.5" fill="white" />
								<circle cx="12" cy="12" r="0.5" fill="white" />
								<circle cx="12" cy="14" r="0.5" fill="white" />
							</svg>
						</motion.div>
					</div>
					{/* Percikan air dari dayung */}
					{[...Array(8)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full"
							style={{
								top: `${30 + Math.sin(i * 45) * 35}%`,
								left: `${35 + Math.cos(i * 45) * 45}%`,
							}}
							animate={{
								y: [-15, 15, -15],
								x: [-10, 10, -10],
								opacity: [0.8, 1, 0.3, 0.8],
								scale: [0.5, 1, 0.5]
							}}
							transition={{
								duration: 2 + i * 0.2,
								repeat: Infinity,
								ease: "easeInOut",
								delay: i * 0.15
							}}
						/>
					))}
				</motion.div>

				<motion.h1 
					className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent tracking-tight"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.6 }}
				>
					Jalur Salah Bro!
				</motion.h1>
				
				<motion.p 
					className="text-gray-700 mb-2 text-lg font-semibold"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.6 }}
				>
					Kayaknya dayungmu ke arah yang salah nih...
				</motion.p>
				
				<motion.p 
					className="text-gray-600 mb-8 text-sm leading-relaxed"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6, duration: 0.6 }}
				>
					Dayung lagi ke jalur yang benar biar sampai finish line!
				</motion.p>

				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Button
						onClick={handleGoBack}
						className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 border-0"
					>
						<ArrowLeft className="w-5 h-5" />
						Kembali ke Pangkalan
					</Button>
				</motion.div>

				{/* Decorative elements */}
				<div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-400 rounded-full opacity-60"></div>
				<div className="absolute -bottom-6 -left-6 w-12 h-12 bg-blue-400 rounded-full opacity-40"></div>
			</motion.div>

			{/* Floating boats in background */}
			<motion.div
				className="absolute top-1/4 left-10 text-6xl opacity-20"
				animate={{
					y: [-20, 20, -20],
					rotate: [0, 5, -5, 0]
				}}
				transition={{
					duration: 6,
					repeat: Infinity,
					ease: "easeInOut"
				}}
			>
				🛶
			</motion.div>
			
			<motion.div
				className="absolute bottom-1/4 right-16 text-4xl opacity-30"
				animate={{
					y: [20, -20, 20],
					rotate: [0, -3, 3, 0]
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: "easeInOut",
					delay: 2
				}}
			>
				⛵
			</motion.div>
		</div>
	);
};

export default NotFoundPage;