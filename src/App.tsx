const isRealNumber = (val: unknown): val is number => Number.isFinite(val);

const isNonBlankString = (val: unknown): val is string => {
  if (typeof val !== 'string') return false;
  return val.trim() !== '';
};

const isArray = (val: unknown): val is Array<any> => Array.isArray(val);

type PlainObject = object & {
  [prop: string /*| number*/]: any;
  [index: number]: never;
};
const isPlainObject = (val: unknown): val is PlainObject =>
  ({}.toString.call(val) === '[object Object]' &&
  ((val as any).constructor === Object ||
    (val as any).constructor === undefined));

let obj: PlainObject = {aaa: 'foo'};
let obj2: PlainObject = {1: true}; // TODO: Should not complain
let arr: PlainObject = ['aaa'];
let arr2: PlainObject = []; // TODO: Should complain

//-------------------------

type User = {
  id: string;
  email: string;
};

const test = (val: User | Array<User> | number | string) => {
  if (isPlainObject(val)) return val.email;
  if (isArray(val)) return val[0].email;
  if (isRealNumber(val)) return val.toFixed(2);
  if (isNonBlankString(val)) return val.toUpperCase();
};

//---------------------------

const App = () => <>Hello</>;
export default App;
