# Derived Arrays from another arrays
Functional array methods like `.map` can be costy since it occurs 
on all the elements. Even worse when you needed them more than once. Yes you can 
store the result, but then a change on the main array won't be reflected to your 
reference. Derived Arrays makes it both - performant and cleaner.

```js
import { RefArray } from "derivedarray"

const users = new RefArray(
	{ name: "Vagif" }, 
	{ name: "Vincent" }, 
	{ name: "Viktor"})
const names = users.derive(user => user.name)

users.push({ name: "Vali" }) // value to users and derivation value to names
names == ["Vagif", "Vincent", "Viktor", "Vali"]
users.shift() // remove first element from users and derived array
names == ["Vincent", "Viktor", "Vali"]
```

Those methods are wrapped to reflect the changes in derived arrays: `.push()`, 
`.pop()`, `.unshift()`, `.shift()`, `.splice()`, `.fill()`, `.reverse()`, 
`.sort()`, `.copyWithin()`  

When you want to set a specific index, using `.set()` method of RefArray is the 
best method. This will reflect the changes by calculating only the changes 
you made - `users.set(2, { name: "Van" })`

Otherwise, you can still use the index setter but this will not update the 
derived list. To sync them, you can use `.refresh()` but that will call deriver 
function for every item in the array and lose all the optimizations, making it 
almost equal to using `.map`.
```js
users[2] = { name: "Van" }
users.refresh()
```

working on a _filter_ version - arrays that are filtered in a performant way 
when a chage occured on the main array.

working on a _generator_ version - the most optimal version. deriver function 
will be called for every element when the element is required.