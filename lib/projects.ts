// All project content. Each project gets a card on /projects and its own page at /projects/<slug>/.
// Text supports **bold** and `code`. Table cells that say exactly "Pass" or "Fail" are colored.

export type Figure = { src: string; alt: string; caption: string };

export type Block =
	| { type: 'p'; text: string }
	| { type: 'h3'; text: string }
	| { type: 'list'; items: string[] }
	| { type: 'note'; text: string }
	| { type: 'code'; text: string }
	| { type: 'equation'; lines: string[] }
	| { type: 'button'; label: string; href: string }
	| { type: 'figure'; figure: Figure }
	| { type: 'figures'; figures: Figure[] }
	| { type: 'video'; src: string; label: string; caption: string }
	| {
			type: 'table';
			caption?: string;
			head?: string[];
			rows: string[][];
			rowHeaders?: boolean; // first cell of each row is a label
			mine?: number[]; // row indexes to highlight as "my work"
			numeric?: number[]; // column indexes to right-align
	  }
	| { type: 'budget'; caption: string; segments: { value: string; label: string }[] }
	| { type: 'trials'; caption: string; note: string; rows: { label: string; results: boolean[] }[] }
	| { type: 'cols'; left: Block[]; right: Block[] };

export type Section = { id?: string; title: string; blocks: Block[] };

export type Project = {
	slug: string;
	title: string;
	category: 'Hardware' | 'Software';
	period: string;
	status: string;
	role: string;
	summary: string; // one or two sentences for the project card
	blurb?: string; // one short line for the home page part cards
	lead: string; // opening line on the project page
	image?: string; // card image (falls back to a title card)
	tags: string[];
	featured?: boolean;
	pinned?: boolean; // one of the six main projects (project map, main grid)
	facts: [string, string][];
	hero?: Block; // figure or video next to the facts table
	sections: Section[];
};

