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
	| { type: 'stopDemo' }
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
	lead: string; // opening line on the project page
	image?: string; // card image (falls back to a title card)
	tags: string[];
	featured?: boolean;
	facts: [string, string][];
	hero?: Block; // figure or video next to the facts table
	sections: Section[];
};

const busbot: Project = {
	slug: 'busbot',
	title: 'BusBot',
	category: 'Hardware',
	period: 'Summer 2026 to Spring 2027, in progress',
	status: 'In progress',
	role: 'Sensor integration lead',
	featured: true,
	summary:
		'An autonomous robot that drives to a restaurant table on request, carries standard dishwasher racks, and returns them to staff. I am the sensor integration lead on a six-person team.',
	lead: 'A robot that drives to a restaurant table when a diner requests it, collects dishes in standard dishwasher racks, and brings them back to staff.',
	image: '/images/BusBot_SystemIntegration_Nov.jpg',
	tags: ['ESP32-S3', 'C', 'ESP-IDF', 'I2C', 'Power budgeting'],
	facts: [
		['My role', 'Sensor integration lead: ultrasonic sensors, battery monitor, wheel encoders. Team lead for the first two months.'],
		['Team', '6 (2 electrical, 2 computer, 2 mechanical engineers)'],
		['Skills used', 'C, ESP-IDF, ESP32-S3, I2C, PWM motor control, test planning, power budgeting'],
		['Status', 'Bench-tested subsystems; full integration under way'],
	],
	hero: {
		type: 'figure',
		figure: {
			src: '/images/BusBot_SystemIntegration_Nov.jpg',
			alt: 'BusBot system integration in November 2026: chassis base with motors, battery and control electronics',
			caption: 'System integration, November 2026.',
		},
	},
	sections: [
		{
			id: 'system',
			title: 'System overview',
			blocks: [
				{ type: 'p', text: 'Competing robots cost $10,000 to $16,000 and bring back one unsorted tub. BusBot carries the racks that go straight into a commercial dishwasher, so sorting happens at the table. Our parts budget is $1,000.' },
				{ type: 'p', text: 'We surveyed 25 diners at the BU student union before setting requirements. Sixteen rated the idea 4 or 5 out of 5 for convenience, and the median diner would wait about 5 minutes before carrying dishes back themselves. That wait time set our speed and coverage targets.' },
				{
					type: 'table',
					caption: 'Subsystems and owners.',
					head: ['Subsystem', 'What it does', 'Owner'],
					mine: [0],
					rows: [
						['Sensor integration', 'Ultrasonic obstacle sensing, battery voltage and current monitor, and wheel encoders on the ESP32-S3', 'Me'],
						['Power', 'Battery, protection, 12 V and 5 V rails', 'Teammate'],
						['Navigation', 'LiDAR mapping on the Jetson Orin Nano', 'Teammate'],
						['Request interface', 'QR code request server and table queue', 'Teammate'],
						['Actuation', 'Drive motors, wheels and chassis', 'Teammate'],
						['Storage', 'Dish racks and load sensing', 'Teammate'],
					],
				},
				{ type: 'h3', text: 'Why two computers' },
				{ type: 'p', text: 'Anything that keeps the motors safe runs on the ESP32-S3: motor PWM, ultrasonic sensors, wheel encoders. Mapping, the camera and the request server run on the Jetson. The two talk over a simple text protocol on UART. The split means a slow or crashed navigation process can never delay a stop command.' },
			],
		},
		{
			id: 'sensors',
			title: 'Sensor integration',
			blocks: [
				{ type: 'p', text: 'Every sensor that reports to the ESP32-S3 is mine to wire, read and test. So far that is the ultrasonic sensors, the battery monitor and the wheel encoders.' },
				{ type: 'h3', text: 'Ultrasonic obstacle detection' },
				{ type: 'p', text: 'The LiDAR we received sees 276°, which leaves a blind spot behind the robot. Ultrasonic sensors cover it, and they also act as a last line of defense that does not depend on the navigation computer.' },
				{ type: 'p', text: 'The requirement is to stop with 20 cm of clearance left. I worked backward from that to the distance at which the sensor has to trigger.' },
				{
					type: 'budget',
					caption: 'Stop-distance budget. The four add up to 39.5 cm, so the firmware brakes at 40 cm.',
					segments: [
						{ value: '20 cm', label: 'Required clearance' },
						{ value: '5 cm', label: 'Reaction: 0.1 s at 0.5 m/s' },
						{ value: '12.5 cm', label: 'Braking at 1 m/s²' },
						{ value: '2 cm', label: 'Sensor error' },
					],
				},
				{ type: 'stopDemo' },
				{ type: 'h3', text: 'Firmware' },
				{
					type: 'list',
					items: [
						'Written in C with ESP-IDF for the ESP32-S3.',
						'Pings the sensor every 100 ms and brakes the motor when a reading falls to 40 cm or less.',
						'Holds the stop until the obstacle is past 45 cm. The 5 cm gap keeps the motor from chattering on and off at the threshold.',
						'Stops the motor if the sensor stops returning valid readings.',
						"Reads the motor's quadrature encoder for speed feedback.",
					],
				},
				{ type: 'h3', text: 'Bench results' },
				{
					type: 'cols',
					left: [
						{
							type: 'table',
							caption: 'Obstacle detection tests, November 10, 2026, drive motor on a 12 V supply.',
							head: ['Parameter', 'Limit', 'Measured', 'Result'],
							rows: [
								['Distance reading at 20 cm', '±2 cm', '20.2 cm', 'Pass'],
								['Distance reading at 40 cm', '±2 cm', '38.6 cm', 'Pass'],
								['Distance reading at 80 cm', '±2 cm', '50.6 cm', 'Fail'],
								['Detection to brake command', '0.10 s max', 'Within limit', 'Pass'],
								['Holds stop at 42 cm, restarts when clear', '5 of 5 trials', '5 of 5', 'Pass'],
							],
						},
					],
					right: [
						{
							type: 'figure',
							figure: {
								src: '/images/BusBot_UltrasonicTest_Fixture.jpg',
								alt: 'Bench fixture for the ultrasonic obstacle test: sensor, ESP32-S3, motor driver and gearmotor on a 12 V supply',
								caption: 'Test fixture: ultrasonic sensor, ESP32-S3, motor driver and gearmotor on a bench supply.',
							},
						},
					],
				},
				{ type: 'p', text: 'The sensor is accurate where the stop decision is made, but it under-reads badly at 80 cm. That does not affect the 40 cm stop, but it does matter for slowing down early.' },
				{ type: 'h3', text: 'Battery voltage and current monitor' },
				{
					type: 'cols',
					left: [
						{ type: 'p', text: 'The monitor sits in the power front end, after the 20 A fuse and the emergency stop that doubles as the main switch.' },
						{
							type: 'list',
							items: [
								'An INA226 measures battery voltage and current across a 2 mΩ shunt and reports to the ESP32-S3 over I2C.',
								'Voltage tells the robot when to return to its dock before the battery runs low.',
								'Current shows how much the motors draw under load, which checks the power budget against reality.',
								"I verified its readings against a multimeter and the bench supply's display with the motor running, and all three agreed.",
							],
						},
					],
					right: [
						{
							type: 'figure',
							figure: {
								src: '/images/BusBot_FrontEnd_CircuitDiagram.png',
								alt: 'Circuit diagram of the BusBot power front end: battery, fuse, emergency stop, and INA226 battery monitor reporting to the ESP32-S3',
								caption: 'Power front end with battery monitoring.',
							},
						},
					],
				},
			],
		},
		{
			id: 'power',
			title: 'Power budget and battery selection',
			blocks: [
				{ type: 'p', text: "The power subsystem belongs to the team's other electrical engineer. My contribution was the power budget and the battery choice that came from it." },
				{
					type: 'cols',
					left: [
						{
							type: 'table',
							caption: 'Battery comparison at 12 V, 18 Ah.',
							head: ['', 'Lithium iron phosphate', 'Sealed lead acid (chosen)'],
							rowHeaders: true,
							rows: [
								['Weight', 'About 5 lb', 'About 12 lb, which keeps the center of gravity low under a load of dishes'],
								['Cost', '$75 to $200', '$20 to $60'],
								['Lab safety', 'Needs approval', 'Sealed, no approval needed'],
								['Charge monitoring', 'Flat voltage curve, needs a calibrated current counter', 'Voltage falls predictably as it discharges'],
							],
						},
					],
					right: [
						{
							type: 'table',
							caption: 'Expected average draw: 36 kg robot at 0.5 m/s, driving 75% of the time.',
							head: ['Branch', 'Loads', 'Power'],
							numeric: [2],
							rows: [
								['Drive', 'Two gearmotors at 72% duty, plus 20% for turns and starts', '20.9 W'],
								['Compute', 'Jetson Orin Nano in 15 W mode, LiDAR, camera, converter losses', '21.1 W'],
								['Control', 'ESP32-S3, ultrasonic sensors, load cells, encoders, IMU', '1.7 W'],
								['**Total**', '3.6 A from the battery', '**43.7 W**'],
							],
						},
					],
				},
				{ type: 'p', text: "The requirement is 2.5 hours per charge, counting only half of a lead acid battery's capacity as usable. An 18 Ah battery has 108 Wh usable, which gives 2.47 hours at 43.7 W. That is just short, and a worst case with the Jetson at full power drops to 1.7 hours. The 18 Ah battery is what we are testing with now. The budget says the final robot needs 22 Ah or more, and I will confirm that with a measured discharge test before we buy." },
			],
		},
		{
			id: 'iterations',
			title: 'What failed and what changed',
			blocks: [
				{
					type: 'table',
					caption: 'Problems found so far in my part of the robot, and what each one changed.',
					head: ['Problem', 'What I found', 'What changed'],
					rows: [
						['LiDAR blind spot', 'The LiDAR we received sees 276°, not a full circle, so the robot cannot see directly behind itself.', 'Added rear ultrasonic sensing on the ESP32-S3. It covers the blind spot and still works if the navigation computer stalls.'],
						['Power budget grew', 'My first estimate was about 35 W, with a Raspberry Pi 5 as the navigation computer. We then got a Jetson Orin Nano dev kit from the lab. The Jetson and a few smaller added components raised the budget to 43.7 W.', 'The 18 Ah battery falls just short of 2.5 hours. The final robot needs 22 Ah or more, pending a measured discharge test.'],
						['Ultrasonic range error', 'The sensor passed at 20 cm and 40 cm but read 50.6 cm for a target at 80 cm.', 'The 40 cm stop is unaffected. The cause is not confirmed. My working guess is the sensor itself, an old unit we reused, so the next step is to retest with a new one.'],
					],
				},
			],
		},
		{
			id: 'next',
			title: 'What comes next',
			blocks: [
				{
					type: 'list',
					items: [
						'Replace the reused ultrasonic sensor with a new one and retest across the full range, to confirm whether the old unit caused the 80 cm error.',
						'Rewire the integrated system so it runs from a stationary bench supply while driving on the fully assembled chassis base.',
						'Power the LiDAR on the chassis through a boost converter, since it needs 19 V and the bus is 12 V.',
						'Build the UART link between the Jetson and the ESP32-S3, so a QR request received by the Jetson starts the robot moving.',
						'Draw the circuit diagram of the integrated system and lay it out in KiCad as a circuit board.',
					],
				},
			],
		},
	],
};

