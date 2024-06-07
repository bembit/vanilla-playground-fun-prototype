// handle view update offsethight to top

// 1. initialize the static routes
// 2. fetch routes from the list.html
// 3. add all static and dynamic routes, add evenetlisteners
// 4. dress the anchors with eventlisteners after each component swap, and fire the navigation logic on click 
// 5. handle the browsers back button popstate event
// 6. navigation logic
// 7. fetch the content
// 8. parse the content and set relevant article / aside content
// 9. trim the first 4 current meta and title tags, and add them from new html
// 10. update the url
// 11. backbutton to interface when not on the homepage

// debug colors for console.log
let outputColor = "color:green; font-size:20px;"
let outputColor2 = "color:red; font-size:20px;"
let outputColor3 = "color:yellow; font-size:20px;"

// 1. initialize the static routes
const routes = {
    "/": "Home",
    "/index.html": "Home",
    "/components/main/about.html": "About",
    "/components/main/404.html": "404",
};

// 2. fetch routes from the list.html
async function getRoutesFromList() {
    try {
        const response = await fetch("/components/articles/articles-list.html");
        if (!response.ok) {
            throw new Error("Error fetching main HTML: response not ok");
        }

        let htmlText = await response.text();
        if (!htmlText) {
            throw new Error("Error fetching main HTML: empty response");
        }
        const parser = new DOMParser();
        const mainDOM = parser.parseFromString(htmlText, "text/html");

        mainDOM.querySelectorAll("a.content-preview").forEach(anchor => {
            const path = anchor.getAttribute('href');
            routes[path] = "article";
        });
        
    console.log(routes);
    } catch (error) {
        console.error("Error fetching test content:", error);
    }
}

// 3. add all static and dynamic routes, add evenetlisteners
window.addEventListener('load', async function() {
    await getRoutesFromList();
    handleEvenetListeners();
    renderBackButton();
    // this is a onetime load evenetlistener
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const path = this.getAttribute('href');
            console.log('%c handleEvenetListeners() - Clicked, fires navigateToRoute()', outputColor, path);

            navigateToRoute(path); 
        });
    });
        document.querySelector('#search').addEventListener('input', function() {
        const keyword = this.value;
        searchArticles(keyword);
    });
});

// 4. dress the anchors with eventlisteners after each component swap, and fire the navigation logic on click 
function handleEvenetListeners() {
    document.querySelectorAll('a.content-preview').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const path = this.getAttribute('href');
            console.log('%c handleEvenetListeners() - Clicked, fires navigateToRoute()', outputColor, path);
            navigateToRoute(path); 
        });
    });
}

// 5. handle the browsers back button popstate event
window.addEventListener('popstate', function() {
    console.log("%c POPSTATE windowseventlistener: Back button pressed fires navigateToRoute()", outputColor2);
    const path = window.location.pathname;
    console.log(path);
    // move to "/"
    navigateToRoute("/");
    console.log(history.length);
});

// 6. navigation logic
function navigateToRoute(path) {
    const route = routes[path];
    console.log("%c -----------", outputColor2, route); 
    // fetch if not undefined
    if (route !== undefined) {
        fetchContent(path);
        console.log("%c Navigating to:", outputColor2, path);
        console.log("%cwindow.location.href", outputColor2, window.location.href);
    // I'll handle a 404 later
    } else {
        console.log("Route not found / undefined");
        console.log(window.location.href); 
        console.log(window.location); 
    }
}

// 7. fetch the content
async function fetchContent(path) {
    const response = await fetch(path);
    const content = await response.text();
    console.log("%c Fetched content for:", outputColor3, path);

    setHeadTags(content);

    renderContent(content);

    updateURL(path);
    // move to html
    renderBackButton();
    
    handleEvenetListeners();

    // scroll to top after content is rendered
    document.body.scrollTop = document.querySelector("header");
    document.documentElement.scrollTop = document.querySelector("header");

    console.log("%cwindow.location.href", outputColor, window.location.href);
    console.log("%cwindow.location", outputColor3, window.location);

}

// 8. parse the content and set relevant article / aside content
function renderContent(content) {
    let parser = new DOMParser();
    let mainDOM = parser.parseFromString(content, "text/html").querySelector("html");
    let articleHtml = mainDOM.querySelector("article").innerHTML;
    let asideHtml = mainDOM.querySelector("aside").innerHTML;

    document.querySelector("article").innerHTML = articleHtml;
    document.querySelector("aside").innerHTML = asideHtml;
}