const busbot: Project = {
	slug: 'busbot',
	blurb: 'Robot that collects dishes in dishwasher racks. I lead sensor integration.',
	pinned: true,
	title: 'BusBot',
	category: 'Hardware',
	period: 'May 2026 to Spring 2027, in progress',
	status: 'In progress',
	role: 'Sensor integration lead',
	featured: true,
	summary:
		'An autonomous robot that drives to a restaurant table on request, carries standard dishwasher racks, and returns them to staff. I am the sensor integration lead on a six-person team.',
	lead: 'A robot that drives to a restaurant table when a diner requests it, collects dishes in standard dishwasher racks, and brings them back to staff.',
	image: '/images/BusBot_FrontView.jpg',
	tags: ['ESP32-S3', 'C', 'ESP-IDF', 'KiCad', 'Git', 'I2C', 'System integration', 'Power budgeting'],
	facts: [
		['My role', 'Sensor integration lead: ultrasonic sensors, battery monitor, wheel encoders. Team lead for the first two months, running weekly faculty design reviews.'],
		['Team', '6 (2 electrical, 2 computer, 2 mechanical engineers)'],
		['Skills used', 'C, ESP-IDF, ESP32-S3, KiCad, Git, I2C, PWM motor control, system integration, test planning, power budgeting'],
		['Status', 'Driving base runs on battery and stops for obstacles. Circuit board next.'],
	],
	hero: {
		type: 'figure',
		figure: {
			src: '/images/BusBot_FrontView.jpg',
			alt: 'Front view of the BusBot driving base with labeled parts: SICK LiDAR, 12 V battery, Jetson Orin Nano, rocker switch, common ground, two motor drivers, 12 to 19 V boost, 12 to 5 V buck, voltage and current monitor, ESP32-S3 and ultrasonic sensor',
			caption: 'The integrated driving base, November 2026.',
		},
	},
	sections: [
		{
			id: 'system',
			title: 'System',
			blocks: [
				{ type: 'p', text: 'Safety tasks (motor PWM, ultrasonic, encoders) run on the ESP32-S3. Mapping and the request server run on the Jetson, so a stalled Jetson can never delay a stop.' },
				{
					type: 'figure',
					figure: {
						src: '/images/BusBot_SystemIntegration_Diagram.png',
						alt: 'Hand-drawn system integration diagram: battery, rocker switch, 20 A fuse and voltage/current monitor feeding a 12 to 5 V buck for the ESP32, a 12 to 19 V boost for the Jetson, the LiDAR and two motor drivers; the ESP32 reads the ultrasonic sensor and both encoders and talks to the Jetson over UART',
						caption: 'My integration diagram. Red: 12 V power. Orange: ESP32 3.3 V. Blue: ESP32 data. Purple: Jetson data.',
					},
				},
			],
		},
		{
			id: 'integration',
			title: 'Integration and floor test',
			blocks: [
				{
					type: 'video',
					src: '/videos/BusBot_SystemIntegration.mp4',
					label: 'Video of the BusBot base driving toward a box and stopping',
					caption: 'Floor test on battery: it stopped 0.2 m from the box, and the encoder distance was within 4 cm of a tape measurement.',
				},
				{
					type: 'figures',
					figures: [
						{ src: '/images/BusBot_Navigation.jpg', alt: 'The BusBot base on a lab bench next to the Jetson Orin Nano and SICK LiDAR, with a monitor showing the LiDAR scan in ROS 2', caption: 'Jetson and LiDAR running from the robot battery, through a 12 → 19 V boost I tuned.' },
						{ src: '/images/BusBot_RearView.jpg', alt: 'Rear of the BusBot base with labels for the 20 A fuse, the 2 A inline fuses, the test QR code, motor 1 and wheel 1', caption: 'Rear: 20 A main fuse, inline fuses for the Jetson and LiDAR.' },
					],
				},
			],
		},
		{
			id: 'sensors',
			title: 'Ultrasonic obstacle stop',
			blocks: [
				{ type: 'p', text: 'Ultrasonic sensors cover the LiDAR\'s 84° rear blind spot. My firmware (C, ESP-IDF) brakes at 40 cm and resumes past 45 cm.' },
				{
					type: 'budget',
					caption: 'Stop-distance budget: 39.5 cm, so the firmware brakes at 40 cm.',
					segments: [
						{ value: '20 cm', label: 'Required clearance' },
						{ value: '5 cm', label: 'Reaction: 0.1 s at 0.5 m/s' },
						{ value: '12.5 cm', label: 'Braking at 1 m/s²' },
						{ value: '2 cm', label: 'Sensor error' },
					],
				},
				{
					type: 'cols',
					left: [
						{
							type: 'table',
							caption: 'Bench results, November 10, 2026.',
							head: ['Parameter', 'Limit', 'Measured', 'Result'],
							rows: [
								['Reading at 20 cm', '±2 cm', '20.2 cm', 'Pass'],
								['Reading at 40 cm', '±2 cm', '38.6 cm', 'Pass'],
								['Reading at 80 cm', '±2 cm', '50.6 cm', 'Fail'],
								['Detection to brake', '0.10 s max', '0.06 s or less', 'Pass'],
								['Stop and restart', '5 of 5', '5 of 5', 'Pass'],
							],
						},
					],
					right: [
						{
							type: 'figure',
							figure: {
								src: '/images/BusBot_UltrasonicTest_Fixture.jpg',
								alt: 'Bench fixture for the ultrasonic obstacle test: sensor, ESP32-S3, motor driver and gearmotor on a 12 V supply',
								caption: 'The bench fixture I built: 12 V supply, fuse, E-stop, motor driver and encoder.',
							},
						},
					],
				},
			],
		},
		{
			id: 'power',
			title: 'Power',
			blocks: [
				{
					type: 'cols',
					left: [
						{
							type: 'figure',
							figure: {
								src: '/images/BusBot_FrontEnd_CircuitDiagram.png',
								alt: 'Circuit diagram of the BusBot power front end: battery, fuse, emergency stop, and INA226 battery monitor reporting to the ESP32-S3',
								caption: 'INA226 battery monitor on I2C. Readings matched a multimeter and the bench supply.',
							},
						},
					],
					right: [
						{
							type: 'table',
							caption: 'My power budget. The 18 Ah test battery gives 2.47 h; the final robot needs 22 Ah or more.',
							head: ['Branch', 'Loads', 'Power'],
							numeric: [2],
							rows: [
								['Drive', 'Two gearmotors, plus 20% for turns and starts', '20.9 W'],
								['Compute', 'Jetson (15 W mode), LiDAR, camera, losses', '21.1 W'],
								['Control', 'ESP32-S3 and its sensors', '1.7 W'],
								['**Total**', '3.6 A from the 12 V battery', '**43.7 W**'],
							],
						},
					],
				},
			],
		},
		{
			id: 'iterations',
			title: 'What failed and what changed',
			blocks: [
				{
					type: 'table',
					head: ['Problem', 'Cause', 'Change'],
					rows: [
						['LiDAR blind spot', 'The LiDAR covers 276°, not 360°.', 'Added rear ultrasonic sensing.'],
						["Motor wouldn't start", 'The echo divider dropped the signal below the ESP32-S3 logic threshold.', 'Removed the divider.'],
						['Drift to one side', 'Two mismatched motor drivers on the same PWM.', 'Specified one two-channel Cytron MDD20A.'],
						['Ultrasonic range error', 'Read 50.6 cm for a target at 80 cm.', 'Retesting with a new sensor.'],
						['Boost wired backwards', 'Blew the 2 A fuse on the Jetson lead.', 'Rewired; replaced with a 3 A fuse.'],
						['Power budget grew', 'Moving to a Jetson raised it from about 35 W to 43.7 W.', 'Final robot needs 22 Ah or more.'],
					],
				},
			],
		},
		{
			id: 'next',
			title: 'Next',
			blocks: [
				{
					type: 'list',
					items: [
						'Rerun the straight-line test on the MDD20A.',
						'Add a push-button emergency stop ahead of the converters.',
						'Lay out the main circuit board in KiCad.',
					],
				},
			],
		},
	],
};

