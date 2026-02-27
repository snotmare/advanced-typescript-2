type House = 'Gryffindor' | 'Slytherin' | 'Ravenclaw' | 'Hufflepuff';
const points = new Map<House, number>();

//#region No Overloading

function addPoints1(house: House, amount: string | number): string | number {
	let numberAmount = typeof amount === 'string' ? parseInt(amount, 10) : amount;
	let newAmount = (points.get(house) ?? 0) + numberAmount;
	points.set(house, newAmount);
	return typeof amount === 'string' ? `${newAmount}` : newAmount;
}

export function testOverloadNone() {
	let totalNumber = addPoints1('Gryffindor', 10);
	console.log(totalNumber);

	let totalString = addPoints1('Gryffindor', '20');
	console.log(totalString);
}

//#endregion



//#region Overload Type

type Amount<V extends string | number> = V extends string ? string : number;

function addPoints2<T extends string | number>(house: House, amount: T): Amount<T> {
	let numberAmount = typeof amount === 'string' ? parseInt(amount, 10) : <number>amount;
	let newAmount = (points.get(house) ?? 0) + numberAmount;
	points.set(house, newAmount);
	return <Amount<T>>(typeof amount === 'string' ? `${newAmount}` : newAmount);
}

export function testOverloadType() {
	let totalNumber = addPoints2('Gryffindor', 10);
	console.log(totalNumber);

	let totalString = addPoints2('Gryffindor', '20');
	console.log(totalString);
}

//#endregion



//#region Overload Types

function addPoints3(house: House, amount: string): string;
function addPoints3(house: House, amount: number): number;
function addPoints3<T extends string | number>(house: House, amount?: T): T {
	let numberAmount = typeof amount === 'string' ? parseInt(amount, 10) : <number>amount;
	let newAmount = (points.get(house) ?? 0) + numberAmount;
	points.set(house, newAmount);
	return <T>(typeof amount === 'string' ? `${newAmount}` : newAmount);
}

export function testOverloadFunction() {
	let totalNumber = addPoints3('Gryffindor', 10);
	console.log(totalNumber);

	let totalString = addPoints3('Gryffindor', '20');
	console.log(totalString);
}

//#endregion


//#region Overload Types

interface PointOptions {
	house: House;
	amount: string | number;
}

type PointResult<T extends PointOptions, K extends keyof T> = T[K] extends string ? string : number;

function addPoints4<T extends PointOptions>(options: T): PointResult<T, 'amount'> {
	let numberAmount = typeof options.amount === 'string' ? parseInt(options.amount, 10) : options.amount;
	let newAmount = (points.get(options.house) ?? 0) + numberAmount;
	points.set(options.house, newAmount);
	return <PointResult<T, 'amount'>>(typeof options.amount === 'string' ? `${newAmount}` : newAmount);
}

export function testOverloadComplex() {
	let totalNumber = addPoints4({house: 'Gryffindor', amount: 10});
	console.log(totalNumber);

	let totalString = addPoints4({house: 'Gryffindor', amount: '20'});
	console.log(totalString);
}

//#endregion


//TODO Come up with another overload option??
// function addPoints4(options: { house: House; amount: number }): number;
// function addPoints4(options: { house: House; amount: string }): string;