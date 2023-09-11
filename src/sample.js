import { RefArray } from "./RefArray.js"
import { DerivedArray } from "./DerivedArray.js"

let ref = new RefArray({ a: 7 }, { a: 2 }, { a: 88 })

let der = ref.derive(obj => obj.a)


function see() {	
	console.log(...ref)
	console.log(...der)
}

see()

ref[1] = {a: 80000}
ref.refresh()

// ref.push({a: 500})
// ref.shift()

see()