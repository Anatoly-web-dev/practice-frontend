const titles = document.querySelectorAll('.section__title');
// если есть такие элементы
if (titles.length > 0) {
	titles.forEach(title => { // перебираем коллекцию заголовков
		// добавляем/убираем класс заголовку по клику
		title.addEventListener('click', () => {
			title.classList.toggle('active');
			if (title.classList.contains('active')) {
				title.nextElementSibling.classList.add('show');
				title.nextElementSibling.classList.remove('none');
			} else { // иначе скрываем блок с контентом под заголовком
				title.nextElementSibling.classList.remove('show');
				title.nextElementSibling.classList.add('none');
			}
		});
	});
}

// ================== popup =====================
// добавляем в коллекцию все ссылке, вызывающие модальные окна
const popupActiveBtns = document.querySelectorAll('.popup__btn');
// добавляем в константу класс, который блокирует отступ справа у определенных элементов
const lockPadding = document.querySelectorAll('.lock-padding');
// создаем переменную, которая задает статус "разблокирован" (по умолчанию true)
let unlock = true;

if (popupActiveBtns.length > 0) { // если такие кнопки у нас вообще существуют
	popupActiveBtns.forEach(btnActive => { // перебираем коллекцию
		btnActive.addEventListener('click', (e) => { // каждой ссылке при клике:
			e.preventDefault(); // запрещаем переход (действие по умолчанию),
			const address = btnActive.getAttribute('href'); // получаем значение атрибута href нажатой ссылки (id popup'a)
			const currentPopup = document.querySelector(`${address}`); // получаем модальное окно с указанным id, адрес на кот. ведет ссылка
			popupOpen(currentPopup); // открываем полученный объект с помощью функции
		})
	});
}
// функция, открывающая модальное окно
function popupOpen(currentPopup) { // в качестве параметра передаем текущее модальное окно, кот. получили ранее
	if (currentPopup && unlock) { // если существует такое окно с указанным id и статус разблокировано === true
		// получаем в переменную активный popup по селектору класса
		// .pop-up - изначальный класс у всех модальных окон и .open - класс добавляется, когда модальное окно открыто 
		const popupActive = document.querySelector('.pop-up.open');
		if (popupActive) { // если такой существует
			popupClose(popupActive, false); // то вызываем функцию, закрывающую активный popup (с параметрами popup, false)
		} else {
			bodyLock(); // если модальное окно с классом .open не существует, то выполняем функцию, блокирующую body
		}
		currentPopup.classList.add('open'); // добавляем класс open текущему модальному окну
		currentPopup.addEventListener('click', (e) => { // назначаем для текущего модального окна событие при клике 
			if (!e.target.closest('.form')) { // если кликнули не на контентную часть
				popupClose(e.target.closest('.pop-up')); // выполняем функцию, закрывающую модальное окно с параметром ближайший предок с классом как и всех модальных окон, указанному по умолчанию
			}
		});
	}
}
// получаем в коллекцию все кнопки и элементы, которые будут закрывать модальное окно по указанному классу 
const popupCloseBtns = document.querySelectorAll('.close');
if (popupCloseBtns.length > 0) { // если такие элементы существуют
	popupCloseBtns.forEach(btnClose => { // перебираем коллекцию, каждому элементу
		btnClose.addEventListener('click', (e) => { // при клике
			e.preventDefault(); // убираем поведение по умолчанию
			popupClose(btnClose.closest('.pop-up'));
			// выполняем функцию, закрывающую модальное окно с параметром ближайший предок кнопки, закрывающей модальное окно с классом для как и всех модальных окон, указанному по умолчанию
		})
	})
}
// функция закрывающая модальное окно
function popupClose(popupActive, doUnlock = true) { // передаем параметры (активное открытое модальное окно и статус, указывающий сделать разблокировку (по умолчанию равен true))
	if (unlock) { // если разблокировано
		popupActive.classList.remove('open'); // у открытого модального окна убираем класс .open
		if (doUnlock) { // если разблокировано
			bodyUnlock(); // выполняем функцию разблокирующую body
		}
	}
}
// функция, блокирующая body
function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	if (lockPadding.length > 0) { // если существуют такие элементы
		lockPadding.forEach(elem => { // перебираем коллекцию 
			elem.style.paddingRight = lockPaddingValue; // каждому элементу задаем вычесленный ранее отступ справа 
		})
	}
	document.body.style.paddingRight = lockPaddingValue; // тегу body тоже задаем вычесленный отступ справа
	document.body.classList.add('lock'); // добавляем тегу body класс, который скрывает скролл  
	unlock = false; // меняем статус на "заблокировано" на некоторое время
	setTimeout(() => { // устанавливаем таймаут
		unlock = true; // опять устанавливаем статус "разблокировано" 
	}, 500); // таймаут такой же как указали в css для этого элемента
}
// функция, разблокирующая тег body
function bodyUnlock() {
	setTimeout(() => { // задаем таймаут
		if (lockPadding.length > 0) { // если существуют такие элементы 
			lockPadding.forEach(elem => { // перебираем коллекцию 
				elem.style.paddingRight = '0px'; // каждому элементу убираем отступ справа
			})
		}
		document.body.style.paddingRight = '0px'; // тегу body тоже убираем отступ справа
		document.body.classList.remove('lock'); // удаляем у тега body класс, который скрывет скролл
	}, 500); // таймаут такой же как указали в css для этого элемента
	unlock = false; // меняем статус на "заблокировано" на некоторое время
	setTimeout(() => { // устанавливаем таймаут
		unlock = true; // опять устанавливаем статус "разблокировано" 
	}, 500); // таймаут такой же как указали в css для этого элемента
}
// создаем событие для клавиатуры
document.addEventListener('keydown', (e) => {
	if (e.which === 27) { // если нажата кнопка esc
		// получаем в переменную активный popup по селектору класса
		// .pop-up - изначальный класс у всех модальных окон и .open - класс добавляется, когда модальное окно открыто 
		const popupActive = document.querySelector('.pop-up.open');
		popupClose(popupActive); // выполняем функцию, закрывающую модальное окно с аргументом (активное модальное окно)
	}
});

