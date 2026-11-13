/** @type {import('next').NextConfig} */
const nextConfig = {
	// Build to plain static files in out/ so GitHub Pages can host them.
	output: 'export',
	// /projects/busbot/ is written as projects/busbot/index.html, which GitHub Pages serves directly.
	trailingSlash: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	devIndicators: false,
	images: { unoptimized: true },
};

module.exports = nextConfig;
