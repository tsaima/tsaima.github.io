// Site-wide settings and the content for the Home, About, Experience and Contact pages.
// Project content lives in lib/projects.ts.

export const siteConfig = {
	name: 'Maxwell Tsai',
	title: 'Maxwell Tsai | Electrical engineering and robotics projects',
	description:
		'Portfolio of Maxwell Tsai, an electrical engineering student at Boston University with a concentration in robotics.',
	// Sections of the single home page, in scroll order.
	mainNav: [
		{ title: 'About', id: 'about' },
		{ title: 'Experience', id: 'experience' },
		{ title: 'Projects', id: 'projects' },
		{ title: 'Skills', id: 'skills' },
		{ title: 'Contact', id: 'contact' },
	],
	// One general resume. To swap it, change the file name here.
	resume: encodeURI("/files/Maxwell Tsai Resume (Robotics Hardware).pdf"),
	links: {
		email: 'mailto:maxwelljtsai@gmail.com',
		emailText: 'maxwelljtsai@gmail.com',
		// Paste your Formspree form ID here (e.g. 'xpzvqkdl') to send contact-form messages straight to your inbox.
		// Left empty, the form opens the visitor's email app with the message filled in instead.
		formspreeId: '',
		linkedin: 'https://linkedin.com/in/maxwelljtsai',
	},
};

export type Experience = {
	title: string;
	company: string;
	location?: string;
	startDate: string;
	endDate: string;
	summary?: string;
	// One line for the home page row.
	headline: string;
	// Tools shown as icons on the home page row (names from lib/skills.ts).
	tools?: string[];
	description: string[];
	technologies: string[];
	// Optional layer diagram, drawn top to bottom
	layers?: { title: string; label: string; detail: string }[];
};

