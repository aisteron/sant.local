import {$_, $$_, loadCSS, onloadCSS} from './libs.js'
document.readyState !== 'loading' ? init() : document.addEventListener('DOMContentLoaded', init);

function init(){
	open_mobile_menu()
	swiper()
	open_modal()
}


function open_mobile_menu(){
	$_('button.hamburger').addEventListener('click', event => {
		event.target.classList.toggle("is-active")
		$_("#mobile_menu").classList.toggle('open')
		
	})
}

function swiper(){
	if(!$_('body').classList.contains('photo-page')) return;
	load_swiper()
	 .then(result => {
	 	if(!result) console.log('%c Ошибка загрузки swiper', 'color: red')

	 		
      var swiper = new Swiper(".swiper", {
        pagination: {
          el: ".swiper-pagination",
        },
      });

    	return result
    
	 	
	 })

	 .then(result => {
	 		$$_('.swiper-slide img').forEach(img => {
	 			img.src = img.dataset.src
	 		})
	 })
}

async function load_swiper(){

	return new Promise((resolve, reject) => {
		

		let script = document.createElement('script')
		script.src="/vendor/swiper/swiper-bundle.min.js"
		$_('body').appendChild(script)

		script.onload = () => {
			let style = loadCSS("/vendor/swiper/swiper.min.css")
			onloadCSS(style, () => resolve(true))
		}


		})
}

function open_modal(){
	$$_('header ul.addr li')[2].addEventListener("click", event => {
		$_("#myModal").style.display = "block"
		$_('#myModal iframe').src = $_('#myModal iframe').dataset.src
	})

	$_('.modal-content span.close').addEventListener("click", event => {
		$_("#myModal").style.display = "none"
	})

	window.onclick = function(event) {
  if (event.target == $_("#myModal")) {
    $_("#myModal").style.display = "none";
  }
}
}