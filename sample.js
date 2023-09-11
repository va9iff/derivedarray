// after npm imported
import { RefArray } from "derivedarray"

const users = new RefArray(
	{ name: "Vagif" }, 
	{ name: "Vincent" }, 
	{ name: "Viktor"})
const names = users.derive(user => user.name)

users.push({ name: "Vali" }) // value to users and derivation value to names
console.log(names) // ["Vagif", "Vincent", "Viktor", "Vali"]
users.shift() // remove first element from users and derived array
console.log(names) // ["Vincent", "Viktor", "Vali"]
