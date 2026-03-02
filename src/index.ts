import * as DeclarationMerging from './declaration-merging.js';
import * as Decorators from './decorators.js';
import * as FunctionOverloading from './function-overloading.js';
import * as TemplateStrings from './template-strings.js';

if(DeclarationMerging || Decorators || FunctionOverloading || TemplateStrings) {}

// DeclarationMerging.testInterfaces();
// DeclarationMerging.testInterfaceClass();
// DeclarationMerging.testClassNamespace();
// DeclarationMerging.testPrototype();

// FunctionOverloading.testOverloadNone();
// FunctionOverloading.testOverloadType();
// FunctionOverloading.testOverloadFunction();
// FunctionOverloading.testOverloadTypeComplex();
// FunctionOverloading.testOverloadFunctionComplex();
// FunctionOverloading.testOverloadTypeComplexFunction();

// TemplateStrings.testBasic();
// TemplateStrings.testTagged();
// TemplateStrings.testLiteralTypes();
// TemplateStrings.testBuiltInTypes();
// TemplateStrings.testTemplateInferance();
// TemplateStrings.testTemplateParameters();

// Decorators.testFunctionDecorator();
// Decorators.testParameterDecorator();
// Decorators.testConstructorDecorator();
// Decorators.testSqlGenerator();

console.log('The demo is ready to go!');
