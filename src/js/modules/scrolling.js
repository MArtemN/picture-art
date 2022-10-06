const scrolling = (upSelector) => {
	const upElem = document.querySelector(upSelector);

	window.addEventListener('scroll', () => {
		if (document.documentElement.scrollTop > 1650) {
			upElem.classList.add('animate__animated', 'animate__fadeIn');
			upElem.classList.remove('animate__fadeOut');
		} else {
			upElem.classList.add('animate__fadeOut');
			upElem.classList.remove('animate__fadeIn');
		}
	});

	const links = document.querySelectorAll('[href^="#"]'),
		speed = 0.2;

	links.forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();

			let widthTop = document.documentElement.scrollTop,
				hash = this.hash,
				toBlock = document.querySelector(hash).getBoundingClientRect().top,
				start = null;

			requestAnimationFrame(frame);

			function frame(time) {
				if (start === null) {
					start = time;
				}

				let progress = time - start,
					r = (toBlock < 0 ?
						Math.max(widthTop - progress/speed, widthTop + toBlock) :
						Math.min(widthTop + progress/speed, widthTop + toBlock));

				document.documentElement.scrollTo(0, r);

				if (r !== widthTop + toBlock) {
					requestAnimationFrame(frame);
				} else {
					location.hash = hash;
				}
			}
		})
	});

	//scroll without requestAnimationFrame

	// const element = document.documentElement,
		//       body = document.body;

		// const calcScroll = () => {
		//     upElem.addEventListener('click', function(event) {
		//         let scrollTop = Math.round(body.scrollTop || element.scrollTop);

		//         if (this.hash !== '') {
		//             event.preventDefault();
		//             let hashElement = document.querySelector(this.hash),
		//                 hashElementTop = 0;

		//             while (hashElement.offsetParent) {
		//                 hashElementTop += hashElement.offsetTop;
		//                 hashElement = hashElement.offsetParent;
		//             }

		//             hashElementTop = Math.round(hashElementTop);
		//             smoothScroll(scrollTop, hashElementTop, this.hash);
		//         }
		//     });
		// };

		// const smoothScroll = (from, to, hash) => {
		//     let timeInterval = 1,
		//         prevScrollTop,
		//         speed;

		//     if (to > from) {
		//         speed = 30;
		//     } else {
		//         speed = -30;
		//     }

		//     let move = setInterval(function() {
		//         let scrollTop = Math.round(body.scrollTop || element.scrollTop);

		//         if (
		//             prevScrollTop === scrollTop ||
		//             (to > from && scrollTop >= to) ||
		//             (to < from && scrollTop <= to)
		//         ) {
		//             clearInterval(move);
		//             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
		//         } else {
		//             body.scrollTop += speed;
		//             element.scrollTop += speed;
		//             prevScrollTop = scrollTop;
		//         }
		//     }, timeInterval);
		// };

		// calcScroll();
};

export default scrolling;