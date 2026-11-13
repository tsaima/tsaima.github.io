'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Interactive version of BusBot's stop-distance budget.
// The firmware brakes when an obstacle is 40 cm away. Total stopping distance is
// reaction (speed × 0.1 s) + braking (speed² / 2a) + 2 cm sensor error, and at least 20 cm must be left.

const TRIGGER = 40; // cm
const CLEARANCE = 20; // cm required
const SENSOR_ERR = 2; // cm
const REACTION_S = 0.1; // s
const START = 100; // cm from the obstacle where the animated run begins
const TRACK = 110; // cm shown on the track

export function StopDistanceDemo() {
	const [speed, setSpeed] = useState(0.5); // m/s
	const [decel, setDecel] = useState(1.0); // m/s²
	const [pos, setPos] = useState<number | null>(null); // robot front, cm from obstacle
	const [running, setRunning] = useState(false);
	const raf = useRef(0);

	const reaction = speed * REACTION_S * 100;
	const braking = ((speed * speed) / (2 * decel)) * 100;
	const total = reaction + braking + SENSOR_ERR;
	const left = TRIGGER - reaction - braking - SENSOR_ERR; // worst-case clearance
	const ok = left >= CLEARANCE;
	const neededTrigger = Math.ceil(CLEARANCE + total);

	useEffect(() => () => cancelAnimationFrame(raf.current), []);

	const run = () => {
		cancelAnimationFrame(raf.current);
		setRunning(true);
		const v = speed * 100; // cm/s
		const a = decel * 100; // cm/s²
		// worst case: the sensor reads 2 cm long, so braking is triggered at a true 38 cm
		const tCruise = (START - (TRIGGER - SENSOR_ERR)) / v + REACTION_S;
		const tBrake = v / a;
		const t0 = performance.now();
		const tick = (now: number) => {
			const t = (now - t0) / 1000;
			let x: number;
			if (t < tCruise) x = START - v * t;
			else if (t < tCruise + tBrake) {
				const tb = t - tCruise;
				x = START - v * tCruise - (v * tb - 0.5 * a * tb * tb);
			} else x = START - v * tCruise - (v * tBrake - 0.5 * a * tBrake * tBrake);
			setPos(Math.max(0, x));
			if (t < tCruise + tBrake) raf.current = requestAnimationFrame(tick);
			else setRunning(false);
		};
		raf.current = requestAnimationFrame(tick);
	};

	const reset = () => {
		cancelAnimationFrame(raf.current);
		setRunning(false);
		setPos(null);
	};

	const pct = (cm: number) => `${(cm / TRACK) * 100}%`;
	const robotCm = pos ?? START;
	const finished = pos !== null && !running;

	return (
		<div className="rounded-xl border bg-card p-5 md:p-6 space-y-6">
			<div className="flex flex-wrap items-baseline justify-between gap-2">
				<h4 className="font-semibold text-lg">Try it: stop distance vs. speed</h4>
				<p className="text-xs font-mono text-muted-foreground">BusBot design point: 0.5 m/s, 1.0 m/s²</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
				<label className="space-y-2 block">
					<span className="flex justify-between text-sm">
						<span>Drive speed</span>
						<span className="font-mono text-accent">{speed.toFixed(2)} m/s</span>
					</span>
					<input type="range" min={0.1} max={1.0} step={0.05} value={speed} disabled={running}
						onChange={(e) => { setSpeed(+e.target.value); setPos(null); }} className="copper-range w-full" />
				</label>
				<label className="space-y-2 block">
					<span className="flex justify-between text-sm">
						<span>Braking deceleration</span>
						<span className="font-mono text-accent">{decel.toFixed(2)} m/s²</span>
					</span>
					<input type="range" min={0.5} max={2.0} step={0.05} value={decel} disabled={running}
						onChange={(e) => { setDecel(+e.target.value); setPos(null); }} className="copper-range w-full" />
				</label>
			</div>

			{/* Budget bar, drawn to scale against the 40 cm trigger */}
			<div className="space-y-2">
				<div className="relative h-10 rounded-md bg-muted overflow-hidden flex text-[11px] font-mono">
					<div className="bg-primary/80 text-primary-foreground flex items-center justify-center" style={{ width: pct(CLEARANCE) }}>clear 20</div>
					<div className="bg-[hsl(190_55%_45%)] text-primary-foreground flex items-center justify-center overflow-hidden" style={{ width: pct(reaction) }}>{reaction >= 4 ? reaction.toFixed(1) : ''}</div>
					<div className="bg-accent text-accent-foreground flex items-center justify-center overflow-hidden" style={{ width: pct(braking) }}>{braking >= 4 ? braking.toFixed(1) : ''}</div>
					<div className="bg-secondary flex items-center justify-center" style={{ width: pct(SENSOR_ERR) }} />
					<div className="absolute top-0 bottom-0 border-l-2 border-dashed border-foreground" style={{ left: pct(TRIGGER) }} />
				</div>
				<div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
					<span><i className="inline-block h-2.5 w-2.5 rounded-sm bg-primary/80 mr-1.5 align-middle" />Required clearance 20 cm</span>
					<span><i className="inline-block h-2.5 w-2.5 rounded-sm bg-[hsl(190_55%_45%)] mr-1.5 align-middle" />Reaction {reaction.toFixed(1)} cm</span>
					<span><i className="inline-block h-2.5 w-2.5 rounded-sm bg-accent mr-1.5 align-middle" />Braking {braking.toFixed(1)} cm</span>
					<span><i className="inline-block h-2.5 w-2.5 rounded-sm bg-secondary mr-1.5 align-middle" />Sensor error 2 cm</span>
					<span><i className="inline-block h-3 border-l-2 border-dashed border-foreground mr-1.5 align-middle" />Firmware trigger 40 cm</span>
				</div>
			</div>

			{/* Track: obstacle on the right, distances in cm from it */}
			<div className="space-y-2">
				<div className="relative h-16 rounded-md border bg-background pcb-grid overflow-hidden">
					<div className="absolute inset-y-0 right-0 w-2 bg-foreground/70" title="Obstacle" />
					<div className="absolute inset-y-0 bg-rose-500/10" style={{ right: 0, width: pct(CLEARANCE) }} />
					<div className="absolute inset-y-0 border-l-2 border-dashed border-foreground/70" style={{ right: pct(TRIGGER) }} />
					<div
						className="absolute top-1/2 -translate-y-1/2 h-8 w-12 rounded border-2 border-primary bg-card flex items-center justify-end pr-1"
						style={{ right: `calc(${pct(robotCm)})` }}
					>
						<span className="h-2 w-2 rounded-full bg-primary" />
					</div>
				</div>
				<div className="relative h-4 text-[10px] font-mono text-muted-foreground">
					{[0, 20, 40, 60, 80, 100].map((cm) => (
						<span key={cm} className="absolute" style={{ right: pct(cm), transform: 'translateX(50%)' }}>{cm}</span>
					))}
				</div>
			</div>

			<div className="flex flex-wrap items-center gap-3">
				<Button onClick={run} disabled={running} size="sm"><Play className="mr-2 h-4 w-4" />Run at {speed.toFixed(2)} m/s</Button>
				<Button onClick={reset} variant="outline" size="sm"><RotateCcw className="mr-2 h-4 w-4" />Reset</Button>
				{finished && (pos! > 0.05 ? <span className="text-sm font-mono">Stopped {pos!.toFixed(1)} cm from the obstacle</span> : <span className="text-sm font-mono text-rose-400">Hit the obstacle</span>)}
			</div>

			<p className={cn('rounded-md border p-3 text-sm', ok ? 'border-primary/50 bg-primary/10' : 'border-rose-500/50 bg-rose-500/10')}>
				{ok ? (
					<>Total stopping distance is <b>{total.toFixed(1)} cm</b>, so braking at 40 cm leaves <b>{left.toFixed(1)} cm</b>. That meets the 20 cm requirement.</>
				) : (
					<>Total stopping distance is <b>{total.toFixed(1)} cm</b>, so braking at 40 cm {left > 0 ? <>leaves only <b>{left.toFixed(1)} cm</b></> : <>means the robot <b>hits the obstacle</b></>}. At this speed the trigger would need to move out to about <b>{neededTrigger} cm</b>, where the sensor already under-reads (see the 80 cm test below).</>
				)}
			</p>
		</div>
	);
}
