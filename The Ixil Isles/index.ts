type nullable<T> = undefined | null | T;

type service = "Compulsory" | "Voluntary" | "None";

function includeHTML()
{
    let z: string | any[] | HTMLCollectionOf<Element>,
        i: number, element: Element, file: string, xhttp: XMLHttpRequest;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++)
    {
        element = z[i];
        file = element.getAttribute("include-html");
        if (file)
        {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function ()
            {
                if (this.readyState == 4)
                {
                    if (this.status == 200) {element.innerHTML = this.responseText;}
                    if (this.status == 404) {element.innerHTML = "Page not found.";}
                    /* Remove the attribute, and call this function once more: */
                    element.removeAttribute("include-html");
                    includeHTML();
                }
            };
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}

function createNationDisplayBlock(element: HTMLDivElement, name: string, population: number,
    headOfState: string, capital: string, headOfGovernment: nullable<string>,
    govType: string, highCrimes: Array<string>, military: service, found: string, religion: string)
{
    let xhttp: XMLHttpRequest = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState === 4)
        {
            if (this.status === 200)
            {
                // cast response text to HTML because XMLResponse DOESNT FUCKING WORK
                let parser = new DOMParser();
                let htmlDoc = parser.parseFromString(this.responseText, 'text/html');
                if (htmlDoc === null) { return; }
                (htmlDoc.getElementById("nation-name") as HTMLElement).innerText = name;
                (htmlDoc.getElementById("population") as HTMLElement).innerText = `~${population.toLocaleString("en-UK")}`;
                (htmlDoc.getElementById("head-state") as HTMLElement).innerText = headOfState;
                (htmlDoc.getElementById("capital") as HTMLElement).innerText = capital;
                (htmlDoc.getElementById("head-gov") as HTMLElement).innerText = headOfGovernment ?? "N/A";
                (htmlDoc.getElementById("government-type") as HTMLElement).innerText = govType;
                (htmlDoc.getElementById("high-crimes") as HTMLElement).innerHTML = highCrimes.join(", ");
                (htmlDoc.getElementById("military") as HTMLElement).innerText = military;
                (htmlDoc.getElementById("founding") as HTMLElement).innerText = found;
                (htmlDoc.getElementById("religion") as HTMLElement).innerHTML = religion;
                element.appendChild(htmlDoc.body);
            }
            else { element.innerHTML = "Page not found."; }
        }
    };
    xhttp.open("GET", "/The%20Ixil%20Isles/Nations/NationStatblock.tbl.html", true);
    xhttp.send();
}

includeHTML();


setTimeout(() =>
{
    const collapsibles = document.querySelectorAll('.collapse');
    collapsibles.forEach(function (collapsible)
    {
        // Listen for the 'show' event
        collapsible.addEventListener('show.bs.collapse', function ()
        {
            // When a collapsible is about to be shown, hide all others
            collapsibles.forEach(function (c : Element)
            {
                if (c !== collapsible)
                {
                    var bsCollapse = new bootstrap.Collapse(c, { toggle: false });
                    bsCollapse.hide();
                }
            });
        });
    });
}, 100);


document.addEventListener('DOMContentLoaded', function ()
{
    setTimeout(() =>
    {
        // Get the collapsible elements
        var factionsCollapse = document.querySelector('#factions-collapse');
        var locationsCollapse = document.querySelector('#locations-collapse');
        var minorCollapse = document.querySelector('#minor-collapse'); // Added this line

        // If the stored state exists, apply it
        if (localStorage.getItem('factionsCollapse') === 'show') {
            new bootstrap.Collapse(factionsCollapse, {toggle: false}).show();
        }
        if (localStorage.getItem('locationsCollapse') === 'show') {
            new bootstrap.Collapse(locationsCollapse, {toggle: false}).show();
        }
        if (localStorage.getItem('minorCollapse') === 'show') { // Added this block
            new bootstrap.Collapse(minorCollapse, {toggle: false}).show();
        }

        // When a collapsible is shown or hidden, store its state
        factionsCollapse.addEventListener('show.bs.collapse', function () {
            localStorage.setItem('factionsCollapse', 'show');
        });
        factionsCollapse.addEventListener('hide.bs.collapse', function () {
            localStorage.setItem('factionsCollapse', 'hide');
        });
        locationsCollapse.addEventListener('show.bs.collapse', function () {
            localStorage.setItem('locationsCollapse', 'show');
        });
        locationsCollapse.addEventListener('hide.bs.collapse', function () {
            localStorage.setItem('locationsCollapse', 'hide');
        });
        minorCollapse.addEventListener('show.bs.collapse', function () { // Added this block
            localStorage.setItem('minorCollapse', 'show');
        });
        minorCollapse.addEventListener('hide.bs.collapse', function () { // Added this block
            localStorage.setItem('minorCollapse', 'hide');
        });
    }, 150)
});