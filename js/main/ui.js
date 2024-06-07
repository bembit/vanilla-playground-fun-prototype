document.addEventListener("DOMContentLoaded", async function() {
    function changePadding(value) {
        let customPadding = document.getElementById("content");
        let paddingIncrement = value;

        // calculate new padding for both left and right sides
        let newPadding = Math.max(0, paddingIncrement);

        customPadding.style.paddingLeft = newPadding + "px";
        customPadding.style.paddingRight = newPadding + "px";
    }

    // change font-size
    function increaseFontSize() {
        let textElement = document.getElementById("content-wrapper");
        let currentSize = parseInt(window.getComputedStyle(textElement).fontSize);
        if (currentSize >= 31) return;
        textElement.style.fontSize = (currentSize + 2) + "px";
    }

    function decreaseFontSize() {
        let textElement = document.getElementById("content-wrapper");
        let currentSize = parseInt(window.getComputedStyle(textElement).fontSize);
        if (currentSize <= 11) return;
        textElement.style.fontSize = (currentSize - 2) + "px";
    }

    document.getElementById("paddingSlider").addEventListener("input", function() {
        let value = parseInt(this.value);
        changePadding(value);
    });

    document.getElementById("increaseFontSize").addEventListener("click", function() {
        increaseFontSize();
    });

    document.getElementById("decreaseFontSize").addEventListener("click", function() {
        decreaseFontSize();
    });
    document.getElementById("enoughIsEnough").addEventListener("click", function() {
        // might rework this later
            let options = document.getElementsByClassName("interface-options")[0];
        
            if (options.style.display === "none") {
                options.style.display = "block";
            } else {
                options.style.display = "none";
                document.getElementById('enoughIsEnough').innerHTML = "Open.";
            }
    });
// DOM READY
});

