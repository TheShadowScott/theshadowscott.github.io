const quotes = document.querySelectorAll('.quotation');
const cards = document.querySelectorAll('.card');
const pages = document.querySelectorAll('.page');
const pageLinks = document.querySelectorAll('.page-link');

let active = 1;

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
/**
 * Sets visibility of all pages to hidden except for the page with the given page number
 * @param {Number} pageNum 
 * @returns {Boolean} false
 */
function setPage(pageNum) {
    var index = 1;
    pages.forEach(page => {
        if (index++ == pageNum) return;
        page.style.height = '0vh';
        page.style.visibility = 'hidden';
        page.style.display = 'none';
    });

    //setTimeout(() => {
        const page = document.querySelector(`#page${pageNum}`);
        page.style.height = 'auto';
        page.style.visibility = 'visible';
        page.style.display = 'block';
    //}, 200)

    pageLinks.forEach(link => {
        link.classList.remove('disabled-page-link');
    });
    const link = document.querySelector(`#page${pageNum}-link`);
    link.classList.add('disabled-page-link');

    active = pageNum;
    return false;
}

/**
 * Sets the page to the next page
 */
const next = () => {
    if (active == pages.length) setPage(1);
    else setPage(active + 1);
}

/**
 * Sets the page to the previous page 
 */
const prev = () => {
    if (active == 1) setPage(pages.length);
    else setPage(active - 1);
}


/**
 * @param {String} subStr 
 * @returns {Boolean} true if the string contains the given substring, false otherwise
 */
String.prototype.contains = function (subStr) {
    return this.indexOf(subStr) != -1;
}
/**
 * Locates all quotes that contain the given string
 * @param {String} string 
 * @returns {Element[]} an array of all quotes that contain the given string
 */
function locateQuote(string) {
    let retArr = [];
    let quoteArr = Array.from(quotes);

    for (let i = 0; i < quoteArr.length; i++) {
        let quote = quoteArr[i];
        if (quote.innerText.contains(string)) retArr.push(quote);
    }

    return retArr;
}