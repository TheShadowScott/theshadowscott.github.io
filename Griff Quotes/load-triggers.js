const quotes = document.querySelectorAll('.quotation');
const cards = document.querySelectorAll('.card');
const pages = document.querySelectorAll('.page');
const pageLinks = document.querySelectorAll('.page-link');
(function () {

    quotes.forEach(quote => {
        quote.innerHTML = `&ldquo;${quote.innerHTML}&rdquo;`;
    })

    cards.forEach(card => {
        card.addEventListener('click', () => {
            let quote = card.querySelector('.quotation');
            navigator.clipboard.writeText(quote.innerText);
        })
    });
    document.getElementById('randomQuote').addEventListener('click', function () { navigator.clipboard.writeText(this.innerText) });
    setPage(1);
})();

const randomQuote = () => quotes[Math.floor(Math.random() * quotes.length)]

function loadRandomQuote() {
    let random = randomQuote();
    document.getElementById('randomQuote').innerHTML = random.innerHTML;
}

function setPage(pageNum) {
    pages.forEach(page => {
        page.style.height = '0px';
        page.style.visibility = 'hidden';
    });
    const page = document.querySelector(`#page${pageNum}`);
    page.style.height = 'auto';
    page.style.visibility = 'visible';

    pageLinks.forEach(link => {
        link.classList.remove('disabled-page-link');
    });
    const link = document.querySelector(`#page${pageNum}-link`);
    link.classList.add('disabled-page-link');

    return false;
}