const laundryFolder: Project = {
	slug: 'laundry-folder',
	blurb: 'Three-joint arm that folds a shirt. Only electrical engineer on the team.',
	pinned: true,
	title: 'Laundry Folder',
	category: 'Hardware',
	period: 'Spring 2026',
	status: 'Complete',
	role: 'Power, forward kinematics, control debugging',
	summary: 'A three-joint robot arm that folds a shirt by lifting the panels of a folding board with an electromagnet. I was the only electrical engineer on the team.',
	lead: 'A three-joint robot arm that folds a shirt by lifting the panels of a folding board with an electromagnet. It reached every planned position and never completed a fold.',
	image: '/images/LaundryFolder_Image.jpg',
	tags: ['Arduino', 'Kinematics', 'MATLAB', 'Power distribution'],
	facts: [
		['My role', 'Only electrical engineer: power, forward kinematics, Arduino control debugging'],
		['Team', '5 (3 mechanical, 1 electrical, 1 biomedical)'],
		['Skills used', 'Power distribution, buck converters, Arduino, kinematics, MATLAB'],
		['Design', 'SCARA-inspired 2R1P arm: two rotating joints with 9.35 in links, one vertical joint, 12 V electromagnet'],
		['Status', 'Complete. See "What went wrong" below.'],
	],
	hero: {
		type: 'figure',
		figure: { src: '/images/LaundryFolder_Image.jpg', alt: 'The assembled laundry folding arm on its aluminum frame above the folding board', caption: 'The assembled arm.' },
	},
	sections: [
		{
			title: 'What I did',
			blocks: [
				{
					type: 'list',
					items: [
						"**Power.** One 12 V supply feeds the electromagnet directly. Buck converters step it down to 5 V for the two 25 kg·cm joint servos and the Arduino Uno, so a loaded servo cannot pull down the controller's supply.",
						"**Forward kinematics.** Derived by hand from the arm's Denavit-Hartenberg parameters.",
						"**Control debugging.** Converted a teammate's inverse kinematics angles into servo commands and debugged the Arduino code until all twelve steps of the folding path reached the right joint angles.",
					],
				},
				{
					type: 'figures',
					figures: [
						{ src: '/images/LaundryFolder_Circuitry.jpg', alt: 'Wiring diagram: 12 V supply, buck converters, Arduino Uno, servos and electromagnet', caption: 'Power and control wiring.' },
						{ src: '/images/LaundryFolder_DH_Params.png', alt: 'Diagram of the arm with coordinate frames and Denavit-Hartenberg parameters', caption: 'Coordinate frames and parameters.' },
						{ src: '/images/LaundryFolder_FK_Derivation.png', alt: 'Hand derivation of the forward kinematics transformation matrices', caption: 'My forward kinematics derivation.' },
						{ src: '/images/LaundryFolder_EE_Trajectory.png', alt: 'MATLAB plot of the planned electromagnet path over the folding board', caption: "Planned path, from the team's MATLAB simulation." },
					],
				},
			],
		},
		{
			id: 'errata',
			title: 'What went wrong',
			blocks: [
				{
					type: 'table',
					caption: 'The arm did not complete a fold.',
					rowHeaders: true,
					rows: [
						['Symptom', 'Each joint reached its target angle, but the magnet dropped or dragged the panel.'],
						['Root cause', 'The control loop moved one joint at a time. The magnet traveled along two separate arcs instead of the planned straight line, and a hinged panel has to follow one specific path.'],
						['Contributing', 'The magnet hung on a string and swung after each move. The links flexed under load. The board was not fastened down.'],
						['Fix', 'Step both joints in the same loop so they start and finish together, replace the string with a rigid slide, and bolt the arm and board to one base.'],
					],
				},
				{ type: 'code', text: '// The loop at fault: one joint at a time, one degree every 40 ms\nsweepTo(joint1, joint1.read(), 84);\nsweepTo(joint2, joint2.read(), 136);' },
				{ type: 'p', text: 'What I took into BusBot: a correct model is not a working robot, so I now test motion on hardware early.' },
			],
		},
	],
};

