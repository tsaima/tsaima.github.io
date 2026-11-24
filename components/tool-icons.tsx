import { SkillIcon } from '@/components/skill-icon';
import type { Tool } from '@/lib/skills';

// A row of tool icons; hovering an icon shows the tool's name above it.
export function ToolIcons({ tools, className = '', iconClassName = 'h-4 w-4' }: { tools: Tool[]; className?: string; iconClassName?: string }) {
	if (tools.length === 0) return null;
	return (
		<span className={`flex flex-wrap items-center ${className}`}>
			{tools.map((t) => (
				<span key={t.name} className="group/icon relative inline-flex">
					<SkillIcon tool={t} className={iconClassName} />
					<span className="sr-only">{t.name}</span>
					<span
						aria-hidden="true"
						className="pointer-events-none absolute bottom-full left-0 z-10 mb-2 whitespace-nowrap rounded-md border bg-background px-2 py-1 text-xs text-foreground opacity-0 translate-y-1 transition duration-150 ease-out group-hover/icon:opacity-100 group-hover/icon:translate-y-0"
					>
						{t.name}
					</span>
				</span>
			))}
		</span>
	);
}
