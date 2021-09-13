## Typescript

<!--v-->

### About speaker

My name is Evgeniy Dainovich

Skype: nukink

Presentation and code is located here: [https://evgeniy-dainovich.github.io/ts/](https://evgeniy-dainovich.github.io/ts/)

<!--s-->

## What is TypeScript?

<!--v-->

### TypeScript is JavaScript with syntax for types.

- Voted 2nd most loved programming language in the [Stack Overflow 2020 Developer survey](https://insights.stackoverflow.com/survey/2020#most-loved-dreaded-and-wanted)

- TypeScript was used by 78% of the [2020 State of JS](https://2020.stateofjs.com/en-US/technologies/javascript-flavors/) respondents, with 93% saying they would use it again.

<!--v-->

## Useful links

- [Official documentation](https://www.typescriptlang.org/docs/)
- [Playground](https://www.typescriptlang.org/play)

<!--s-->

## Primitive types

<!--v-->

### String, number, boolean

```ts data-line-numbers=[]
const age: number = 12
const givenName: string = 'Alex'
const isAdult: boolean = false

type PaperName = string
function collect(paper: PaperName): void {}
```

<!--v-->

### void

```ts data-line-numbers=[]
function showMessage(message: string): void {
  console.log(message)
}
```

<!--v-->

### any

```ts data-line-numbers=[]
const a = {name: '342'}

function stringToUpperCase(x: string) {
  return x.toUpperCase()
}

stringToUpperCase(a as any) // no error with any
```

<!--v-->

### never

```ts data-line-numbers=[]
function error(message: string): never {
  throw new Error(message)
}

function infiniteLoop(): never {
  while (true) {}
}

function infiniteRec(): never {
  return infiniteRec()
}
```

<!--v-->

### object

object is a type that represents the non-primitive type

```ts data-line-numbers=[]
function create(o: object | null): void {}

create({prop: 0}) // ok
create(null) // ok
create(undefined) // Error

create(42) // Error
create('string') // Error
create(false) // Error
```

<!--v-->

### unknown

```ts data-line-numbers=[]
let fooAny: any = 10

// All of these will throw errors, but TypeScript won't complain since `foo` has the type `any`.
fooAny.x.prop
fooAny()
new fooAny()
upperCase(fooAny)

let fooUnknown: unknown = 10

// Since `foo1` has type `unknown`, TypeScript errors on each of these usages.
fooUnknown.x.prop // error
fooUnknown() // error
new fooUnknown() // error
upperCase(fooUnknown) // error
```

<!--v-->

### unknown

#### how to use?

```ts data-line-numbers=[]
let fooUnknown: unknown = JSON.parse({x: {prop: 'x'}})

fooUnknown.x.prop // Object is of type 'unknown'.

function hasX(obj: any): obj is {x: any} {
  return !!obj && typeof obj === 'object' && 'x' in obj
}

// Using a user-defined type guard we're allowed to access certain properties again.
if (hasX(fooUnknown)) {
  fooUnknown.x.prop
}

const fooString = fooUnknown as string
```

<!--s-->

## Non-primitive types

<!--v-->

### tuples

```ts data-line-numbers=[]
type Coordinate = [number, number, number?]

const cord1 = [1, 2, 3]
const cord2 = [1, 2]

type Coordinate1 = [number, number, ...string[]]

const cord3 = [1, 2, '3', '3', '3']
```

<!--v-->

### arrays

```ts data-line-numbers=[]
const numbers: number[] = [1, 2, 3, 4, 5]

type Guy = {age: number; name: string}

const guys1: Guy[] = [
  {name: 'alex', age: 22},
  {name: 'john', age: 23},
]

const guys2: Array<Guy> = [
  {name: 'alex', age: 22},
  {name: 'john', age: 23},
]
```

<!--v-->

### arrays (not empty)

```ts data-line-numbers=[]
function calculate(numbers: [string]): number

function calculate(numbers: string[]): number

function calculate(numbers: Array<string>): number
```

<!--v-->

### functions

#### declaration

```ts data-line-numbers=[]
function sum(a: string, b: string): string
function sum(a: number, b: number): number
function sum(a: any, b: any) {
  return a + b
}

const x = sum(1, 2)
const y = sum('a', 'b')
```

<!--v-->

### Function

```ts data-line-numbers=[]
function doSomething(f: Function) {
  return f(1, 2, 3)
}
```

<!--v-->

### enum

#### numeric enum

```ts data-line-numbers=[]
enum Directions1 {
  up,
  down,
  left,
  right,
}

const selectedDirection1 = Directions1.up // 0 (autoincrement starts from 0)
```

<!--v-->

### enum

#### string enum

```ts data-line-numbers=[]
enum StringDirection {
  up = 'UP',
  down = 'DOWN',
  left = 'LEFT',
  right = 'RIGHT',
}

const stringDir = StringDirection.down // 'DOWN'
```

<!--v-->

### enum

#### const enum

```ts data-line-numbers=[]
const enum Direction3 {
  Up,
  Down,
  Left,
  Right,
}

const directions = [Direction3.Up, Direction3.Down, Direction3.Left, Direction3.Right]

/*
after compilation
"use strict";
let directions = [
    0, // Up
    1, // Down
    2, // Left
    3, // Right
]
*/
```

<!--v-->

### enum

#### objects vs enums

as const (const assertion) – used for strings makes them literals, object literals get readonly properties, array literals become readonly tuples

```ts data-line-numbers=[]
// objects vs enums
const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}
console.log(EDirection.Up) // 0

const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const

console.log(ODirection) // { Up: 0, Down: 1, Left: 2, Right: 3 }
console.log(ODirection.Up) // 0
```

<!--v-->

### generic

```ts data-line-numbers=[]
type Container<T> = {value: T}

// Type 'string' is not assignable to type 'number'
const container1: Container<number> = {value: '344'}
const container2: Container<number> = {value: 344}
```

<!--v-->

### generic

```ts data-line-numbers=[]
type Tree<T> = {
  value: T
  left: Tree<T>
  right: Tree<T>
}

const tree: Tree<number> = {
  value: 4,
  left: {} as Tree<number>,
  right: {} as Tree<number>,
}

tree.left.left.left.left.left.left.left.value
```

<!--v-->

### interfaces vs types

When to use type:

- when defining an alias for primitive types (string, boolean, number, etc)
- when defining tuple types
- when defining function types
- when defining a union
- when trying to overload functions in object types via composition
- when needing to take advantage of mapped types

When to use interface:

- for all object types where using type is not required (see above)
- when you want to take advantage of declaration merging.

<!--s-->

## logic operators

- union
- intersection

<!--v-->

### union

```ts data-line-numbers=[]
type UnionType1 = string | number

function showType(arg: UnionType1) {
  console.log(arg)
}

showType('test') // test
showType(7) // 7

type UnionType2 = {a: string} | {b: number}
const ut21: UnionType2 = {a: ''}
const ut22: UnionType2 = {b: 3}
```

<!--v-->

### intersection

```ts data-line-numbers=[]
type LeftType = { id: number left: string }
type RightType = { id: number right: string }

type IntersectionType = LeftType & RightType

function showType(args: IntersectionType) {
  console.log(args)
}

showType({ id: 1, left: 'test', right: 'test' }) // {id: 1, left: "test", right: "test"}
```

<!--s-->

## Other features

<!--v-->

### template literal

```ts data-line-numbers=[]
type NotificationObject = 'user' | 'host'
type NotificationOperation = 'changed' | 'deleted'

// "user changed" | "user deleted" | "host changed" | "host deleted"
type NotificationMessage = `${NotificationObject} ${NotificationOperation}`
```

<!--v-->

### narrowing

#### by checking type

```ts data-line-numbers=[]
function padLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}

padLeft('hero', '*') // *hero
padLeft('hero', 2) // __hero
padLeft('hero', {} as string) // Runtime Error: Expected string or number'
```

<!--v-->

### narrowing

#### by checking with guard

```ts data-line-numbers=[]
interface Fish {
  swim(): void
}

interface Bird {
  fly(): void
}

function getRandomPet(): Bird | Fish {}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}

function move(pet) {
  isFish(pet) ? pet.swim() : pet.fly()
}
const pet = getRandomPet()
move(pet)
```

<!--v-->

### lookup types

```ts data-line-numbers=[]
interface Person {
  name: string
  location: string
  coords: {
    lng: string
    lat: string
  }
}

// We can also rename fields and fields below will autorename too (except union types)

type PersonKey = keyof Person // "name" | "location" | "coords"
type Name = Person['name'] // string
type Coords = Person['coords'] // {lng: string; lat: string}
```

<!--v-->

### private fields

```ts data-line-numbers=[]
class Person {
  #name: string

  constructor(name: string) {
    this.#name = name
  }

  greet() {
    console.log(`Hello, my name is ${this.#name}!`)
  }
}

let jeremy = new Person('Jeremy Bearimy')

// Property '#name' is not accessible outside class 'Person'
// because it has a private identifier.
jeremy.#name
```

<!--v-->

### infer

#### example 1

```ts data-line-numbers=[]
type IsNumber<T> = T extends number ? 'number' : 'other'

type WithNumber = IsNumber<number> // number
type WithOther = IsNumber<string> // other

type IsArray<T> = T extends Array<any> ? 'array' : 'other'

type WithArray = IsArray<string[]> // array
type WithoutArray = IsArray<string> // other
```

<!--v-->

### infer

#### example 2

```ts data-line-numbers=[]
type UnboxArray<T> = T extends Array<infer Item> ? Item : T

type UnboxedStringArray = UnboxArray<string[]> // string
type UnboxedNumberArray = UnboxArray<number[]> // number

type Auto = {maxSpeed: number}
type UnboxedAutoArray = UnboxArray<Auto[]> // { maxSpeed: number }
type UnboxedString = UnboxArray<string> // string
```

<!--s-->

## Using js library without type declarations

Solutions:

- `npm i @types/untyped-module`
- create and include declaration file

<!--v-->

### math.js

```ts data-line-numbers=[]
function sin(value) {
  return Math.sin(value)
}

function cos(value) {
  return Math.cos(value)
}

const pi = Math.pi

function sum(a, b, c) {
  return a + b + c
}

module.exports = {
  sin,
  cos,
  pi,
  sum,
}
```

<!--v-->

### math.d.ts

```ts data-line-numbers=[]
export declare function sin(value: number): number
export declare function sum(a: number, b: number, c: number): number
export declare const pi: string
```

<!--v-->

### app.ts

```ts data-line-numbers=[]
import {sin, sum} from './math'

sin(1) // Ok
sin('1') // Argument of type 'string' is not assignable to parameter of type 'number'
sum(1, 2, 3) // Ok
sum(1, '2', 'd') // Argument of type 'string' is not assignable to parameter of type 'number'
```

<!--s-->

## utility types

- Partial/Required
- Pick/Omit
- Exclude/Extract
- Readonly
- Record
- ReturnType
- stringManipulation

<!--v-->

### Partial/Required

```ts data-line-numbers=[]
type Figure = {
  width: number
  height: number
  area?: number
}

type Dimension = Partial<Figure>

const dim1: Dimension = {width: 12}
const dim2: Dimension = {height: 12}
const dim3: Dimension = {width: 12, height: 12}
// Property 'area' is missing in type '{ width: number; height: number; }'
// but required in type 'Required<Figure>'
const dim4: Required<Figure> = {width: 12, height: 12} // error
```

<!--v-->

### Pick/Omit

```ts data-line-numbers=[]
type Figure = {
  width: number
  height: number
  area?: number
}

type FigureDimensions = Pick<Figure, 'height' | 'width'> // { width: number; height: number; }
type FigureWithoutArea = Omit<Figure, 'area'> // { width: number; height: number; }
```

<!--v-->

### Exclude/Extract

```ts data-line-numbers=[]
type Status = 'resolve' | 'reject' | 'pending' | 'delegated'

type PromiseStatus = Exclude<Status, 'delegated'>

type UserInfo = {age: number} | {age: string; name: string} | {name: string} | {address: string}

// { age: number } | { age: string; name: string } | { name: string }
type PersonalUserInfo = Exclude<UserInfo, {address: string}>

// { age: string; name: string } | { name: string }
type UserWithName = Extract<UserInfo, {name: string}>
```

<!--v-->

### Readonly

```ts data-line-numbers=[]
type AdvanceFigure = {
  width: number
  height: number
  coords: {
    x: number
    y: number
  }
}

const readonlyAdvFigure: Readonly<AdvanceFigure> = {
  width: 10,
  height: 10,
  coords: {x: 10, y: 10},
}

readonlyAdvFigure.width = 25 // Cannot assign to 'width' because it is a read-only property
readonlyAdvFigure.coords.x = 25 // no error
```

<!--v-->

### Record

```ts data-line-numbers=[]
type Dictionary1 = {[key: string]: string | number}

const dic1: Dictionary1 = {}
const dic2: Dictionary1 = {name: 'Garry', level: 3}

type Dictionary2 = Record<string, string | number>

const dic3: Dictionary2 = {name: 'Garry', level: 4}
```

<!--v-->

### Where to read more

- [utility types documentation](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [utility types library](https://github.com/piotrwitek/utility-types)
- [types challenges](https://github.com/type-challenges/type-challenges#challenges)

<!--s-->

## Typescript issues

- Structural typing
- Enum as number
- Private is not private
- Cloning
- Mutations

<!--v-->

### Structural typing

```ts data-line-numbers=[]
interface Book {
  price: number
  name: string
}

interface Car {
  price: number
  name: string
  maxSpeed: number
  color: string
}

function buyBook(_book: Book): void {}

const car = {
  price: 10000,
  name: 'BMW',
  maxSpeed: 200,
  color: 'red',
}

buyBook(car) // no any issues with type cheking
```

<!--v-->

### Enum as number

```ts data-line-numbers=[]
enum TestEnum {
  foo,
}

const testArg: number = 10

function func(arg: TestEnum) {
  console.log(arg)
}

func(testArg) // no warning
```

<!--v-->

### Private is not private

```ts data-line-numbers=[]
class Member {
  private secret = 'private member'
}

const member = new Member()
// Property 'secret' is private and only accessible within class 'Member'.
member.secret
// Works like a sharm. The privacy of members are only enforced within the compiler.
;(member as any).secret
```

<!--v-->

### Cloning

```ts data-line-numbers=[1,2,5,7,11,12|1,3,6,8,11,13]
type Metadata = {}
type UserMetadata = Record<string, Metadata>
type UserMetadata = Map<string, Metadata>

const cache: UserMetadata = {}
const cache: UserMetadata = new Map()
console.log(cache.foo)
console.log(cache.get('foo'))

// somewhere in the project
const cacheCopy: UserMetadata = {...cache}
console.log(cacheCopy.foo)
console.log(cacheCopy.get('foo')) // runtime error
```

<!--v-->

### Mutation

```ts data-line-numbers=[]
type Cat = {meow: () => void}
type Dog = {woof: () => void}
const createCat = (): Cat => ({meow: () => console.log('Meow!')})
const createDog = (): Dog => ({woof: () => console.log('Woof!')})

const mutateAnimals = (animals: (Cat | Dog)[]) => animals.push(createDog())

const cats: Cat[] = []
mutateAnimals(cats)
cats.forEach((cat) => cat.meow()) // Failed in runtime with cat.meow is not a function
```

<!--v-->

### Useful links

- [why TS is bad](https://www.t.me/why_typescript_is_bad)
- [TS issues](https://github.com/microsoft/TypeScript/issues)
- [TS worship in UA outsourcing](https://www.youtube.com/watch?v=H9-F8uhKMRk)
- [do's and don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [best practices](https://blog.softwaremill.com/typescript-mistakes-to-avoid-d3ab240c90eb)
