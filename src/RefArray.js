import { DerivedArray } from "./DerivedArray.js"

export class RefArray extends Array {
	deriveds = []
	derive(deriver) {
		let derived = DerivedArray.construct(this, deriver)
		this.deriveds.push(derived)
		return derived
	}
	push() {
		for (const derived of this.deriveds) {
			derived.push(...[...arguments].map(arg => derived.deriver(arg)))
		}
		return super.push(...arguments)
	}
	pop() {
		for (const derived of this.deriveds) derived.pop()
		return super.pop()
	}
	set(index, value) {
		for (const derived of this.deriveds) derived[index] = derived.deriver(value)
		return super.set(...arguments)
	}
	refresh(){
		for (const derived of this.deriveds) {
			derived.length = 0
			derived.push(...this.map(arg => derived.deriver(arg)))
		}
	}

	unshift() {
		for (const derived of this.deriveds) {
			derived.unshift(...[...arguments].map(arg => derived.deriver(arg)))
		}
		return super.unshift(...arguments)
	}
	shift() {
		for (const derived of this.deriveds) derived.shift()
		return super.shift()
	}
	splice(start, deleteCount, ...items) {
		for (const derived of this.deriveds)
			derived.splice(
				start,
				deleteCount,
				...items.map(item => derived.deriver(item))
			)
		return super.splice(...arguments)
	}
	fill(value, start, end){
		for (const derived of this.deriveds) 
			derived.fill(derived.deriver(value), start, end)
		return super.fill(...arguments)
	}
	reverse(){
		for (const derived of this.deriveds)
			derived.reverse()
		return super.reverse()
	}
	sort(compareFn){
		for (const derived of this.deriveds)
			derived.sort(compareFn)
		return super.sort(compareFn)
	}
	copyWithin(){
		for (const derived of this.deriveds)
			derived.copyWithin(...arguments)
	}
}
