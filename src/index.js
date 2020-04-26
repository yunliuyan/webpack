//管理资源
 import './style.css';
// import bg from './asset/bg.jpg';
// import Date from './asset/data.xml';

//管理输出
import { printMe } from './js/print'

//缓存优化
//import cachePrint from './js/cache-print'

function component() {
	console.log(this);

  //管理资源
  var element = document.createElement('div')

  // //lodahs,now impoted by this script
  // element.innerHTML = _.join(['Hello','wrold'],' ');
  // element.classList.add('hello');
  // var myBg = new Image();
  // myBg.src = bg;
  // element.appendChild(myBg);
  // console.log(Date)

  /** 管理输出:到目前为止，我们再index.html文件中手动引入所有资源，然而随着应用程序的增长，并且一旦开始对文件名使用哈希(hash)并输出多个bundle，手动地index.html文件
   * 进行管理，一切就会变得困难起来。然而，可以通过一些插件，会使这个过程更容易操控。**/
	var btn = document.createElement('button')
	btn.classList.add('btn');
  btn.innerHTML = 'click me!'
  btn.onclick = printMe
  element.appendChild(btn)

	//缓存优化
	//element.onclick = cachePrint.bind(null,'Hello cache-webpack!')
  return element
}
let element = component();  //当print.js改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept('./js/print.js', function () {
    console.log('Accepting the updated printMe module!')
		document.body.removeChild(element);
		element = component();  //重新渲染页面后，component更新click事件处理
		document.body.appendChild(element)
  })
}