// Newest first.
export const experiences: Experience[] = [
	{
		title: 'Grader, Electric Energy Systems',
		headline: 'Grade homework and exams on power flow, three-phase systems and grid analysis.',
		company: 'Boston University Dept. of Electrical and Computer Engineering',
		location: 'Boston, MA',
		startDate: 'Sep 2026',
		endDate: 'Present',
		description: [
			'Grade homework and exams, evaluating student work on power flow, three-phase systems and grid analysis, and give written feedback on errors in method and reasoning.',
		],
		technologies: ['Power flow', 'Three-phase systems', 'Grid analysis'],
	},
	{
		title: 'Data Science and Analytics Intern',
		headline: 'Built a JMP tool that cut wafer data retrieval from over two weeks to two hours. The team kept using it.',
		tools: ['JMP', 'GitHub Copilot'],
		company: 'Intel',
		location: 'Hillsboro, OR',
		startDate: 'May 2026',
		endDate: 'Aug 2026',
		description: [
			'Cut wafer data retrieval from more than two weeks of manual stitching to two hours (about 100 measurements across about 200 wafers) by building a data-pulling tool in JMP Scripting Language with the device and automation teams. The team adopted it and kept using it after the internship.',
			'Visualized in-line electrical test measurements against end-of-line performance metrics in JMP to look for correlations.',
			'Started with a ridge regression model predicting in-line electrical test values, and traced its errors to outdated metrology revisions in the training data: reprocessing uploads several model revisions per measurement, and the existing system had no clean way to pick the right one.',
			'The tool pulls all data per wafer, parses upload file names, and keeps only the latest revision per measurement per wafer. I built it with GitHub Copilot agents, and we deployed it as an alpha branch of the data-pulling system.',
		],
		technologies: ['JMP Scripting Language', 'JMP', 'Ridge regression', 'GitHub Copilot'],
	},
	{
		title: 'Teaching Assistant, Logic Design',
		headline: 'Led Verilog FPGA lab sections in Vivado and graded work for 80+ students.',
		tools: ['Verilog', 'Xilinx Vivado'],
		company: 'Boston University Dept. of Electrical and Computer Engineering',
		location: 'Boston, MA',
		startDate: 'Jan 2026',
		endDate: 'May 2026',
		description: [
			'Led Verilog FPGA lab sections in Vivado and debugged student designs.',
			'Graded homework and exams for 80+ students.',
		],
		technologies: ['Verilog', 'FPGA', 'Xilinx Vivado'],
	},
	{
		title: 'Undergraduate Research Assistant',
		headline: 'Built an Android app that logs GNSS measurements from 15+ satellites for ionospheric monitoring.',
		tools: ['Java', 'Android Studio'],
		company: 'SemeterLab at Boston University',
		location: 'Boston, MA',
		startDate: 'Sep 2025',
		endDate: 'Dec 2025',
		description: [
			'Developed an Android app logging Global Navigation Satellite System (GNSS) measurements for real-time ionospheric monitoring, tracking 15+ satellites and exporting carrier-to-noise density (C/N0) data.',
		],
		technologies: ['Android', 'GNSS', 'Ionospheric monitoring'],
	},
	{
		title: 'Analog Product Development & Test Engineer Intern',
		headline: 'Built a Python API that runs the same test code on four lab instruments, with about 100 unit tests.',
		tools: ['Python', 'Git'],
		company: 'Intel',
		location: 'Hillsboro, OR',
		startDate: 'May 2025',
		endDate: 'Aug 2025',
		summary:
			'Analog product development engineers were scripting lab tests with each instrument\'s own commands. I built a common Python layer so the same test code drives any of the lab\'s instruments, including from remote desktop.',
		description: [
			'Designed an object-oriented Python API that abstracts 4 lab instruments (2 oscilloscopes, a pattern generator and a bit error rate tester) as generalized scopes, clocks and sources, so engineers test with common functions instead of instrument-specific commands.',
			'Automated IEEE 488.2 SCPI communication over GPIB with PyVISA to configure instruments and transfer measurement data.',
			'Refactored more than 7,000 lines of Python to PEP 8 standards and wrote about 100 pytest unit tests covering the API functions for each instrument.',
			'Wired and labeled 100+ signal multiplexer switches on a test chip PCB to support DDR testing.',
			'Scripted the test chip handler to scan the visual IDs of 1,000+ scrap parts into a CSV before disposal.',
		],
		layers: [
			{ title: 'Test script', label: 'Engineer', detail: 'Written once, run over remote desktop' },
			{ title: 'Common functions', label: 'My API', detail: 'Generalized Scope, Clock and Source classes' },
			{ title: 'Instrument drivers', label: 'My API', detail: '2 oscilloscopes, a pattern generator and a bit error rate tester' },
			{ title: 'PyVISA over GPIB', label: 'Bus', detail: 'IEEE 488.2 SCPI commands and data transfer' },
		],
		technologies: ['Python', 'Object-oriented design', 'PyVISA', 'GPIB', 'IEEE 488.2 SCPI', 'Bit error rate tester', 'pytest', 'PEP 8', 'DDR testing'],
	},
];


// Anchor id for an experience entry, so other pages can link to it: /experience/#intel-data-science-and-analytics-intern
export const experienceId = (e: Experience) =>
	`${e.company.split(' ')[0]}-${e.title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Leadership, shown under Experience on the home page.
export const leadership: { org: string; role: string }[] = [
	{
		org: 'Theta Tau Professional Engineering Fraternity',
		role: 'New Member Education, Professional Development and Brotherhood Chair',
	},
	{
		org: 'BostonU Club Tennis',
		role: 'Community Service Chair',
	},
];

// Relevant coursework at Boston University.
export const coursework = [
	'Robotics',
	'Control Systems',
	'Electronics',
	'Electric Circuits',
	'Logic Design',
	'Signals and Systems',
	'Electric Energy Systems',
	'Electromagnetic Systems',
	'Engineering Mechanics',
	'Software Engineering',
	'Computational Optical Imaging',
	'Probability and Statistics',
	'Power Electronics (Spring 2027)',
	'Digital Image Processing (Spring 2027)',
];
