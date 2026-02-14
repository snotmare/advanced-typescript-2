
//#region interface + interface
interface Wizard {
	name: string;
}

interface Wizard {
	year: number;
}

export function testInterfaces() {
	let harry: Wizard = {
		name: 'Harry Potter',
		year: 1
	};

	console.log(harry);
}
//#endregion


//#region interface + class
interface House {
	name: string;
}

class House {
	private password: string | undefined;

	setPassword(password: string) {
		this.password = password;
	}

	isPassword(password: string): boolean {
		return password === this.password;
	}
}

export function testInterfaceClass() {
	// let gryffindor: House = {
	// 	name: 'Gryffindor'
	// };
	
	let gryffindor = new House();
	gryffindor.name = 'Gryffindor';
	gryffindor.setPassword('Balderdash');
}
//#endregion


//#region class + namespace

class Student {
	constructor(public name: string) {}
}

namespace Student {
	export function find(name: string, students: Student[]): Student | undefined {
		return students.find(student => student.name === 'name');
	}
}

export function testClassNamespace() {
	let allStudents = [new Student('Harry'), new Student('Ron'), new Student('Hermione')];
	let foundStudent = Student.find('Ron', allStudents);
	console.log(foundStudent);
}

//#endregion


//#region prototype
declare global {
	interface String {
		equalsIgnoreCase(anotherString: string): boolean;
	}
}

export function testPrototype() {
	String.prototype.equalsIgnoreCase = function(this: string, anotherString: string): boolean {
		return this.toLocaleLowerCase() === anotherString.toLocaleLowerCase();
	};
	
	let bookTitle = 'Harry Potter';
	console.log(bookTitle.equalsIgnoreCase('harry potter')); //Returns true
}
//#endregion