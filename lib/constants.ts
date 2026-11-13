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
	description: string[];
	technologies: string[];
};

export const experiences: Experience[] = [
	{
		title: 'Data Science and Analytics Intern',
		company: 'Intel',
		startDate: 'Summer 2026',
		endDate: '',
		description: [
			'Started with ridge regression on in-line electrical test measurements from wafers, then found the training data was corrupt: metrology reprocessing uploads several model revisions per measurement, and the data-pulling system had no clean way to pick the correct one.',
			'Worked with device engineers and the automation team to build an alpha branch of the data-pulling system that pulls all data per wafer, parses upload file names, and keeps the most recent model revision per measurement.',
			'Cut a data pull that took over two weeks of manual stitching to two hours. The tool was adopted and stayed in use after the internship.',
		],
		technologies: ['JMP Scripting Language', 'Ridge regression', 'GitHub Copilot'],
	},
	{
		title: 'Analog Product Development and Test Intern',
		company: 'Intel',
		startDate: 'Summer 2025',
		endDate: '',
		description: [
			'Wrote a Python instrument-control API that let analog product development engineers script tests over remote desktop with common functions instead of instrument-specific commands.',
			'Covered four lab instruments, including a bit error rate tester, and wrote about 100 unit tests.',
		],
		technologies: ['Python', 'Instrument control', 'Unit testing'],
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
		skills: ['C', 'Python', 'Java', 'C++', 'Verilog', 'MATLAB', 'JMP Scripting Language'],
	},
	{
		title: 'Analysis and tools',
		skills: ['Kinematics', 'DC optimal power flow', 'Linear programming', 'Xilinx Vivado', 'Android Studio', 'Onshape', 'Laser cutting'],
	},
];