const bedsideBeacon: Project = {
	slug: 'bedside-beacon',
	blurb: 'Patient call system that sends a typed message across the room on a laser.',
	pinned: true,
	title: 'Bedside Beacon',
	category: 'Hardware',
	period: 'Fall 2025',
	status: 'Complete',
	role: 'Motor testing, transmitter wiring, housing',
	summary: 'A backup call system for hospital patients: a typed message crosses the room on a laser beam to a display a caregiver can read, with no network needed.',
	lead: 'A backup call system for hospital patients. A typed message crosses the room on a laser beam to a display a caregiver can read, with no network needed.',
	image: '/images/BedsideBeacon_Image.jpg',
	tags: ['ESP32', 'Circuit wiring', 'Motor testing', 'Onshape', 'Laser cutting'],
	facts: [
		['My role', 'Aiming motor tests, transmitter wiring, all housing design and build'],
		['Team', '4'],
		['Skills used', 'ESP32, circuit wiring, motor characterization, Onshape, laser cutting'],
		['How it works', 'A servo aims a 650 nm laser. Text is sent as timed pulses of 8-bit ASCII. A photodiode behind a 42 mm lens reads it back.'],
		['Cost', '$119'],
	],
	hero: {
		type: 'figure',
		figure: { src: '/images/BedsideBeacon_Image.jpg', alt: 'The finished Bedside Beacon transmitter and receiver in their wooden housings', caption: 'Transmitter and receiver.' },
	},
	sections: [
		{
			title: 'What I did',
			blocks: [
				{
					type: 'cols',
					left: [
						{
							type: 'list',
							items: [
								'**Motor testing.** Before we designed around a stepper motor, a teammate and I measured how well it held a 90° turn under load. It was accurate up to about 300 g and fell 14° short at 500 g. The final design uses a servo carrying only the laser.',
								'**Transmitter wiring.** Keypad, steering buttons, servo, laser and display.',
								'**Housing.** Drawn in Onshape, laser-cut from 3 mm wood. The keypad got its own enclosure after we saw that typing shifted the laser.',
							],
						},
						{ type: 'figure', figure: { src: '/images/BedsideBeacon_Prototype.jpg', alt: 'The Bedside Beacon prototype before the final housing', caption: 'Prototype, before the final housing.' } },
					],
					right: [
						{
							type: 'table',
							caption: 'Stepper motor rotation to a 90° target, five trials per load.',
							head: ['Load', 'Average', 'Std. dev.'],
							numeric: [0, 1, 2],
							rows: [
								['0 g', '90.7°', '1.2°'],
								['100 g', '88.7°', '0.7°'],
								['200 g', '87.6°', '0.2°'],
								['300 g', '90.9°', '0.5°'],
								['400 g', '82.6°', '2.3°'],
								['500 g', '76.2°', '3.8°'],
							],
						},
					],
				},
			],
		},
		{
			id: 'results',
			title: 'Performance',
			blocks: [
				{
					type: 'cols',
					left: [
						{
							type: 'trials',
							caption: 'Range test. Each square is one transmission, in order.',
							note: 'Filled square: message received. Outlined square: failed. Requirement: 5 ft.',
							rows: [
								{ label: '4 ft', results: [false, true, true, true, true, true, true] },
								{ label: '6 ft', results: [true, true, true, true, true, true, true] },
								{ label: '8 ft', results: [true, true, true, true, false, true, true] },
								{ label: '10 ft', results: [true, false, true, false, true, false, true] },
								{ label: '12 ft', results: [false, true, true, false, false, true, false] },
								{ label: '15 ft', results: [true, false, false, true, true, false, false] },
							],
						},
					],
					right: [
						{
							type: 'list',
							items: [
								'From 4 to 8 ft, 19 of 21 transmissions succeeded (90%), meeting the 5 ft requirement.',
								'From 10 ft out, about half failed. The likely cause is aiming: one servo step can move the beam farther than the lens is wide.',
							],
						},
					],
				},
			],
		},
		{
			id: 'errata',
			title: 'What went wrong',
			blocks: [
				{
					type: 'cols',
					left: [
						{
							type: 'list',
							items: [
								'The laser had almost no margin for error: the beam had to land directly on the photodiode.',
								'We put a convex lens in front of the photodiode to redirect the beam onto it from any angle. It helped, but did not fully work.',
								'So the receiver still has to face the transmitter squarely to read a message, as the bird\'s eye view shows.',
							],
						},
					],
					right: [
						{ type: 'figure', figure: { src: '/images/BedsideBeacon_BEV.jpg', alt: "Bird's eye view of the transmitter and receiver showing the laser path and the receiver facing the transmitter squarely", caption: 'The receiver faces the transmitter squarely so the beam reaches the photodiode.' } },
					],
				},
			],
		},
	],
};

