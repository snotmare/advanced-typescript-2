import * as DeclarationMerging from './declaration-merging.js';
import * as Decorators from './decorators.js';

if(DeclarationMerging) {}

// DeclarationMerging.testInterfaces();
// DeclarationMerging.testInterfaceClass();
// DeclarationMerging.testClassNamespace();
// DeclarationMerging.testPrototype();

// Decorators.testFunctionDecorator();
// Decorators.testParameterDecorator();
Decorators.testConstructorDecorator();

console.log('The demo is ready to go!');