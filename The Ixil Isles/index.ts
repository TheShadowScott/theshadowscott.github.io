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

includeHTML();


setTimeout(() =>
{
    const collapsibles = document.querySelectorAll('.collapse');

    collapsibles.forEach(function (collapsible) {
        // Listen for the 'show' event
        collapsible.addEventListener('show.bs.collapse', function () {
            // When a collapsible is about to be shown, hide all others
            collapsibles.forEach(function (c) {
                if (c !== collapsible) {
                    var bsCollapse = new bootstrap.Collapse(c, {toggle: false});
                    bsCollapse.hide();
                }
            });
        });
    });
}, 500)