const embeds = document.getElementById('embeds') as HTMLElement;
const form = document.getElementById('webhook-form') as HTMLFormElement;
let embed_id_counter : number = 0;

type nil = null | undefined;
type n_string = string | nil;


type Webhook = {
    url: string,
    payload: { username: n_string, avatar_url: n_string, content: n_string, embeds: Embeds[] | nil},
};

type Embeds = {
    author: authorBlock,
    title: string,
    url: n_string,
    description: n_string,
    color: number,
    fields: field[] | nil,
    thumbnail: { url: string } | nil,
    image: { url: string } | nil,
    footer: { text: string, icon_url: n_string } | nil,
};

type authorBlock = {
    name: n_string,
    url: n_string,
    icon_url: n_string,

};

type field = {
    name: string,
    value: string,
    inline: boolean,
};


const post_webhook = (hook: Webhook): void =>
{
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
    }

    xhr.onerror = () => {
        console.log(xhr.responseText);
    }
};

const clearForm = (formId: string): void =>
{
    const form = document.getElementById(formId) as HTMLFormElement;
    form.reset();
}


document.getElementById('clear-button')?.addEventListener('click', (e): void =>
{
    e.preventDefault();
    clearForm('webhook-form');
});

document.getElementById('submit-button')?.addEventListener('click', (e): void =>
{
    e.preventDefault();
    // makes the input fields red on invalid input
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet?.insertRule('.input-field:invalid { border: 2px solid var(--red); }', 0);
    const form = (e.target as HTMLButtonElement).form as HTMLFormElement;

    // checks form validity (shows 'please' yada yada yada)
    if (!form?.checkValidity())
    {
        form.reportValidity();
        return;
    }

    const embeds_raw = Array.from(document.getElementsByClassName('embed-item') as HTMLCollectionOf<HTMLDivElement>);
    console.info(embeds_raw);
    let embeds: Embeds[] = [];
    embeds_raw.forEach(embed =>
    {
        console.info(embed);
        embeds.push({
            author: {
                name: document.getElementById('web-url')?.getAttribute('value') as string,
                url: null,
                icon_url: document.getElementById('web-url')?.getAttribute('value') as string,
            },
            title: (embed.querySelector('input[name^="embed-title"]') as HTMLInputElement).value,
            url: (embed.querySelector('input[name^="embed-url"]') as HTMLInputElement).value,
            description: (embed.querySelector('textarea[name^="embed-description"]') as HTMLTextAreaElement).value,
            color: parseInt((embed.querySelector('input[name^="embed-color"]') as HTMLInputElement).value),
            fields: null,
            thumbnail: null,
            image: null,
            footer: {
                text: (document.getElementById('footer-text') as HTMLInputElement).value as string,
                icon_url: (document.getElementById('footer-icon')  as HTMLInputElement).value as string
            },
        });
    });

    // create webhook object
    const webhook: Webhook = {
        url: (document.getElementById('webhook-url') as HTMLInputElement).value,
        payload: {
            username: (document.getElementById('author-name') as HTMLInputElement).value as string,
            avatar_url: (document.getElementById('author-icon') as HTMLInputElement).value as string,
            content: (document.getElementById('blob-description') as HTMLInputElement).value as string,
            embeds: embeds.length > 0 ? embeds : null,
        }
    }
    const json = JSON.stringify(webhook, null, 2);
    console.log(json);
    post_webhook(webhook);
});

function addEmbedItem(parent: HTMLElement): void
{
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

document.getElementById('embed-add-button')?.addEventListener('click', (e): void =>
{
    e.preventDefault();
    if (embed_id_counter > 4)
        return;
    // addEmbedItem(document.getElementById('embeds') as HTMLElement);
    addEmbedItem(embeds);
});