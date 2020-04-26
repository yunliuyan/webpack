function getComponent() {
	return import(/**webpackChunkName:"loadsh" */ 'lodash').then(_=>{
		let element = document.createElement('div');
		element.innerHTML = join(['hello','webpack'], '');
		element.classList.add('hello');
		return element
	}).catch(err=>{
		console.log(err)
	})
}

getComponent().then(component=>{
	document.body.appendChild(component)
})