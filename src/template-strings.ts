//#region Basic

export function testBasic() {
	let name = 'Harry Potter';
	console.log(`Hello, my name is ${name}`);
}

//#endregion



//#region Tagged

interface Student {
	name: string;
	age: Date;
}

function greetingTemplate(strings: TemplateStringsArray, ...keys: (keyof Student)[]): (user: Student) => string {
	return (user: Student) => {
		let result = [strings[0]];

		keys.forEach((key, i) => {
			let value = user[key];
			result.push(`${value}`, strings[i + 1]);
		});

		let today = new Date();

		//Dynamically change the template output
		if(user.age.getMonth() === today.getMonth() && user.age.getDate() === today.getDate()) {
			result.push(` Happy birtday, have a cake.`);
		}

		return result.join('');
	};
}

export function testTagged() {
	//Reuse the same template tag
	let myTemplate = greetingTemplate`Hello ${'name'}! ${'name'} is a very nice name.`;
	
	let harry: Student = {
		name: 'Harry Potter',
		age: new Date()
	};

	let ron: Student = {
		name: 'Ron Weasley',
		age: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2) // 2 days ago
	};

	console.log(myTemplate(harry));
	console.log(myTemplate(ron));
}

//#endregion



//#region Built-in Types

type Spell = 'Expelliarmus' | 'Accio' | 'Stupefy' | 'Protego';

// Other built-in types include Lowercase, Capitalize, and Uncapitalize
function cast(spell: Uppercase<Spell>) {
	console.log(`${spell}!`);
}

export function testBuiltInTypes() {
	cast('ACCIO');
}

//#endregion



//#region Literal Types

type Contestant = 'Harry' | 'Cedric' | 'Viktor' | 'Fleur';
type Contest = 'Dragon' | 'Lake' | 'Maze';
type Key = `${Contest}-${Contestant}`;

function recordResult(key: Key, rank: number) {
	console.log(`${key} recorded with a rank of ${rank}`);
}

export function testLiteralTypes() {
	recordResult('Dragon-Cedric', 1);
	recordResult('Dragon-Fleur', 2);
	recordResult('Dragon-Viktor', 3);
	recordResult('Dragon-Harry', 4);

	recordResult('Lake-Cedric', 1);
	//....
}

//#endregion



//#region Template Parameters

type Direction = 'top' | 'right' | 'bottom' | 'left';
type Spacing = 'padding' | 'margin';
type SpacingDirection = `${Spacing}-${Direction}`;

type Unit = 'px' | 'em' | 'rem' | '%';
type UnitValue = number | `${number}${Unit}` | 'auto' | 'inherit'; //etc

function getSpacing(spacing: Spacing, value1: UnitValue, value2?: UnitValue, value3?: UnitValue, value4?: UnitValue): string;
function getSpacing(spacing: SpacingDirection, value: UnitValue): string;
function getSpacing(spacing: string, value1: UnitValue, value2?: UnitValue, value3?: UnitValue, value4?: UnitValue): string {
	let args = [value1, value2, value3, value4].filter(value => value);
	return `${spacing}: ${args.join(' ')};`;
}

export function testTemplateParameters() {
	console.log(getSpacing('margin-bottom', '3rem'));
	console.log(getSpacing('padding', '4px', '2px', 4, 'auto'));
	console.log(getSpacing('padding', '50%'));

	// console.log(getSpacing('padding-top', '4px', '2px', 4, 'auto')); //Won't work
}

//#endregion