// 9. trim the first 4 current meta and title tags, and add them from new html
function setHeadTags(content) {
    let currentHead = document.head;
    let existingHeadChildren = Array.from(currentHead.children);

    existingHeadChildren.slice(0, 4).forEach(child => child.remove());

    let parser = new DOMParser();
    let mainDOM = parser.parseFromString(content, "text/html").querySelector("html");
    let headMeta = mainDOM.querySelector("head");

    const headChildren = Array.from(headMeta.children).slice(0, 4);
    console.log("headChildren", headChildren);
    headChildren.forEach(tag => currentHead.prepend(tag.cloneNode(true)));
}

// 10. update the url
function updateURL(path) {
    if (path === "/" || path === "/index.html") {
        history.replaceState(routes, "", "/");
        console.log("replaced history:", path);
    } else {
        history.pushState({}, "", path);
        console.log("added to history:", path);
    }
    console.log(routes);
}

// a temp temp solution I never really cared about
// 11. backbutton to interface when not on the homepage
const backButton = document.createElement('a');
backButton.classList.add('back-button');
backButton.setAttribute('href', '/');
backButton.innerHTML = '<i class="fas fa-arrow-left"></i>';
backButton.style.display = "none";
backButton.addEventListener('click', function(event) {
    event.preventDefault();
    window.history.back();
    console.log("%c RENDERED Back button clicked", outputColor2);
});

document.querySelector('main').prepend(backButton);
console.log("Back button rendered");
console.log(window.location.pathname);
console.log(routes);

function renderBackButton() {
    if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
        backButton.style.display = "none";
        console.log("Back button hidden");
    } else {
        backButton.style.display = "flex";
    }
}

// search hack

// so either spend years figuring out search and routing together or just put the bar in the main

async function searchArticles(keyword) {
    if (keyword.length >= 3) {
        try {
            const response = await fetch("/components/articles/articles-list.html");
            if (!response.ok) {
                throw new Error("Error fetching main HTML: response not ok");
            }
    
            let htmlText = await response.text();
            if (!htmlText) {
                throw new Error("Error fetching main HTML: empty response");
            }
            const parser = new DOMParser();
            const mainDOM = parser.parseFromString(htmlText, "text/html");
    
            const results = [];
            mainDOM.querySelectorAll("a.content-preview").forEach(anchor => {
                const path = anchor.getAttribute('href');
                const title = anchor.textContent;
                // console.log(title, path)
                if (title.toLowerCase().includes(keyword.toLowerCase())) {
                    results.push({ path, title });
                    console.log("%c -----------", this.outputColor, results[0]);
                }
            });
            // return results;
            renderSearchResults(results);
        } catch (error) {
            console.error("Error searching articles:", error);
            return [];
        }
    }
    return [];
}

function renderSearchResults(results) {
    const searchResultsContainer = document.querySelector('#search-results');
    searchResultsContainer.innerHTML = '';

    if (results.length === 0) {
        searchResultsContainer.innerHTML = '<h4>No results found.</h4>';
        return;
    }

    const resultList = document.createElement('ul');
    results.forEach(result => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.classList.add('content-preview');
        link.textContent = result.title;
        link.href = result.path;
        listItem.appendChild(link);
        resultList.appendChild(listItem);
    });
    searchResultsContainer.appendChild(resultList);
    handleEventListeners();
}

function clearSearchResults() {
    const searchResultsContainer = document.querySelector('#search-results');
    searchResultsContainer.innerHTML = '';
}

function handleEventListeners() {
    document.querySelectorAll('a.content-preview').forEach(anchor => {
        anchor.addEventListener('click', event => {
            event.preventDefault();
            const path = anchor.getAttribute('href');
            console.log('%c handleEventListeners() - Clicked, fires navigateToRoute()', outputColor, path);
            navigateToRoute(path);
            // clear the search input field
            document.querySelector('#search').value = '';
            clearSearchResults();
        });
    });
}

// multifetch part
// refactor above to a loop
// async function fetchMainComponents() {
//     const components = [
//         { selector: "nav", url: "/components/nav.html" },
//         { selector: "header", url: "/components/header.html" },
//         { selector: "article", url: "/components/main/article.html" },
//         { selector: "aside", url: "/components/aside.html" }
//     ];

//     for (let component of components) {
//         try {
//             const response = await fetch(component.url);
//             if (!response.ok) {
//                 throw new Error(`Error fetching ${component.selector}: response not ok`);
//             }
//             const htmlText = await response.text();
//             if (!htmlText) {
//                 throw new Error(`Error fetching ${component.selector}: empty response`);
//             }
//             document.querySelector(component.selector).innerHTML = htmlText;
//         } catch (error) {
//             console.error(`Error fetching ${component.selector}:`, error);
//         }
//     }
// }