const dcOpf: Project = {
	slug: 'dc-opf',
	blurb: 'MATLAB optimal power flow study of new generation on the New England grid.',
	title: 'Grid congestion',
	category: 'Software',
	period: 'Fall 2025',
	status: 'Complete',
	role: 'Optimization formulation',
	summary: 'An optimal power flow study in MATLAB: where should new local generation go on the New England grid so that no transmission line runs near its limit?',
	lead: 'Where should new local generation go on the New England grid so that no transmission line runs near its limit?',
	image: '/images/DCOPF_Congestion.png',
	tags: ['DC optimal power flow', 'Linear programming', 'MATLAB'],
	facts: [
		['My role', 'Wrote the optimization formulation'],
		['Team', '5'],
		['Skills used', 'DC optimal power flow, linear programming, MATLAB'],
		['Model', 'IEEE 39-bus system, a standard simplified model of the New England grid'],
	],
	hero: {
		type: 'figure',
		figure: { src: '/images/DCOPF_Congestion.png', alt: 'Map of the IEEE 39-bus system with each line colored by how heavily it is loaded', caption: 'Line loading on the original system. Red lines are at or near their limit.' },
	},
	sections: [
		{
			title: 'Formulation',
			blocks: [
				{ type: 'button', label: 'Read the full report (PDF)', href: '/files/EC417_Final_Report.pdf' },
				{ type: 'p', text: 'Choose the output of each of the ten generators so that total cost is lowest while every line stays inside its limit.' },
				{
					type: 'equation',
					lines: [
						'Minimize   Σ Cᵢ Pᵢ',
						'subject to   P_min ≤ Pᵢ ≤ P_max',
						'Σ Pᵢ = total load − added local generation',
						'−f_max ≤ S (P_injected − P_load) ≤ f_max',
					],
				},
				{ type: 'p', text: 'C is generator cost, P is output, and S is the matrix of power transfer distribution factors, which gives every line flow directly from the power injected at each bus.' },
			],
		},
		{
			title: 'Results',
			blocks: [
				{
					type: 'table',
					caption: 'Lines loaded above 80% of capacity.',
					head: ['Case', 'Before', 'After'],
					numeric: [1, 2],
					rows: [
						['Generation added at the six largest loads (500 MW or more)', '3', '1'],
						['Same approach with line limits lowered to 85%, seven sources added', '7', '3'],
					],
				},
				{
					type: 'list',
					items: [
						'Adding generation next to the congested line only moved the congestion elsewhere.',
						'Limits: the added generation was modeled as free to run and constant, and a DC model ignores voltage and reactive power.',
					],
				},
			],
		},
	],
};

const whackAMole: Project = {
	slug: 'whack-a-mole',
	blurb: 'Reaction game in Verilog on an FPGA: eight LEDs, eight switches.',
	pinned: true,
	title: 'Whack-a-Mole',
	category: 'Software',
	period: 'Spring 2025',
	status: 'Complete',
	role: 'Game logic and score display',
	summary: 'A reaction game written in Verilog on an FPGA board. Eight LEDs are the moles, eight switches hit them, and a faster reaction scores more.',
	lead: 'A reaction game written in Verilog on an FPGA board. Eight LEDs are the moles, eight switches hit them, and a faster reaction scores more.',
	image: '/images/WhackAMole_Board.jpg',
	tags: ['Verilog', 'FPGA', 'Xilinx Vivado'],
	facts: [
		['My role', 'Game logic and the multiplexed score display'],
		['Team', '2'],
		['Skills used', 'Verilog, clock division, seven-segment multiplexing, Xilinx Vivado'],
		['Rules', 'A new mole every 2 seconds, up to 10 points per mole, one switch at a time'],
	],
	hero: { type: 'video', src: '/videos/WhackAMole.mp4', label: 'Video of the Whack-a-Mole game running on the FPGA board', caption: 'The game running on the board.' },
	sections: [
		{
			title: 'What I wrote',
			blocks: [
				{
					type: 'list',
					items: [
						'**Game logic.** Tracks whether a game is active, spawns a mole on a slow clock from a 3-bit random number, and updates the score on a faster clock.',
						'**Hit detection.** Checking switches continuously let a player hold one down and collect points on every clock tick. The fix responds to the moment a switch flips and rejects input when more than one switch is flipped.',
						'**Score display.** Converts the score to decimal digits, decodes each to its segment pattern, and cycles through the digits fast enough that all appear lit.',
					],
				},
				{
					type: 'table',
					caption: 'Modules. Highlighted rows are mine.',
					head: ['Module', 'Purpose'],
					mine: [0, 1],
					rows: [
						['`game.v`', 'Game state, mole spawning, hit detection and scoring'],
						['`score_display.v`', 'Multiplexed seven-segment score output'],
						['`random_num_gen.v`', 'Linear feedback shift register that picks the next mole'],
						['`clk_divider.v`', 'Slower clocks derived from the board clock'],
						['`top.v`', "Connects the modules to the board's pins"],
					],
				},
			],
		},
	],
};

const tetris: Project = {
	slug: 'tetris',
	blurb: 'Team Tetris variant in Java with score calculation in C++.',
	pinned: true,
	title: 'Tetris for Android',
	category: 'Software',
	period: 'Fall 2024',
	status: 'Complete',
	role: 'Speed control, rules and settings screens',
	summary: 'A Tetris variant built as a team in Android Studio, written in Java with score calculation in C++.',
	lead: 'A Tetris variant built as a team in Android Studio, written in Java with score calculation in C++.',
	image: '/images/Tetris_Emulator.jpg',
	tags: ['Java', 'C++', 'Android Studio'],
	facts: [
		['My role', 'Adjustable speed, rules screen and settings screen'],
		['Team', 'Team project'],
		['Skills used', 'Java, Android Studio, Android activities, C++ through the Java Native Interface'],
		['Features', 'Collision detection, row clearing, saved high score, sound'],
	],
	hero: { type: 'video', src: '/videos/Tetris.mp4', label: 'Video of Tetris gameplay on Android', caption: 'Gameplay.' },
	sections: [
		{
			title: 'What I wrote',
			blocks: [
				{
					type: 'list',
					items: [
						'**Adjustable speed.** The player picks a speed from 1 to 9, which sets how fast pieces fall. Harder settings score more for the same cleared rows.',
						'**Rules screen.** A separate Android activity listing the controls and scoring. Opening it pauses the game.',
						'**Settings screen.** Volume control and a mute switch for music and sound effects.',
					],
				},
			],
		},
	],
};