const laundryFolder: Project = {
	slug: 'laundry-folder',
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
		['Design', 'Two rotating joints with 9.35 in links, one vertical joint, 12 V electromagnet'],
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
						"**Power.** One 12 V supply feeds the electromagnet directly. Buck converters step it down to 5 V for the two joint servos and the Arduino Uno, so a loaded servo cannot pull down the controller's supply.",
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
	title: 'Bedside Beacon',
	category: 'Hardware',
	period: 'Fall 2025',
	status: 'Complete',
	role: 'Motor testing, transmitter wiring, housing',
	summary: 'A backup call system for hospital patients: a typed message crosses the room on a laser beam to a display a caregiver can read, with no network needed.',
	lead: 'A backup call system for hospital patients. A typed message crosses the room on a laser beam to a display a caregiver can read, with no network needed.',
	image: '/images/BedsideBeacon_Image.jpg',
	tags: ['Circuit wiring', 'Motor testing', 'Onshape', 'Laser cutting'],
	facts: [
		['My role', 'Aiming motor tests, transmitter wiring, all housing design and build'],
		['Team', '4'],
		['Skills used', 'Circuit wiring, motor characterization, Onshape, laser cutting'],
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
								'The receiver must face the transmitter squarely, because the beam has to enter the lens head-on.',
							],
						},
						{ type: 'figure', figure: { src: '/images/BedsideBeacon_BEV.jpg', alt: "Bird's eye view of the transmitter and receiver showing the laser path and the receiver angle", caption: "Bird's eye view of the link geometry." } },
					],
				},
			],
		},
	],
};

const dcOpf: Project = {
	slug: 'dc-opf',
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
	title: 'Whack-a-Mole',
	category: 'Software',
	period: 'Spring 2025',
	status: 'Complete',
	role: 'Game logic and score display',
	summary: 'A reaction game written in Verilog on an FPGA board. Eight LEDs are the moles, eight switches hit them, and a faster reaction scores more.',
	lead: 'A reaction game written in Verilog on an FPGA board. Eight LEDs are the moles, eight switches hit them, and a faster reaction scores more.',
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
	title: 'Tetris for Android',
	category: 'Software',
	period: 'Fall 2024',
	status: 'Complete',
	role: 'Speed control, rules and settings screens',
	summary: 'A Tetris variant built as a team in Android Studio, written in Java with score calculation in C++.',
	lead: 'A Tetris variant built as a team in Android Studio, written in Java with score calculation in C++.',
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

export const projects: Project[] = [busbot, laundryFolder, bedsideBeacon, dcOpf, whackAMole, tetris];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