// ======================== плавный переход к разделу ===========================

const smoothLinks = document.querySelectorAll('.anchor, .tabs__link');
const headerHeight = document.querySelector('.header').clientHeight;

if (smoothLinks.length > 0) {
	smoothLinks.forEach(link => { // перебираем коллекцию ссылок
		link.addEventListener('click', (event) => { // при клике
			event.preventDefault(); // запрещаем переход по ссылке
			const address = event.target.getAttribute('href');
			const linkTarget = document.querySelector(`${address}`);
			const tabs = document.querySelectorAll('.tabs__section');
			tabs.forEach(tab => tab.classList.remove('active'));

			if (linkTarget) {
				const scrollValue = linkTarget.getBoundingClientRect().top + scrollY - headerHeight;
				window.scrollTo({ top: scrollValue, behavior: "smooth" });
			}

			const tabLink = event.target.closest('.tabs__link');
			if (tabLink) {
				const currentTab = document.querySelector(tabLink.getAttribute('href'));
				currentTab.classList.add('active');
				const scrollValue = tabLink.getBoundingClientRect().top + scrollY - headerHeight;
				window.scrollTo({ top: scrollValue, behavior: "smooth" });
			}
		})
	})
}

// ============== аккордеон №2 ==============
// если хотим, чтобы была открыта максимум одна секция
// добавляем в коллекцию все заголовки аккордиона
const accordeonTitles = document.querySelectorAll('.accordeon__title');
if (accordeonTitles.length > 0) { // если они существуют
	accordeonTitles.forEach(title => { // перебираем коллекию
		title.addEventListener('click', (event) => { // каждому элементу вешаем событие, при клике
			const currentTitle = event.target; // получаем в константу текущий заголовок, на который кликнули
			const openedTitle = document.querySelector('.accordeon__title.content-open'); // получаем открытый заголовок
			// при нажатии на заголовок, добавляем / удаляем класс
			currentTitle.classList.toggle('content-open');
			// если заголовок в статусе открыт (есть указанный класс)
			if (currentTitle.classList.contains('content-open')) {
				currentTitle.nextElementSibling.classList.add('content-show'); // отображается контент ниже заголовка
			}
			// если уже один из заголовков, уже был открыт ранее
			if (openedTitle) {
				openedTitle.classList.remove('content-open'); //забираем у него статус открытый (удаляем класс)
				openedTitle.nextElementSibling.classList.remove('content-show'); // скрываем блок с контентом, расп. за ним,
				currentTitle.classList.add('content-open'); // а текущему заголовку, добавляем статус открытый (доб. класс)
			}
			// если кликнуть на открытый ранее заголовок повторно (текущий совпадает с открытым ранее)
			if (currentTitle === openedTitle) {
				currentTitle.classList.toggle('content-open'); // переключаем статус (откр./закр.), добавляя / удаляя класс
			}
		})
	})
}

// ======================== меню бургер ===========================

const menuArrows = document.querySelectorAll('.arrow');
if (menuArrows) {
	menuArrows.forEach(arrow => {
		arrow.addEventListener('click', (e) => {
			const parentElement = e.target.closest('.header__item');
			parentElement.classList.toggle('active');
		})
	})
}