const meetingTimer: Project = {
	slug: 'meeting-timer',
	blurb: 'Stepper-driven desk timer. System design, KiCad schematic and wiring.',
	title: 'Meeting Timer',
	category: 'Hardware',
	period: 'Fall 2026',
	status: 'Complete',
	role: 'System design, KiCad schematic, wiring',
	pinned: true,
	summary:
		'A self-contained desk timer: a stepper motor sweeps a clock hand through the time and a tricolor LED shows the state. I did the system design, KiCad schematic and wiring.',
	lead: 'A desk timer for meetings. Pick a preset and start it; a stepper motor turns the clock hand once over the timer while an LED shows what it is doing.',
	image: '/images/MeetingTimer.jpg',
	tags: ['KiCad', 'XIAO ESP32-S3', 'MicroPython', 'Stepper motor', 'State machine'],
	facts: [
		['My role', 'System design, KiCad schematic and wiring. Final assembly and testing were a team effort.'],
		['Team', '6 (2 electrical, 2 computer, 2 mechanical engineers); senior design warm-up project'],
		['Parts', 'Seeed XIAO ESP32-S3, L293D driver, 28BYJ-48 stepper, two buttons, tricolor LED'],
		['Tools', 'KiCad, VS Code with MicroPico'],
	],
	hero: {
		type: 'figure',
		figure: { src: '/images/MeetingTimer.jpg', alt: 'The finished meeting timer: a green 3D-printed box with a blue status LED and a clock hand on the side', caption: 'The finished timer.' },
	},
	sections: [
		{
			id: 'design',
			title: 'System design',
			blocks: [
				{
					type: 'cols',
					left: [
						{
							type: 'list',
							items: [
								'**Button 1** changes the preset.',
								'**Button 2:** a short press starts, pauses and resumes; a long press resets.',
								'**LED:** blinking blue when idle, blinking green while running, steady blue when paused, blinking red when time is up.',
							],
						},
					],
					right: [
						{ type: 'figure', figure: { src: '/images/MeetingTimer_StateDiagram.png', alt: 'Hand-drawn state diagram with idle, running, paused and expired states and the button presses that move between them', caption: 'My state diagram: four states, three inputs.' } },
					],
				},
			],
		},
		{
			id: 'circuit',
			title: 'Circuit in KiCad',
			blocks: [
				{
					type: 'cols',
					left: [
						{ type: 'figure', figure: { src: '/images/MeetingTimer_Schematic.png', alt: 'KiCad schematic: XIAO ESP32-S3 driving an L293D and a 5-wire stepper motor, two push buttons, and a tricolor LED with three 220 ohm resistors', caption: 'Schematic I drew in KiCad.' } },
					],
					right: [
						{
							type: 'list',
							items: [
								'The ESP32-S3 drives the stepper through an L293D driver.',
								'Two buttons on D4 and D5; the tricolor LED on D8 to D10 through 220 Ω resistors.',
								'I imported the Seeed XIAO symbol into KiCad and documented the motor coil order, which did not match the KiCad symbol pin numbers.',
							],
						},
						{ type: 'figure', figure: { src: '/images/MeetingTimer_Circuitry.jpg', alt: 'Inside the timer: breadboard, microcontroller, driver and stepper motor wired inside the enclosure', caption: 'Wiring inside the enclosure.' } },
					],
				},
			],
		},
		{
			id: 'testing',
			title: 'Assembly and testing',
			blocks: [
				{
					type: 'cols',
					left: [
						{
							type: 'table',
							head: ['Problem', 'Cause', 'Fix'],
							rows: [
								['Motor stopped mid-timer', 'Three AAA cells fell from 4.8 V to about 4.2 V after 10 minutes.', 'Powered it over USB instead.'],
								['Clock hand slipped', 'The motor warmed up and melted the hot glue holding the hand.', 'Mounted the hand with heat shrink braced by popsicle sticks.'],
							],
						},
					],
					right: [
						{ type: 'video', src: '/videos/MeetingTimer_Demo.mp4', label: 'Video demo of the meeting timer', caption: 'Demo.' },
					],
				},
			],
		},
	],
};