// check if the user prefers dark mode
let prefersDarkColorScheme = () =>
    window &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

    console.log("prefersDarkColorScheme", prefersDarkColorScheme());
    
    if (prefersDarkColorScheme()) {
        let buttons = document.querySelectorAll("button");
        buttons.forEach(button => {
            if(button.textContent.toLowerCase() === "dark") {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });
        themeSwitch("dark");
    } else {
        themeSwitch("light");
    }

// track and highlight the current theme on buttons
function trackTheme(theme) {
    let buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        if(button.textContent.toLowerCase() === theme) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
}

// themes
function themeSwitch(theme) {
    let root = document.documentElement;
    switch(theme) {
        case "light":
            root.style.setProperty("--text-primary", "var(--text-primary-light)");
            root.style.setProperty("--text-secondary", "var(--text-secondary-light)");
            root.style.setProperty("--background-primary", "var(--background-primary-light)");
            root.style.setProperty("--background-primary-opacity", "var(--background-primary-light-opacity)");
            root.style.setProperty("--secondary", "var(--secondary-light)");
            root.style.setProperty("--secondary-opacity", "var(--secondary-light-opacity)");
            root.style.setProperty("--tertiary", "var(--tertiary-light)");
            break;
        case "dark":
            root.style.setProperty("--text-primary", "var(--text-primary-dark)");
            root.style.setProperty("--text-secondary", "var(--text-secondary-dark)");
            root.style.setProperty("--background-primary", "var(--background-primary-dark)");
            root.style.setProperty("--background-primary-opacity", "var(--background-primary-dark-opacity)");
            root.style.setProperty("--secondary", "var(--secondary-dark)");
            root.style.setProperty("--secondary-opacity", "var(--secondary-dark-opacity)");
            root.style.setProperty("--tertiary", "var(--tertiary-dark)");
            break;
        case "babe":
            root.style.setProperty("--text-primary", "var(--text-primary-babe)");
            root.style.setProperty("--text-secondary", "var(--text-secondary-babe)");
            root.style.setProperty("--background-primary", "var(--background-primary-babe)");
            root.style.setProperty("--background-primary-opacity", "var(--background-primary-babe-opacity)");
            root.style.setProperty("--secondary", "var(--secondary-babe)");
            root.style.setProperty("--secondary-opacity", "var(--secondary-babe-opacity)");
            root.style.setProperty("--tertiary", "var(--tertiary-babe)");
            break;
        case "pastel":
            root.style.setProperty("--text-primary", "var(--text-primary-pastel)");
            root.style.setProperty("--text-secondary", "var(--text-secondary-pastel)");
            root.style.setProperty("--background-primary", "var(--background-primary-pastel)");
            root.style.setProperty("--background-primary-opacity", "var(--background-primary-pastel-opacity)");
            root.style.setProperty("--secondary", "var(--secondary-pastel)");
            root.style.setProperty("--secondary-opacity", "var(--secondary-pastel-opacity)");
            root.style.setProperty("--tertiary", "var(--tertiary-pastel)");
            break;
        case "pretty":
            root.style.setProperty("--text-primary", "var(--text-primary-pretty)");
            root.style.setProperty("--text-secondary", "var(--text-secondary-pretty)");
            root.style.setProperty("--background-primary", "var(--background-primary-pretty)");
            root.style.setProperty("--background-primary-opacity", "var(--background-primary-pretty-opacity)");
            root.style.setProperty("--secondary", "var(--secondary-pretty)");
            root.style.setProperty("--secondary-opacity", "var(--secondary-pretty-opacity)");
            root.style.setProperty("--tertiary", "var(--tertiary-pretty)");
            break;
        case "corpo":
            root.style.setProperty("--text-primary", "var(--text-primary-corpo)");
            root.style.setProperty("--text-secondary", "var(--text-secondary-corpo)");
            root.style.setProperty("--background-primary", "var(--background-primary-corpo)");
            root.style.setProperty("--background-primary-opacity", "var(--background-primary-corpo-opacity)");
            root.style.setProperty("--secondary", "var(--secondary-corpo)");
            root.style.setProperty("--secondary-opacity", "var(--secondary-corpo-opacity)");
            root.style.setProperty("--tertiary", "var(--tertiary-corpo)");
            break;
        case "hacky":
            root.style.setProperty("--text-primary", "var(--text-primary-hacky)");
            root.style.setProperty("--text-secondary", "var(--text-secondary-hacky)");
            root.style.setProperty("--background-primary", "var(--background-primary-hacky)");
            root.style.setProperty("--background-primary-opacity", "var(--background-primary-hacky-opacity)");
            root.style.setProperty("--secondary", "var(--secondary-hacky)");
            root.style.setProperty("--secondary-opacity", "var(--secondary-hacky-opacity)");
            root.style.setProperty("--tertiary", "var(--tertiary-hacky)");
            break;
        default:
            console.error("Unknown theme:", theme);
            break;
    }
}

// does the job.
function toggleElement(targetElement, toggleIconId, options) {
    let element = document.querySelector(targetElement);
    let toggleIcon = document.getElementById(toggleIconId);
    let main = document.querySelector("main");
    let nav = document.querySelector("nav");
    let aside = document.querySelector("aside");
    let article = document.querySelector("article");
    let header = document.querySelector("header");
    let isHidden = element.classList.contains("hide");
    let isHeaderSticky = window.getComputedStyle(header).position === 'sticky';
    let visualControls = document.getElementsByClassName("visual-controls");

    if (element.classList.contains("hide")) {
        element.classList.remove("hide");
        element.classList.add("show");
        element.style.display = options.setDisplay;

        if (options.width) {
            element.style.width = options.width;
        }
        if (options.height) {
            element.style.height = options.height;
        }
        if (options.margin) {
            // check if header is sticky, if it is, set the margin to 0
            if (isHeaderSticky) {
                main.style[options.marginProperty] = "0";
                // check the mains margin property and set it to nav width because we just set the margin to 0 which is uncool
                main.style[options.marginPropertyLeft] = "var(--nav-width)";
                console.log(main.style[options.marginPropertyLeft]);
            } else {
                main.style[options.marginProperty] = options.margin;
            }
        }
        if (options.resetHeaderMargin) {
            header.style[options.marginProperty] = options.resetHeaderMargin;
            header.style.width = "calc(100% - var(--nav-width))";
        }
        if (options.visualControl) {
            console.log(options.visualControl);
            header.style[options.visualControl] = visualControls;
        }
    } else {
        element.classList.remove("show");
        element.classList.add("hide");
        if (options.width) {
            element.style.width = "0";
        }
        // check if width or height is set eg.: for header, if not, set to 0
        if (options.height) {
            element.style.height = "0";
        }
        element.style.display = "none";

        main.style[options.marginProperty] = "0";
    }

    if (!isHidden && options.removeHeaderMargin) {
        header.style[options.marginProperty] = options.removeHeaderMargin;
        header.style.width = "100%";
    }

    let isHiddenCondition = nav.classList.contains("hide") || aside.classList.contains("hide");
    if (!isHiddenCondition) {
        article.style.flexBasis = "75%";
    } else {
        article.style.flexBasis = "100%";
    }
    let isFullScreen = nav.classList.contains("hide") && aside.classList.contains("hide") && header.classList.contains("hide"); 
    if (isFullScreen) {
        document.getElementById("toggleFullscreen").style.display = "flex";
        main.style.paddingLeft = "200px";
        main.style.paddingRight = "200px";
    } else {
        main.style.paddingLeft = "0px";
        main.style.paddingRight = "0px";
    }
}

function toggleNav() {
    toggleElement(
        "nav",
        "toggleNav",
        {
            setDisplay: "flex",
            width: "var(--nav-width)",
            margin: "var(--nav-width)",
            // check the dupe margin property, marginPropertyLeft part is hacky
            marginProperty: "marginLeft",
            marginPropertyLeft: "marginLeft",
            removeHeaderMargin: "0px",
            resetHeaderMargin: "var(--nav-width)",
        }
    );
}

function toggleHeader() {
    toggleElement(
        "header",
        "toggleHeader",
        {
            setDisplay: "flex",
            height: "var(--header-height)",
            margin: "var(--header-height)",
            marginProperty: "marginTop",
            visualControl: "var(--header-height)",
        }
    );
}

function toggleAside() {
    toggleElement(
        "aside",
        "toggleAside",
        {
            setDisplay: "flex",
            width: "auto",
        }
    );
}

function toggleProfile() {
    toggleElement(
        ".profile",
        "toggleProfile",
        {
            setDisplay: "flex",
            width: "auto",
        }
    );
}

// very elegant
function toggleFullscreen() {
    let isNavHidden = document.querySelector("nav").classList.contains("hide");
    let isAsideHidden = document.querySelector("aside").classList.contains("hide");
    let isHeaderHidden = document.querySelector("header").classList.contains("hide");
    
    switch (true) {
        case isNavHidden && isAsideHidden && isHeaderHidden:
            toggleHeader(); 
            toggleAside(); 
            toggleNav();
            break;
        case isNavHidden && isAsideHidden:
            toggleHeader();
            break;
        case isNavHidden && isHeaderHidden:
            toggleAside();
            break;
        case isAsideHidden && isHeaderHidden:
            toggleNav();
            break;
        case isNavHidden:
            toggleHeader(); 
            toggleAside(); 
            break;
        case isAsideHidden:
            toggleNav();
            toggleHeader();
            break;
        case isHeaderHidden:
            toggleNav();
            toggleAside();
            break;
        default:
            toggleHeader(); 
            toggleAside(); 
            toggleNav();
            break;
    }
}

// when the header comes back to the dom as a sticky element, the main's margin-top should be 0
function toggleStickyNav() {
    let header = document.querySelector('header');
    let isChecked = document.getElementById('toggleStickyNav').checked;
    let main = document.querySelector('main');

    if (isChecked) {
        header.style.position = 'sticky';
        main.style.marginTop = '0';
        header.style.backgroundColor = 'var(--secondary)';
        header.style.zIndex = '100';
        header.style.borderTopRightRadius = '0px';
        header.style.borderTopLeftRadius = '0px';
        header.style.borderBottom = "3px solid var(--tertiary)";
    } else {
        header.style.position = 'absolute';
        header.style.backgroundColor = 'transparent';
        header.style.zIndex = '0';
        main.style.marginTop = 'var(--header-height)';
        header.style.borderRadius = '25px';
        header.style.borderBottom = "none";
    }
}

// show hide mobile only
function toggleMobileNav() {
    let nav = document.querySelector("nav");

    if (nav.style.display === "none") {
        nav.style.display = "block";
    } else {
        nav.style.display = "none";
    }
}