const burgerMenu = document.querySelector('.burger');
const basicMenu = document.querySelector('.header__navigation');
if (burgerMenu) {
	burgerMenu.addEventListener('click', () => {
		burgerMenu.classList.toggle('active');
		basicMenu.classList.toggle('active');
		if (burgerMenu.classList.contains('active')) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	})
}

const menuLinks = document.querySelectorAll('.anchor');
if (menuLinks) {
	menuLinks.forEach(link => {
		link.addEventListener('click', () => {
			burgerMenu.classList.remove('active');
			basicMenu.classList.remove('active');
			document.body.style.overflow = 'auto';
		})
	})
}


// ======================== Слайдер Swiper ===========================
// Инициализация Swiper
new Swiper('.gallery', {
	// Количество слайдов для показа
	slidesPerView: 3, // 'auto' // // - нужно также в сss задать автоматическую ширину,

	// Отступ между слайдами
	spaceBetween: 30,

	// Отключение функционала, если слайдов меньше, чем нужно
	watchOverflow: true,

	// Стрелки
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	// Навигация
	// Буллеты, текущее положение, прогрессбар
	pagination: {
		el: '.swiper-pagination',
		// Буллеты
		type: 'bullets',
		clickable: true,
		dynamicBullets: true,

		// Фракция
		// type: 'fraction',

		// Прогрессбар
		//type: 'progressbar',

	},
	// Скролл
	scrollbar: {
		el: '.swiper-scrollbar',
		draggable: true,
	},
	// Переключение при клике на слайд
	slideToClickedSlide: false,
	// Управление клавиатурой
	keyboard: {
		// Включить / выключить
		enable: true,
		// Включить / выключить только когда слайдер в прежелах вьюпорта
		onlyInViewport: true,
		// Включить / выключить управление клавишами pageUp, pageDown
		pageUpDown: true,
	},

	/*
	// Управление колесом мыши
	mousewheel: {
		// чувствительность колеса мыши
		sensitivity: 1,
		// класс объекта, на кот. будет срабатывать прокрутка мышью
		eventsTarget: ".gallery",
	},
	*/

	// Автовысота
	autoHeight: true,

	// Количество пролистываемых слайдов
	slidesPerGroup: 1,

	// Активный слайд по центру
	centeredSlides: false,

	// Стартовый слайд
	initialSlide: 2, // отсчет начинается с нуля

	// Мультирядность (нужно отключить автовысоту)
	slidesPerColumn: 1,

	// Бесконечный слайдер (желательно отключать скролл, мультирядность не больше 1)
	loop: true,

	// Количество дублирующих слайдов нужно вручную указать,
	loopedSlides: 2, // если используем автоматическое количество слайдов для вывода

	// Свободный режим
	freeMode: false,

	/*
	// Автопрокрутка
	autoplay: {
		// пауза между прокруткой
		delay: 1000,
		// закончить на последнем слайде
		stopOnLastSlide: false,
		// Отключить после ручного переключения
		disableOnInteraction: true,
	},
	*/

	// Скорость прокрутки
	speed: 800,

	// Выбор оси для слайдера
	direction: 'horizontal', //'vertical',

	// Эффекты переключения слайдов
	// Листание
	effect: 'slide', // по умолчанию

	/* 
	// Смена прозрачности
	effect: 'fade', // отключить скролл
	fadeEffect: {
		// Параллельная смена прозрачности
		crossFade: true,
	}
	*/
	/* 
	// Переворот
	effect: 'flip',
	flipEffect: {
		slideShadow: true, // Тень
		limitRotation: true, // Показ только активного слайда
	}
	*/
	/* 
	// Куб
	effect: 'cube',
	cubeEffect: {
		// настройки тени
		slideShadows: true,
		shadow: true,
		shadowOffset: 20,
		shadowScale: 0.94,
	}
	*/
	/* 
	effect: 'coverflow',
	coverflowEffect: {
		rotate: 20, // угол
		stretch: 50, // наложение
		slideShadows: true, // тень
	}
	*/

	// Адаптив
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		480: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 3,
		}
	},

	// Отключить предзагрузку картинок
	preloadImages: false,
	// Lazy loading (подгрузка картинок)
	lazy: {
		// подгружать на старте переключение слайда
		loadOnTransitionStart: false,
		// подгрузить предыдущую и следующую картинки
		loadPrevNext: false,
	},
	// Слежка за видимыми слайдами
	watchSlidesProgress: true,
	// Добавление класса видимым слайдам
	watchSlidesVisibility: true,

	// Увеличение
	zoom: {
		maxRatio: 2, // максимальное увеличение
		minRatio: 1, // минимальное увеличение
	},

	// Обновить свайпер при изменении элементов слайдера
	observer: true,
	// Обновить свайпер при изменении родительских элементов слайда
	observerParents: true,
	// Обновить свайпер при изменении дочерних элементов слайда
	observerSlideChildren: true,
});