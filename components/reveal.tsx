'use client';

import { useEffect, useRef } from 'react';

// Fades content up gently the first time it scrolls into view. Content is visible by default:
// only elements that start below the fold are hidden, and only when motion is allowed.
export function Reveal({ children, className, as: Tag = 'div', id }: { children: React.ReactNode; className?: string; as?: 'div' | 'section' | 'li'; id?: string }) {
	const ref = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
		el.dataset.reveal = 'pending';
		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				el.dataset.reveal = 'in';
				io.disconnect();
			},
			{ rootMargin: '0px 0px -10% 0px' },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<Tag ref={ref as React.Ref<never>} className={className} id={id}>
			{children}
		</Tag>
	);
}
