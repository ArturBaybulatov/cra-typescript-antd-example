// @ts-nocheck

import {SymmetricDifference} from 'utility-types';

type Extends<T extends U, U> = true;
type NotExtends<T, U> = T extends U ? false : true;

type Expect<T extends true> = T;

type Wrap1<T> = <U>() => U extends T ? true : false;
type Wrap2<T> = <U>() => U extends T ? true : false;
type Equal<A, B> = Wrap1<A> extends Wrap2<B> ? true : false;

type NotEqual<A, B> = Equal<A, B> extends true ? false : true;

//------------------------------------

type Primitive = string | number | boolean | bigint | symbol | null | undefined;

type tests = [
  Expect<Equal<Exclude<Primitive, {}>, null | undefined>>,
  Expect<Equal<Extract<Primitive, {}>, NonNullable<Primitive>>>,

  Expect<Equal<SymmetricDifference<Primitive, {}>, null | undefined | {}>>,

  Expect<Equal<{}, Object>>, // Fails

  Expect<NotEqual<object, {}>>,
  Expect<Extends<object, {}>>,
  Expect<NotExtends<{}, object>>, // Fails

  Expect<Equal<Record<any, any>, object>>, // Fails

  Expect<NotEqual<Record<any, any>, {}>>,
  Expect<Extends<Record<any, any>, {}>>,
  Expect<NotExtends<{}, Record<any, any>>>, // Fails

  Expect<Equal<Record<string, string>, {[key: string]: string}>>,
];

//------------------------------------

const App = () => <>Hello</>;
export default App;
