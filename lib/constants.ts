// Site-wide settings and the content for the Home, About, Experience and Contact pages.
// Project content lives in lib/projects.ts.

export const siteConfig = {
	name: 'Maxwell Tsai',
	title: 'Maxwell Tsai | Electrical engineering and robotics projects',
	description:
		'Portfolio of Maxwell Tsai, an electrical engineering student at Boston University with a concentration in robotics.',
	mainNav: [
		{ title: 'Home', href: '/' },
		{ title: 'About', href: '/about/' },
		{ title: 'Experience', href: '/experience/' },
		{ title: 'Projects', href: '/projects/' },
		{ title: 'Contact', href: '/contact/' },
	],
	resumes: [
		{ title: 'Electrical engineering resume', short: 'EE resume', href: '/files/Maxwell_Tsai_Resume_EE.pdf' },
		{ title: 'Robotics resume', short: 'Robotics resume', href: '/files/Maxwell_Tsai_Resume_Robotics.pdf' },
	],
	links: {
		email: 'mailto:maxwelljtsai@gmail.com',
		emailText: 'maxwelljtsai@gmail.com',
		linkedin: 'https://linkedin.com/in/maxwelljtsai',
	},
};

export const intro =
	'I am an electrical engineering student with a concentration in robotics. I graduate from Boston University in May 2027.';

export const facts: { label: string; value: string }[] = [
	{ label: 'Degree', value: 'B.S. Electrical Engineering, Boston University' },
	{ label: 'Concentration', value: 'Robotics' },
	{ label: 'Graduation', value: 'May 2027' },
	{ label: 'Experience', value: 'Two Intel internships' },
	{ label: 'Location', value: 'Boston, MA' },
];

export type Experience = {
	title: string;
	company: string;
	location?: string;
	startDate: string;
	endDate: string;
	summary?: string;
	description: string[];
	technologies: string[];
	// Optional layer diagram, drawn top to bottom
	layers?: { title: string; label: string; detail: string }[];
};

export const experiences: Experience[] = [
	{
		title: 'Data Science and Analytics Intern',
		company: 'Intel',
		location: 'Hillsboro, OR',
		startDate: 'May 2026',
		endDate: 'Aug 2026',
		description: [
			'Cut wafer data retrieval from more than two weeks of manual stitching to two hours (about 100 measurements across about 200 wafers) by building a data-pulling tool in JMP Scripting Language with the device and automation teams. The team adopted it and kept using it after the internship.',
			'Started with a ridge regression model predicting in-line electrical test values, and traced its errors to outdated metrology revisions in the training data: reprocessing uploads several model revisions per measurement, and the existing system had no clean way to pick the right one.',
			'The tool pulls all data per wafer, parses upload file names, and keeps only the latest revision per measurement per wafer.',
		],
		technologies: ['JMP Scripting Language', 'JMP', 'Ridge regression', 'GitHub Copilot'],
	},
	{
		title: 'Analog Product Development & Test Engineer Intern',
		company: 'Intel',
		location: 'Hillsboro, OR',
		startDate: 'May 2025',
		endDate: 'Aug 2025',
		summary:
			'Analog product development engineers were scripting lab tests with each instrument\'s own commands. I built a common Python layer so the same test code drives any of the lab\'s instruments, including from remote desktop.',
		description: [
			'Architected an object-oriented Python API that abstracts 4 lab instruments, including a bit error rate tester, as generalized scopes, clocks and sources, so engineers test with common functions instead of instrument-specific commands.',
			'Automated IEEE 488.2 SCPI communication over GPIB with PyVISA to configure instruments and transfer measurement data.',
			'Refactored more than 7,000 lines of Python to PEP 8 standards and wrote about 100 unit tests covering the API functions for each instrument.',
		],
		layers: [
			{ title: 'Test script', label: 'Engineer', detail: 'Written once, run over remote desktop' },
			{ title: 'Common functions', label: 'My API', detail: 'Generalized Scope, Clock and Source classes' },
			{ title: 'Instrument drivers', label: 'My API', detail: '4 instruments, including a bit error rate tester' },
			{ title: 'PyVISA over GPIB', label: 'Bus', detail: 'IEEE 488.2 SCPI commands and data transfer' },
		],
		technologies: ['Python', 'Object-oriented design', 'PyVISA', 'GPIB', 'IEEE 488.2 SCPI', 'Bit error rate tester', 'Unit testing', 'PEP 8'],
	},
];

export type Education = {
	degree: string;
	field: string;
	institution: string;
	location: string;
	endDate: string;
	details: string[];
};

export const education: Education[] = [
	{
		degree: 'Bachelor of Science',
		field: 'Electrical Engineering, robotics concentration',
		institution: 'Boston University',
		location: 'Boston, MA',
		endDate: 'Expected May 2027',
		details: [],
	},
];

// Skills are taken from the "Skills used" rows of the project pages.
export const skillGroups: { title: string; skills: string[] }[] = [
	{
		title: 'Embedded and hardware',
		skills: ['ESP32-S3', 'ESP-IDF', 'Arduino', 'I2C', 'PWM motor control', 'Power budgeting', 'Buck converters', 'Circuit wiring', 'Motor characterization', 'Test planning'],
	},
	{
		title: 'Programming',
		skills: ['Python', 'C/C++', 'MATLAB', 'Verilog', 'Java', 'JMP SL'],
	},
	{
		title: 'Analysis and tools',
		skills: ['Kinematics', 'DC optimal power flow', 'Linear programming', 'Xilinx Vivado', 'Android Studio', 'Onshape', 'Laser cutting'],
	},
];
