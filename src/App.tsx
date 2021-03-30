type User = {
  age: number;
  id: string;
  name: string;
};

declare const value: User['id'] | User | Array<User>;

type PlainObject = Record<string, any>;

const isPlainObject = (val: any): val is PlainObject =>
  ({}.toString.call(val) === '[object Object]' && //
  (val.constructor === Object || val.constructor === undefined));

if (isPlainObject(value)) {
  console.log(value.name);
} else if (Array.isArray(value)) {
  console.log(value[0].name);
} else if (typeof value === 'string') {
  console.log(value.toUpperCase());
}

const App = () => <>Hello</>;
export default App;
