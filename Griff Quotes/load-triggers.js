const quotes = document.querySelectorAll('.quotation');
const cards = document.querySelectorAll('.card');
(function () {

    quotes.forEach(quote => {
        quote.innerHTML = `&ldquo;${quote.innerText}&rdquo;`;
    })

    cards.forEach(card => {
        card.addEventListener('click', () => {
            let quote = card.querySelector('.quotation');
            navigator.clipboard.writeText(quote.innerText);
        })
    });
    document.getElementById('randomQuote').addEventListener('click', function() { navigator.clipboard.writeText(this.innerText) });
})();

const randomQuote = () => quotes[Math.floor(Math.random() * quotes.length)]

function loadRandomQuote() {
    let random = randomQuote();
    document.getElementById('randomQuote').innerHTML = random.innerHTML;
}