import * as DeclarationMerging from './declaration-merging.js';
import * as Decorators from './decorators.js';
import * as FunctionOverloading from './function-overloading.js';

if(DeclarationMerging || Decorators || FunctionOverloading) {}

// DeclarationMerging.testInterfaces();
// DeclarationMerging.testInterfaceClass();
// DeclarationMerging.testClassNamespace();
// DeclarationMerging.testPrototype();

// Decorators.testFunctionDecorator();
// Decorators.testParameterDecorator();
// Decorators.testConstructorDecorator();
// Decorators.testSqlGenerator();

// FunctionOverloading.testOverloadNone();
// FunctionOverloading.testOverloadType();
// FunctionOverloading.testOverloadFunction();
FunctionOverloading.testOverloadComplex();

console.log('The demo is ready to go!');