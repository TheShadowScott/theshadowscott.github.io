var _a, _b, _c;
const embeds = document.getElementById('embeds');
const form = document.getElementById('webhook-form');
let embed_id_counter = 0;
const post_webhook = (hook) => {
    const url = hook.url;
    const payload = hook.payload;
    // Create XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // send payload
    xhr.send(JSON.stringify(payload));
    xhr.onload = () => {
        console.log(xhr.responseText);
    };
    xhr.onerror = () => {
        console.log(xhr.responseText);
    };
};
const clearForm = (formId) => {
    const form = document.getElementById(formId);
    form.reset();
};
(_a = document.getElementById('clear-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
    e.preventDefault();
    clearForm('webhook-form');
});
(_b = document.getElementById('submit-button')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
    var _a;
    e.preventDefault();
    // makes the input fields red on invalid input
    const style = document.createElement('style');
    document.head.appendChild(style);
    (_a = style.sheet) === null || _a === void 0 ? void 0 : _a.insertRule('.input-field:invalid { border: 2px solid var(--red); }', 0);
    const form = e.target.form;
    // checks form validity (shows 'please' yada yada yada)
    if (!(form === null || form === void 0 ? void 0 : form.checkValidity())) {
        form.reportValidity();
        return;
    }
    const embeds_raw = Array.from(document.getElementsByClassName('embed-item'));
    console.info(embeds_raw);
    let embeds = [];
    embeds_raw.forEach(embed => {
        var _a, _b;
        console.info(embed);
        embeds.push({
            author: {
                name: (_a = document.getElementById('web-url')) === null || _a === void 0 ? void 0 : _a.getAttribute('value'),
                url: null,
                icon_url: (_b = document.getElementById('web-url')) === null || _b === void 0 ? void 0 : _b.getAttribute('value'),
            },
            title: embed.querySelector('input[name^="embed-title"]').value,
            url: embed.querySelector('input[name^="embed-url"]').value,
            description: embed.querySelector('textarea[name^="embed-description"]').value,
            color: parseInt(embed.querySelector('input[name^="embed-color"]').value),
            fields: null,
            thumbnail: null,
            image: null,
            footer: {
                text: document.getElementById('footer-text').value,
                icon_url: document.getElementById('footer-icon').value
            },
        });
    });
    // create webhook object
    const webhook = {
        url: document.getElementById('webhook-url').value,
        payload: {
            username: document.getElementById('author-name').value,
            avatar_url: document.getElementById('author-icon').value,
            content: document.getElementById('blob-description').value,
            embeds: embeds.length > 0 ? embeds : null,
        }
    };
    const json = JSON.stringify(webhook, null, 2);
    console.log(json);
    post_webhook(webhook);
});
function addEmbedItem(parent) {
    const div = parent.appendChild(document.createElement('div'));
    div.classList.add('embed-item');
    const h2 = document.createElement('h2');
    h2.innerHTML = 'Embed';
    div.appendChild(h2);
    const title = document.createElement('input');
    title.placeholder = 'Title';
    title.name = `embed-title-${embed_id_counter}`;
    title.required = true;
    title.classList.add('input-field');
    div.appendChild(title);
    const url = document.createElement('input');
    url.placeholder = 'URL';
    url.name = `embed-url-${embed_id_counter}`;
    url.classList.add('input-field');
    div.appendChild(url);
    const color = document.createElement('input');
    // Add "type=number" to the input field
    color.type = 'number';
    color.min = '0';
    color.max = '16777215';
    color.placeholder = 'Colour';
    color.name = `embed-color-${embed_id_counter}`;
    color.classList.add('input-field');
    div.appendChild(color);
    const description = document.createElement('textarea');
    description.placeholder = 'Description';
    description.name = `embed-description-${embed_id_counter}`;
    description.required = true;
    description.classList.add('input-field');
    div.appendChild(description);
    embed_id_counter++;
}
(_c = document.getElementById('embed-add-button')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', (e) => {
    e.preventDefault();
    if (embed_id_counter > 4)
        return;
    // addEmbedItem(document.getElementById('embeds') as HTMLElement);
    addEmbedItem(embeds);
});