const temperatureMonitor: Project = {
	slug: 'temperature-monitor',
	blurb: 'Arduino box that shows room temperature and beeps outside 75 to 80 °F.',
	title: 'Room Temperature Monitor',
	category: 'Hardware',
	period: 'Spring 2024',
	status: 'Complete',
	role: 'Solo project: CAD, 3D printing, wiring and code',
	summary:
		'An Arduino box that shows room temperature on an LCD and flashes and beeps outside 75 to 80 °F. A solo project where I learned CAD and 3D printing.',
	lead: 'An Arduino box that shows room temperature on an LCD and flashes and beeps when it leaves 75 to 80 °F.',
	image: '/images/TemperatureMonitor.jpg',
	tags: ['Onshape', 'Tinkercad', '3D printing', 'Arduino', 'Soldering'],
	facts: [
		['Course', 'EK131 Hands-On Engineering'],
		['Team', 'Solo'],
		['Parts', 'Arduino Uno, TMP36 sensor, 16×2 I2C LCD, red and green LEDs, piezo buzzer, rocker switch, 9 V battery'],
	],
	hero: {
		type: 'figure',
		figure: { src: '/images/TemperatureMonitor.jpg', alt: 'The finished temperature monitor: black enclosure with wiring and Arduino inside, and the lid showing the temperature on an LCD', caption: 'Final assembly.' },
	},
	sections: [
		{
			id: 'cad',
			title: 'CAD and 3D printing',
			blocks: [
				{
					type: 'list',
					items: [
						'Measured every part and sketched it with dimensions.',
						'Modeled the box in Onshape and cut holes for the LCD, switch, LEDs, buzzer and USB port.',
						'3D printed a holder for the 9 V battery.',
						'Mocked up the circuit in Tinkercad before building it.',
					],
				},
				{
					type: 'figures',
					figures: [
						{ src: '/images/TemperatureMonitor_CAD.jpg', alt: 'Onshape model of the enclosure with cutouts, the battery in its holder, and the lid with the LCD', caption: 'Onshape model.' },
						{ src: '/images/TemperatureMonitor_Circuit.png', alt: 'Tinkercad circuit: Arduino Uno, 9 V battery, switch, TMP36, LEDs, buzzer and LCD', caption: 'Tinkercad circuit.' },
						{ src: '/images/TemperatureMonitor_Sketch.jpg', alt: 'Hand sketch of the enclosure with measured dimensions', caption: 'Measured sketch of the enclosure.' },
					],
				},
			],
		},
		{
			id: 'build',
			title: 'Wiring and code',
			blocks: [
				{
					type: 'list',
					items: [
						'The Arduino reads the TMP36, converts to °F and updates the LCD every 100 ms.',
						'Outside 75 to 80 °F, the red LED flashes and the buzzer beeps.',
						'Soldered the LEDs, buzzer and sensor; wire nuts join the shared 5 V and ground.',
						'Sized the LED resistors with KVL: 1 kΩ for green, 220 Ω for red.',
					],
				},
				{ type: 'p', text: 'It met every goal: it switches on and off, reads the room accurately, and alarms out of range. A next version would be smaller and rechargeable.' },
				{ type: 'button', label: 'Read the report (PDF)', href: '/files/EK131_Temperature_Monitor_Report.pdf' },
			],
		},
	],
};

const truss: Project = {
	slug: 'truss',
	blurb: 'MATLAB truss solver that raised an acrylic truss\'s predicted failure load to 47.1 oz.',
	title: 'Truss Design in MATLAB',
	category: 'Software',
	period: 'Fall 2024',
	status: 'Complete',
	role: 'Wrote the MATLAB simulation used to compare our designs',
	summary:
		'A MATLAB truss solver used to design an acrylic truss for a 32 oz load. Rebalancing member lengths raised the predicted failure load from 38.6 to 47.1 oz.',
	lead: 'A MATLAB program that solves every member force in a truss and predicts where it fails, used to design an acrylic truss for a 32 oz load.',
	image: '/images/Truss_Design.png',
	tags: ['MATLAB', 'Statics', 'Linear algebra'],
	facts: [
		['Course', 'EK301 Engineering Mechanics 1'],
		['Team', '3; I wrote the MATLAB simulation used to compare our designs'],
		['Result', 'Predicted max load 47.1 ± 1.7 oz at a cost of $219'],
	],
	hero: {
		type: 'figure',
		figure: { src: '/images/Truss_Design.png', alt: 'Sketch of the final Warren truss with joint coordinates in inches and numbered members', caption: 'Final Warren truss, joint coordinates in inches.' },
	},
	sections: [
		{
			id: 'solver',
			title: 'The solver',
			blocks: [
				{
					type: 'list',
					items: [
						'Builds the equilibrium equations from the joint coordinates and a connection matrix, then solves for every member force and support reaction.',
						'Predicts each compression member’s buckling strength from a fitted curve, `F = 4863 · L^-2.208` oz with L in inches.',
						'The member that fails at the lowest load sets the truss’s max load. Cost is $10 per joint plus $1 per inch of member.',
					],
				},
				{ type: 'code', text: 'A = [A1 Sx; A2 Sy];                   % x and y equilibrium at every joint\nT = A \\ L;                            % member forces and reactions\nP_crit = 4863.346 * len.^(-2.208);    % buckling strength (oz)\nW_fail = -P_crit ./ T(1:m) * sum(L);  % load at which each member buckles\nmax_load = min(W_fail(W_fail > 0));' },
			],
		},
		{
			id: 'iteration',
			title: 'Design iteration',
			blocks: [
				{ type: 'p', text: 'We dropped the Pratt truss because our acrylic could not make its long members. In the first Warren design, member 8 carried 31.5 oz of compression against a 38.0 oz buckling strength. Shortening it from 9 to 7 inches raised its strength to 66.2 oz and moved the weak point to a member that carries less force.' },
				{
					type: 'cols',
					left: [
						{
							type: 'table',
							head: ['', 'First Warren', 'Final'],
							rowHeaders: true,
							rows: [
								['Critical member', '8', '5'],
								['Max load', '38.6 oz', '47.1 ± 1.7 oz'],
								['Load per dollar', '0.176 oz/$', '0.215 oz/$'],
							],
						},
						{ type: 'button', label: 'Read the report (PDF)', href: '/files/EK301_Truss_Report.pdf' },
					],
					right: [
						{ type: 'figure', figure: { src: '/images/Truss_Output.png', alt: 'MATLAB command window output listing every member force, buckling strengths, the first member to buckle, cost and theoretical max load', caption: 'Solver output for the final design.' } },
					],
				},
			],
		},
	],
};

