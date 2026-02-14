import 'reflect-metadata';

//#region Function Decorators
function taboo(word: string) {
	//Executed at compile time when the decorator is used
	return (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
		//Executed at compile time when the decorated function is declared

		//For experimenting with
		// console.log(target);
		// console.log(propertyKey);
		// console.log(descriptor);

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

			return originalFunction.apply(null, args);
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
	let existingCharms: number[] = Reflect.getOwnMetadata(fideliusCharm, target, propertyKey) || [];
	existingCharms.push(parameterIndex);
	Reflect.defineMetadata(fideliusCharm, existingCharms, target, propertyKey);
	
	//For experimenting with
	// console.log(target);
	// console.log(propertyKey);
	// console.log(parameterIndex);
}

function taboo2(word: string) {
	//Executed at compile time when the decorator is used
	return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
		//Executed at compile time when the decorated function is declared

		//For experimenting with
		// console.log(target);
		// console.log(propertyKey);
		// console.log(descriptor);

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

			return originalFunction.apply(null, args);
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

type Constructor = {new(...args: any[]): {}};

function classDecorator<T extends Constructor>(constructor: T) {
	console.log(constructor);

	// constructor.prototype.constructor = (...args: any[]) => {
	// 	let instance = new (<Constructor<unknown>>constructor)(...args);
	// 	console.log('instance created');

	// 	return instance;
	// };

	// new constructor();

	return class extends constructor {
		constructor(...args: any[]) {
			super(...args);
			console.log('test');''
		}

		testFunction() {
			console.log('it worked');
		}
	};
}

@classDecorator
class Foo {
	test: string = '';

	constructor() {
		console.log('new foo');
	}

	foo() {}
}

class Foo2 extends Foo {
	constructor() {
		super();
		console.log('extends');
	}
}

export function testConstructorDecorator() {
	let foo = new Foo2();
	foo.testFunction();
}
//#endregion