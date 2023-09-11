export class DerivedArray extends Array{
	ref = []
	deriver(arg){
		return arg
	}
	static construct(ref, deriver = arg => arg){
		let instance = new this(...ref.map(deriver))
		instance.ref = ref
		instance.deriver = deriver
		return instance
	}
}