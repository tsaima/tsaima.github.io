import { Fragment } from 'react';

// Renders **bold** and `code` inside a plain string.
export function RichText({ text }: { text: string }) {
	const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
	return (
		<>
			{parts.map((part, i) => {
				if (part.startsWith('**') && part.endsWith('**'))
					return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
				if (part.startsWith('`') && part.endsWith('`'))
					return <code key={i} className="font-mono text-[0.9em]">{part.slice(1, -1)}</code>;
				return <Fragment key={i}>{part}</Fragment>;
			})}
		</>
	);
}
