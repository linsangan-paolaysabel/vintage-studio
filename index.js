function scrollHeader() {
    const header = document.getElementById('header');
    // when the scroll is greater than 80 viewport height, add the scroll-header class to header tag
    if (this.scrollY >= 80) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
    adjustHeaderBackground(); // Call this to adjust the header background color
}

function adjustHeaderBackground() {
    const header = document.getElementById('header');
    const homeSection = document.getElementById('home');
    const homeStyle = window.getComputedStyle(homeSection);
    const homeBackgroundColor = homeStyle.backgroundColor;

    // Change header color based on content's background color
    if (homeBackgroundColor === 'rgb(0, 0, 0)') { // Black
        header.style.backgroundColor = 'gray';
    } else if (homeBackgroundColor === 'rgb(169, 169, 169)') { // Gray
        header.style.backgroundColor = 'black';
    } else {
        header.style.backgroundColor = 'black'; // Fallback color
    }
}

window.addEventListener('scroll', scrollHeader);

/*========================================== SHOW SCROLL UP ============================================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // when the scroll is greater than 80 viewport height, add the show-scroll class to scroll-top class
    if (this.scrollY >= 80) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', scrollUp);

/*========================================== ABOUT TABS ================================================*/
const tabs = document.querySelectorAll('[data-target]'),
    tabContent = document.querySelectorAll('[data-content]');

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);
        
        tabContent.forEach((content) => {
            content.classList.remove('tab_active');
        });

        target.classList.add('tab_active');

        tabs.forEach((t) => {
            t.classList.remove('tab_active');
        });

        tab.classList.add('tab_active');
    });
});

/*========================================== CONTACT FORM =============================================*/
const contactForm = document.getElementById('contact-form');
const contactName = document.getElementById('contact-name');
const contactEmail = document.getElementById('contact-email');
const contactSubject = document.getElementById('contact-subject');
const contactMessage = document.getElementById('contact-message');
const errorMessage = document.getElementById('error-message');

const sendEmail = (e) => {
    e.preventDefault();

    // check if the field has a value
    if (
        contactName.value === '' || 
        contactEmail.value === '' || 
        contactSubject.value === '' || 
        contactMessage.value. === ''
    ) {
        // show message
        errorMessage.textContent = 'Please fill in all the fields.';
    } else {
        //serviceID - templateID - #form - publickey
        emailjs.sendForm(
            'service_24my88b',
            'template_h6f3lji',
            '#contact-form',
            'NPXa0ltuUq5TzKRyF'
        ).then(() => {
            // show message and add color, window + dot to open emoji
            errorMessage.classList.add('color-first');
            errorMessage.textContent = 'Message sent successfully ';

            //remove message after 5 seconds
            setTimeout(() => {
                errorMessage.textContent = '';
            }, 5000);
        },
        (error) => {
                alert('Oops! Something went wrong...... ', error);
            }
        );

    // clear input fields
    contactName.value = '';
    contactEmail.value = '';
    contactSubject.value = '';
    contactMessage.value = '';
    }
};

contactForm.addEventListener('submit', sendEmail);