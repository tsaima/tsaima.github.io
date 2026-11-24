import type { Tool } from '@/lib/skills';

export function SkillIcon({ tool, className = 'h-4 w-4' }: { tool: Tool; className?: string }) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
			<path d={tool.path} fillRule="evenodd" />
		</svg>
	);
}
