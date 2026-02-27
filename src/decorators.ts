import 'reflect-metadata';
import type { Constructor } from './utils/constructor.js';

//#region Function Decorators
function taboo(word: string) {
	//Executed at compile time when the decorator is used
	return (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
		//Executed at compile time when the decorated function is declared
		let originalFunction = descriptor.value;

		descriptor.value = (...args: unknown[]) => {
			//Executed at run time when the decorated function is called

			if(args && args.length > 0) {
				args
					.filter(arg => typeof arg === 'string' && arg.includes(word))
					.forEach(arg => {
						console.log(`*** A taboo word was said: ${arg} ***`);
					});
			}

			return originalFunction.apply(target, args);
		};
	};
}

class Harry {
	@taboo('Voldemort')
	speak(message: string) {
		console.log(message);
	}
}

export function testFunctionDecorator() {
	let harry = new Harry();
	harry.speak(`I'm not afraid to say his name.`); //Not taboo
	harry.speak(`I'm not afraid of Lord Voldemort.`); //Is taboo
}
//#endregion



//#region Parameter Decorators
function fideliusCharm(target: Object, propertyKey: string | symbol, parameterIndex: number) {
	//Warning! Metadata is experimental. You must enable in tsconfig.json
	let existingCharms: number[] = Reflect.getOwnMetadata(fideliusCharm, target, propertyKey) || [];
	existingCharms.push(parameterIndex);
	Reflect.defineMetadata(fideliusCharm, existingCharms, target, propertyKey);
}

function taboo2(word: string) {
	//Executed at compile time when the decorator is used
	return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
		//Executed at compile time when the decorated function is declared
		let originalFunction = descriptor.value;

		descriptor.value = (...args: unknown[]) => {
			//Executed at run time when the decorated function is called
			let charmedIndexes: number[] = Reflect.getOwnMetadata(fideliusCharm, target, propertyKey) || [];

			if(args && args.length > 0) {
				args
					.filter((arg, index) => charmedIndexes.every(existingCharm => existingCharm !== index))
					.filter(arg => typeof arg === 'string' && arg.includes(word))
					.forEach(arg => {
						console.log(`*** A taboo word was said: ${arg} ***`);
					});
			}

			return originalFunction.apply(target, args);
		};
	};
}

class Harry2 {
	@taboo2('Voldemort')
	speak(@fideliusCharm message: string) {
		console.log(message);
	}
}

export function testParameterDecorator() {
	let harry = new Harry2();
	harry.speak(`I'm not afraid to say his name.`); //Not taboo
	harry.speak(`I'm not afraid of Lord Voldemort.`); //Is taboo
}
//#endregion



//#region Class Decorators

function classDecorator<T extends Constructor<ParentClass>>(constructor: T) {
	return class extends constructor {
		constructor(...args: any[]) {
			super(...args);
			console.log('decorator class: constructor');
		}

		testFunction() {
			console.log('decorator class: test function');
		}

		foo() {
			super.foo();
			console.log('decorator class: foo');
		}
	};
}


// @classDecorator
class ParentClass {
	test = '';

	constructor() {
		console.log('parent class: constructor');
	}

	foo() {
		console.log('parent class: foo');
	}
}

@classDecorator
class ChildClass extends ParentClass {
	constructor() {
		super();
		console.log('child class: constructor');
	}

	foo() {
		super.foo();
		console.log('child class: foo');
	}
}

export function testConstructorDecorator() {
	let foo = new ChildClass();
	// foo.testFunction(); // Works at runtime, but compiler doesn't know about it
	foo.foo();
}
//#endregion




//#region Sql Generator
class SqlGenerator {
	static readonly FIELD_SYMBOL = Symbol('sqlField');

	toSelect(object: Object): string {
		let entityName = Reflect.getMetadata('test', object.constructor);

		let selectFields = Object.keys(object)
			.map(key => {
				return Reflect.getMetadata(SqlGenerator.FIELD_SYMBOL, object, key);
			});

		let whereStatements = Object.keys(object)
			.map(key => <keyof object>key)
			.filter(key => object[<keyof object>key])
			.map(key => {
				let attributeName = Reflect.getMetadata(SqlGenerator.FIELD_SYMBOL, object, key);
				return `${attributeName} = ?`;
			});
		
		return `select ${selectFields.join(', ')} ` +
			`\nfrom ${entityName} ` +
			`\nwhere ${whereStatements.join(' and ')}`;
	}
}

function entity(name: string) {
	return (target: Constructor<unknown>) => {
		Reflect.defineMetadata('test', name, target);
	};
}

function attribute(name: string) {
	return Reflect.metadata(SqlGenerator.FIELD_SYMBOL, name);
}

@entity('playerTable')
class Player {
	@attribute('recordId')
	id?: number;

	@attribute('teamName')
	team?: string;

	@attribute('playerName')
	name?: string;
}


export function testSqlGenerator() {
	let player = new Player();
	player.id = 1;
	player.team = 'Gryffindor';
	player.name = 'Harry Potter';

	let sql = new SqlGenerator().toSelect(player);
	console.log(sql);
}

//#endregion