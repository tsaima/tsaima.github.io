// Tools and languages, each with its own icon. Project tags that name a tool show its icon on the project
// thumbnail; tags that name a method (kinematics, soldering) stay as text.
import {
	siAndroidstudio,
	siArduino,
	siC,
	siCplusplus,
	siEspressif,
	siClaude,
	siGithub,
	siGithubcopilot,
	siLinux,
	siMicropython,
	siOpenjdk,
	siPython,
} from 'simple-icons';

export type Tool = {
	name: string;
	group: 'Languages' | 'Hardware and EDA' | 'CAD and software tools';
	path: string; // one SVG path on a 24 x 24 grid, drawn in the current text colour
	tags: string[]; // project tags that mean this tool
};

// Simple glyphs drawn for tools with no published icon, or whose mark is a wordmark that blurs at icon size.
const glyph = {
	plot: 'M2 20h20v2H2zM3 19c3-1 4-9 7-9s3 5 5 5 3-8 6-11v15H3z',
	wave: 'M2 15h4V5h6v10h4V5h6v2h-4v10h-8V7H8v10H2z',
	cube: 'M12 3.2 19.6 7.4 12 11.6 4.4 7.4zM3.6 8.6l7.6 4.2v8.4L3.6 17zm9.2 4.2 7.6-4.2V17l-7.6 4.2z',
	bars: 'M3 19h18v2H3zM5 17h3V9H5zm5.5 0h3V4h-3zm5.5 0h3v-6h-3z',
	// Circuit-board trace between two pads (KiCad)
	trace: 'M3 6a3 3 0 1 0 6 0 3 3 0 1 0-6 0zM15 18a3 3 0 1 0 6 0 3 3 0 1 0-6 0zM8 5h5.4l5.6 5.6V16h-2v-4.6L12.6 7H8z',
	// Chip with pins (FPGA tools)
	chip: 'M7 7h10v10H7zm3 3v4h4v-4zM3 8h3v2H3zm0 6h3v2H3zm15-6h3v2h-3zm0 6h3v2h-3zM8 3h2v3H8zm6 0h2v3h-2zM8 18h2v3H8zm6 0h2v3h-2z',
	// Stacked blocks (Tinkercad)
	blocks: 'M3 13h8v8H3zm10 0h8v8h-8zM8 3h8v8H8z',
};

export const tools: Tool[] = [
	{ name: 'Python', group: 'Languages', path: siPython.path, tags: ['Python'] },
	{ name: 'C', group: 'Languages', path: siC.path, tags: ['C', 'C/C++'] },
	{ name: 'C++', group: 'Languages', path: siCplusplus.path, tags: ['C++', 'C/C++'] },
	{ name: 'Java', group: 'Languages', path: siOpenjdk.path, tags: ['Java'] },
	{ name: 'MATLAB', group: 'Languages', path: glyph.plot, tags: ['MATLAB', 'Regression Learner'] },
	{ name: 'Verilog', group: 'Languages', path: glyph.wave, tags: ['Verilog'] },
	{ name: 'MicroPython', group: 'Languages', path: siMicropython.path, tags: ['MicroPython'] },
	{ name: 'JMP', group: 'Languages', path: glyph.bars, tags: ['JMP', 'JMP SL'] },
	{ name: 'ESP32', group: 'Hardware and EDA', path: siEspressif.path, tags: ['ESP32', 'ESP32-S3', 'ESP-IDF', 'XIAO ESP32-S3'] },
	{ name: 'Arduino', group: 'Hardware and EDA', path: siArduino.path, tags: ['Arduino'] },
	{ name: 'Xilinx Vivado', group: 'Hardware and EDA', path: glyph.chip, tags: ['Xilinx Vivado'] },
	{ name: 'KiCad', group: 'Hardware and EDA', path: glyph.trace, tags: ['KiCad'] },
	{ name: 'Onshape', group: 'CAD and software tools', path: glyph.cube, tags: ['Onshape'] },
	{ name: 'Tinkercad', group: 'CAD and software tools', path: glyph.blocks, tags: ['Tinkercad'] },
	{ name: 'Android Studio', group: 'CAD and software tools', path: siAndroidstudio.path, tags: ['Android Studio'] },
	{ name: 'Git', group: 'CAD and software tools', path: siGithub.path, tags: ['Git', 'Git and GitHub'] },
	{ name: 'Linux', group: 'CAD and software tools', path: siLinux.path, tags: ['Linux'] },
	{ name: 'GitHub Copilot', group: 'CAD and software tools', path: siGithubcopilot.path, tags: ['GitHub Copilot'] },
	{ name: 'Claude Code', group: 'CAD and software tools', path: siClaude.path, tags: ['Claude Code'] },
];

export const toolGroups = (['Languages', 'Hardware and EDA', 'CAD and software tools'] as const).map((g) => ({
	title: g,
	tools: tools.filter((t) => t.group === g),
}));

// Listed as words, without icons.
export const pythonLibraries = ['pytest', 'pandas', 'NumPy', 'Matplotlib', 'PyVISA'];

export const labEquipment = [
	'Oscilloscope',
	'DC power supply',
	'Multimeter (DMM)',
	'Function generator',
	'Bit error rate tester',
	'Pattern generator',
	'GPIB and SCPI',
];

export const embeddedAndPower = [
	'I2C',
	'PWM motor control',
	'Encoders',
	'Voltage and current sensing (INA226)',
	'Power budgeting',
	'Battery sizing',
	'Buck and boost converters',
	'Circuit wiring',
	'Motor characterization',
	'Test planning',
];

export const analysisAndFabrication = [
	'Kinematics',
	'DC optimal power flow',
	'Linear programming',
	'Soldering',
	'Laser cutting',
	'3D printing',
];

// Look tools up by their display names.
export const toolsNamed = (names: string[] = []) => names.map((n) => tools.find((t) => t.name === n)).filter((t): t is Tool => !!t);

// The tools a project used, in tag order, each once.
export const toolsFor = (tags: string[]) => {
	const found: Tool[] = [];
	for (const tag of tags) {
		const t = tools.find((x) => x.tags.includes(tag));
		if (t && !found.includes(t)) found.push(t);
	}
	return found;
};
