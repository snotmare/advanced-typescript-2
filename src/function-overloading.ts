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

//Conditional type so we get back the correct type instead of a literal (string | number instead of 10 or '20')
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



//#region Overload Function

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


//#region Overload Type Complex

interface PointOptions1 {
	house: House;
	amount: string | number;
}

type PointResult<T extends PointOptions1> = T['amount'] extends string ? string : number;

function addPoints4<T extends PointOptions1>(options: T): PointResult<T> {
	let numberAmount = typeof options.amount === 'string' ? parseInt(options.amount, 10) : options.amount;
	let newAmount = (points.get(options.house) ?? 0) + numberAmount;
	points.set(options.house, newAmount);
	return <PointResult<T>>(typeof options.amount === 'string' ? `${newAmount}` : newAmount);
}

export function testOverloadTypeComplex() {
	let totalNumber = addPoints4({house: 'Gryffindor', amount: 10});
	console.log(totalNumber);

	let totalString = addPoints4({house: 'Gryffindor', amount: '20'});
	console.log(totalString);
}

//#endregion



//#region Overload Function Complex
interface PointOptions2<T extends string | number> {
	house: House;
	amount: T;
}

function addPoints5(options: PointOptions2<number>): number;
function addPoints5(options: PointOptions2<string>): string;
function addPoints5<T extends string | number>(options: PointOptions2<T>): string | number {
	let numberAmount = typeof options.amount === 'string' ? parseInt(options.amount, 10) : <number>options.amount;
	let newAmount = (points.get(options.house) ?? 0) + numberAmount;
	points.set(options.house, newAmount);
	return typeof options.amount === 'string' ? `${newAmount}` : newAmount;
}

export function testOverloadFunctionComplex() {
	let totalNumber = addPoints5({house: 'Gryffindor', amount: 10});
	console.log(totalNumber);

	let totalString = addPoints5({house: 'Gryffindor', amount: '20'});
	console.log(totalString);
}
//#endregion



//#region Overload Type Complex with a Function

interface PointOptions3 {
	house: House;
	amount: () => string | number;
}

type PointResult3<T extends PointOptions3> = ReturnType<T['amount']> extends string ? string : number;

function addPoints6<T extends PointOptions3>(options: T): PointResult3<T> {
	let suppliedAmount = options.amount();
	let numberAmount = typeof suppliedAmount === 'string' ? parseInt(suppliedAmount, 10) : suppliedAmount;
	let newAmount = (points.get(options.house) ?? 0) + numberAmount;
	points.set(options.house, newAmount);
	return <PointResult3<T>>(typeof suppliedAmount === 'string' ? `${newAmount}` : newAmount);
}

export function testOverloadTypeComplexFunction() {
	let totalNumber = addPoints6({house: 'Gryffindor', amount: () => 10});
	console.log(totalNumber);

	let totalString = addPoints6({house: 'Gryffindor', amount: () => '20'});
	console.log(totalString);
}

//#endregion