const mbta: Project = {
	slug: 'mbta-ridership',
	blurb: 'MATLAB analysis and regression model of 900,000 rows of MBTA bus ridership.',
	title: 'Predicting MBTA Bus Ridership',
	category: 'Software',
	period: 'Fall 2023',
	status: 'Complete',
	role: 'Team of 3, work split evenly',
	summary:
		'MATLAB analysis of MBTA bus ridership from a 900,000-row dataset: the busiest times and stops, and a regression model that predicts boardings.',
	lead: 'A MATLAB analysis of MBTA bus-stop ridership, from data cleaning to a machine learning model that predicts boardings.',
	image: '/images/MBTA_TopStops.png',
	tags: ['MATLAB', 'Regression Learner', 'Data analysis'],
	facts: [
		['Team', '3, work split evenly'],
		['Data', 'MBTA bus ridership by stop, time of day and day type, fall 2016 to 2022'],
		['Model', 'Regression on stop, time period and day type; RMSE 1.65 boardings'],
	],
	hero: {
		type: 'figure',
		figure: { src: '/images/MBTA_TopStops.png', alt: 'Bar chart of the five stops with the most weekday midday boardings, led by Harvard Upper Busway', caption: 'Busiest stops for weekday midday boardings.' },
	},
	sections: [
		{
			id: 'cleaning',
			title: 'Cleaning the data',
			blocks: [
				{
					type: 'list',
					items: [
						'Shuffled the 900,000 rows and kept 10,000 so the analysis ran quickly.',
						'Dropped columns with missing or irrelevant data.',
						'Converted text columns to strings and the “Fall 2019” season labels to a numeric year.',
					],
				},
			],
		},
		{
			id: 'findings',
			title: 'Findings',
			blocks: [
				{
					type: 'list',
					items: [
						'Midday school hours and the PM peak have the most boardings; night has the fewest.',
						'Harvard Upper Busway has by far the most weekday midday boardings, and Wonderland Busway the most people getting off.',
					],
				},
				{ type: 'figure', figure: { src: '/images/MBTA_TimePeriods.png', alt: 'Bar chart of average boardings for each time period of the day', caption: 'Average boardings by time of day.' } },
			],
		},
		{
			id: 'model',
			title: 'Prediction model',
			blocks: [
				{
					type: 'cols',
					left: [
						{ type: 'p', text: 'We trained a model in MATLAB’s Regression Learner on 5,000 rows to predict average boardings from the stop, time period and day type, then tested it on the other 5,000.' },
						{ type: 'p', text: 'RMSE was 1.65 boardings. The model tracked typical stops but never predicted above about 10, so it missed the busiest outliers, possibly from sports or weather events.' },
						{ type: 'button', label: 'Read the report (PDF)', href: '/files/MBTA_Ridership_Report.pdf' },
					],
					right: [
						{ type: 'figure', figure: { src: '/images/MBTA_Prediction.png', alt: 'Scatter plot of actual and predicted average boardings for the 5,000 test rows', caption: 'Actual (blue) and predicted (red) boardings on the test rows.' } },
					],
				},
			],
		},
	],
};

// Main six first (in project map order), then other projects.
export const projects: Project[] = [
	busbot,
	meetingTimer,
	laundryFolder,
	bedsideBeacon,
	whackAMole,
	tetris,
	temperatureMonitor,
	dcOpf,
	truss,
	mbta,
];

// Reference designator, like a part on a schematic: U1 is the first project.
export const refdes = (slug: string) => `U${projects.findIndex((p) => p.slug === slug) + 1}`;

// Short term code for compact labels: 'Fall 2026' -> 'FA26'.
export const termCode = (p: Project) => {
	if (p.slug === 'busbot') return '2026–27';
	const m = p.period.match(/(Fall|Spring|Summer)\s+(\d{4})/);
	if (!m) return p.period;
	return { Fall: 'FA', Spring: 'SP', Summer: 'SU' }[m[1] as 'Fall' | 'Spring' | 'Summer'] + m[2].slice(2);
};

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
