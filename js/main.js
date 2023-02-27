// PART 1
// плавный скролл по якорям
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(navLink => {
    navLink.addEventListener('click', (event) => {
        event.preventDefault();

        smoothScroll(navLink)
    });
});

function smoothScroll(link) {
    const id = link.getAttribute('href').substring(1);
    const section = document.getElementById(id);
    
    if (section) {
        section.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
        });
    }
}

// PART2
// адаптивное меню
const body = document.querySelector('body');
const navBtn = document.querySelector('.nav-open-btn');
const nav = document.querySelector('.nav');

nav.addEventListener('click', (event) => {
    if (event.currentTarget = navBtn) {
        nav.classList.toggle('open');
        body.classList.toggle('body-no-scroll');
    } else {
        nav.classList.remove('open');
    }
});

// PART 3
// 1) фокус в секции сервис
const serviceBtns = Array.from(document.querySelectorAll('.service-btn'));
const serviceCards = Array.from(document.querySelectorAll('.service-card'));

let targets = [];

serviceBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        let category = event.target.textContent.toLowerCase();

        if (!targets.includes(category)) {
            targets.push(category);

            event.target.classList.add('active');
        } else {
            targets.splice(targets.indexOf(category), 1);
            
            event.target.classList.remove('active');
        }

        if (targets.length === 3) {
            let deleted = targets.shift();
            
            serviceBtns.forEach(btn => {
                if (btn.textContent.toLowerCase() === deleted) {
                    btn.classList.remove('active');
                } 
            });
        }

        if (targets.length === 0) {
            serviceCards.forEach(card => {
               card.classList.remove('blur'); 
            }); 
        } else {
            for (let i = 0; i < targets.length; i++) {
                serviceCards.forEach(card => {
                    if (card.dataset.category != targets[0] && card.dataset.category != targets[1]) {
                        card.classList.add('blur');
                    } else {
                        card.classList.remove('blur');
                    }
                });
            }
        }     
    });
});
// снимем фокус при клике мимо кнопок (опционально)
const serviceSection = document.querySelector('.service-section');

serviceSection.addEventListener('click', (event) => {
    if (!event.target.classList.contains('service-btn')) {
        serviceBtns.forEach(btn => {
            btn.classList.remove('active');
        });

        serviceCards.forEach(card => {
            card.classList.remove('blur');
        });

        targets.length = 0;
    }
});

// 2) аккордеон в секции prices
const pricesBtns = Array.from(document.querySelectorAll('.prices-item-btn'));

pricesBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        pricesBtns.forEach(btn => {
            if (btn != event.currentTarget) {
                btn.classList.remove('active');
                btn.parentElement.classList.remove('active');
            }
        });
        
        event.currentTarget.classList.toggle('active');
        event.currentTarget.parentElement.classList.toggle('active');
    });    
});

const orderBtns = Array.from(document.querySelectorAll('.order-btn'));

orderBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        event.preventDefault();

        smoothScroll(btn)
    });
});

// 3 селект в секции контакты
const cityWrap = document.querySelector('.contacts-city-wrap');
const cityBtn = document.querySelector('.contacts-city-btn');
const cityTxt = document.querySelector('.contacts-city-text');

cityBtn.addEventListener('click', () => {
    cityBtn.classList.toggle('active');
    cityWrap.classList.toggle('active');
});

const options = Array.from(document.querySelectorAll('.option'));
const officeCards = Array.from(document.querySelectorAll('.office-info-wrap'));
const contactsTitle = document.querySelector('.contacts-title')

options.forEach(opt => {
    opt.addEventListener('click', (event) => {
        let selectedCity = event.target.textContent;
        
        cityTxt.textContent = selectedCity;
        cityWrap.classList.add('selected');
        cityBtn.classList.remove('active');
        cityWrap.classList.remove('active');

        officeCards.forEach(card => {
            card.classList.remove('active');
        });

        document.querySelector(`[data-office="${selectedCity.toLowerCase()}"]`).classList.add('active');
    });
});

// самооценка
console.log(`
1. При нажатии на кнопки:Gargens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50
2. Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах + 50
3. В разделе contacts реализован select с выбором городов +25
`);