const inputWord = document.getElementById('inputWord');
const wordOfTheDayContainer = document.getElementById('wotd_container');

function deactivate(dictionary) {
    var dictionaryLogo = document.getElementById(dictionary.concat('-button'))
    dictionaryLogo.classList.toggle("greyscale")

    var dictionaryOutput = document.getElementById(dictionary.concat('-output'))
    dictionaryOutput.classList.toggle("hidden")
}

function ToggleLogos() {
    const buttons = document.querySelectorAll('#dictionaries button');
    const results = document.querySelectorAll('#results li');

    if (Array.from(buttons).some(x => x.classList.contains('greyscale'))) {

        buttons.forEach((button) => {
            button.classList.remove('greyscale');
        });

        results.forEach((result) => {
            result.classList.remove('hidden');
        });
    }

    else if (Array.from(buttons).every(x => !x.classList.contains('greyscale'))) {

        buttons.forEach((button) => {
            button.classList.add('greyscale');
        });

        results.forEach((result) => {
            result.classList.add('hidden');
        });
    }
}

function getResults() {

    document.getElementById('Meriam-Webster-output').getElementsByTagName('h6')[0].innerHTML = 'Merriam-Webster';
    getResultsFromMeriamWebster();

    document.getElementById('Wiktionary-output').getElementsByTagName('h6')[0].innerHTML = 'Wiktionary';
    getResultsFromWiktionary();

    document.getElementById('Urban-output').getElementsByTagName('h6')[0].innerHTML = 'Urban';
    getResultsFromUrban();

    // document.getElementById('results').scrollIntoView()
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        getResults();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (element) {
        return new bootstrap.Tooltip(element);
    });


    var inputField = document.querySelector('.form-control');
    inputField.addEventListener('input', function () {
        tooltipList.forEach(function (tooltip) {
            tooltip.hide();
        });
    });

    getWordOfTheDay();
});

// adjusts darkmode when loading the page
function adjustDarkModeToFlag() {
    let darkModeFlag = localStorage.getItem('dark') === 'true';
    let body = document.getElementsByTagName('body')[0];
    if (body.classList.contains('dark') !== darkModeFlag) {
        toggleDarkModeClasses();
    }
}

function toggleDarkMode() {
    let darkModeFlag = localStorage.getItem('dark') === 'true';
    darkModeFlag = !darkModeFlag;
    localStorage.setItem('dark', darkModeFlag);
    toggleDarkModeClasses();
}

function toggleDarkModeClasses() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.toggle('dark');

    const elements = document.querySelectorAll('article, .underNav, thead th');
    for (let el of elements) { el.classList.toggle('dark'); }

    const dictionary = document.querySelectorAll('#dict-description');
    for (let el of dictionary) { el.classList.toggle('bg-primary'); }

    const contactActive = document.querySelectorAll('tbody tr:first-child, tbody tr:nth-child(4)');
    for (let el of contactActive) {
        el.classList.toggle('table-primary');
        el.classList.toggle('table-active');
    }

    const contactLight = document.querySelectorAll('tbody tr:nth-child(2)');
    for (let el of contactLight) {
        el.classList.toggle('table-primary');
        el.classList.toggle('table-light');
    }

    const cardBorder = document.getElementsByClassName('card');
    for (let el of cardBorder) {
        el.classList.toggle('border-primary');
        el.classList.toggle('border-warning');
    }

    const darkmodeButton = document.getElementsByClassName('darkmode_button');
    for (let el of darkmodeButton) {
        el.classList.toggle('toDark');
        el.classList.toggle('toLight');
    }

    const moon = document.getElementsByClassName('fa-moon');
    for (let el of moon) {
        el.classList.toggle('lightmode');
        el.classList.toggle('darkmode');
    }
}

function getResultsFromMeriamWebster() {

    document.getElementById('Meriam-Webster-output').getElementsByTagName('p')[0].innerHTML = "";

    let wordVal = inputWord.value;
    if(wordVal === '') {
        document.getElementById('Meriam-Webster-output').getElementsByTagName('p')[0].innerHTML += "The word you're looking for is not in this dictionary."
    }
    let url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${wordVal}?key=d49265f5-c895-4871-bcb3-e38010cfdb7f`

    let MW_results = ''

    fetch(url)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        if (Array.isArray(response) && typeof response[0] === 'string') {

            document.getElementById('Meriam-Webster-output').getElementsByTagName('p')[0].innerHTML += '<span style="color:#808080; font-weight: bolder; font-size:smaller">' + "Did you mean:<br>";
            for (let i0 = 0; i0 < response.length; i0++) {
                document.getElementById('Meriam-Webster-output').getElementsByTagName('p')[0].innerHTML += '<i><span style="color:#76B900; font-weight: bolder">' + response[i0] + '</span></i><br>';
                document.getElementById('results').scrollIntoView()
            }
        }
        else if (Array.isArray(response) && response.length === 0) {

            document.getElementById('Meriam-Webster-output').getElementsByTagName('p')[0].innerHTML += "The word you're looking for is not in this dictionary."
        }
        else {
            for (let i1 = 0; i1 < response.length; i1++) {
                // && response[i1].id.includes(word)
                if (response[i1].hwi.hw) {
                    // console.log(response[i1].hwi.hw.replace(/\*/g,''))    //logs lexeme
                    MW_results += '<br>'
                    MW_results += '<b><span style="color:#76B900; font-weight: bolder; font-size:larger">' + response[i1].hwi.hw.replace(/\*/g, '') + '</span>' + ' '
                }
                if (response[i1].hom) {
                    // console.log(response[i1].hom)   //logs Entry No.
                    MW_results += '<b><span style="font-weight: bolder; font-size: smaller">' + response[i1].hom + '</span>' + ' '
                }
                if (response[i1].fl) {
                    // console.log(response[i1].fl)    //logs POS
                    MW_results += '<i><span style="color:#808080; font-size:larger">' + response[i1].fl + '</span></i>' + '<br>'
                }
                if (response[i1].ins) {
                    for (const item1 of response[i1].ins) {
                        if (item1.il) {
                            // console.log(item1.il);  // "plural"
                            MW_results += '<span style="color:darkorange; font-size: smaller">' + item1.il + '</span>' + ' '
                        }
                        if (item1.if) {
                            // console.log(item1.if);   //verb forms, plural form
                            MW_results += '<span style=font-size:smaller>' + item1.if.replace(/\*/g, '') + '</span>' + '<br>'
                        }
                    }
                }
                if (response[i1].def) {
                    for (const item2 of response[i1].def) {
                        if (item2.vd) {
                            // console.log(item2.vd); //transitivity
                            MW_results += '<br>' + '<span style=color:#808080>' + item2.vd + '</span>' + '<br>'
                        }
                        if (item2.sls) {
                            // console.log(item2.sls[0]);  // logs sls, e.g.: archaic / chiefly British
                            MW_results += '<br>' + '<span style=color:#808080>' + item2.sls + '</span>' +'<br>'
                        }
                        if (item2.sseq) {
                            for (let i_sense = 0; i_sense < response[i1].def[0].sseq.length; i_sense++) {
                                // console.log(response[i1].def[0].sseq[i_sense]);
                                for (const sense_item of response[i1].def[0].sseq[i_sense]) {
                                    let definition_str = JSON.stringify(sense_item);
                                    // console.log(definition_str)
                                    const defRe = /("sn":"[\(\d\w\s\)]+)(?:",)(?:"sls":\[")(.*?)(?:"\]\})|("sn":"[\(\d\w\s\)]+)(?:",)(?:"sls":\[")(.*?)(?:"\],"dt")(?:.*{bc})(.*?)(?:"\])|("sn":"[\(\d\w\s\)]+)(?:","dt":.*?{bc})(.*?)(?:"\])|("sn":"[\(\d\w\s\)]+)(?:.*?)(?:"dt":.*?"{bc})(.*?)(?:"\])/g;
                                    let defMatch;
                                    while ((defMatch = defRe.exec(definition_str))) {
                                        // console.log(defMatch)
                                        if (defMatch && defMatch.length > 0) {
                                            for (let i = 1; i < defMatch.length; i++) {
                                                let definition = defMatch[i];
                                                // console.log(definition);
                                                const cleanDefRe = /sx\||\{dx_def\}|dxt\||\{\/dx_def\}|\{dx\}|\{\/dx\}|d_link\||a_link\||i_link\||et_link\|/g;
                                                const spaceDefRe = /\|\|/g;
                                                const breakDefRe = /\{bc\}/g;
                                                const italicsLDefRe = /\{it\}/g
                                                const italicsRDefRe = /\{\/it\}/g
                                                const stylisedSn = /"sn":"([\(\d\w\s\)]+)/g
                                                // const styleGreenReference  = /\{([\w\n\s]+)\}|\{([\w\n\s]+)|([\w\n\s]+)\}/g
                                                const styleGreenReference  = /\{([\w\n\s]+)\}|\{([\w\n\s]+)\|([\w\n\s]+)\}/g
                                                if (definition) {
                                                    let cleanedDefinition = definition.replace(cleanDefRe, '').replace(spaceDefRe, ' ').replace(breakDefRe, '\n').replace(italicsLDefRe, '<it>').replace(italicsRDefRe, '</it>').replace(stylisedSn, '<span style="position: relative; left: -40px; top:25px;color:darkorange">$1</span>').replace(styleGreenReference, '<span style="color:#76B900">$1</span>');
                                                    // console.log(cleanedDefinition)
                                                    MW_results += '<span style="padding-left: 20px; font-weight: normal">' + cleanedDefinition + '</span>' + '<br>'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // console.log(MW_results)
            document.getElementById('Meriam-Webster-output').getElementsByTagName('p')[0].innerHTML = MW_results;
            document.getElementById('results').scrollIntoView()
        }
    })
};

function getResultsFromWiktionary() {

    document.getElementById('Wiktionary-output').getElementsByTagName('p')[0].innerHTML = "<br>";

    let wordVal = inputWord.value;

    if(wordVal === ''|| wordVal.trim() === "") {
        setEmptyAlertInWiktionary()
    }

    const url = 'https://en.wiktionary.org/w/api.php?origin=*&action=query&format=json&prop=extracts&exsectionformat=plain&titles=' + wordVal.trim().toLowerCase();

    fetch(url)
    .then(response => response.json())
    .then(response => {
            // accessing first value of response.query.pages and then word definition is in extract attribute
            response = response.query.pages[Object.keys(response.query.pages)[0]].extract;
            if (!response) {
                setEmptyAlertInWiktionary();
                return;
            }

            //Find all headers
            text = response.replaceAll('<h2>', 'QQQ<h2>').split('QQQ');

            //Find English
            let english_text;
            text.forEach((x) => {
                if (x.includes('<span id="English">')) {
                    english_text = x;
                }
            });

            if (!english_text) {
                setEmptyAlertInWiktionary();
                return;
            }
            text = english_text;

            //Clean data
            text = text.replaceAll('\\n', '').replaceAll('<span id=', 'QQQ<span id=').split('QQQ');

            //Find different meanings
            let text_pos = []
            text.forEach(section => {
                if (section.includes('\"Noun') ||
                section.includes('\"Verb') ||
                section.includes('\"Adjective') ||
                section.includes('\"Adverb') ||
                section.includes('\"Pronoun') ||
                section.includes('\"Preposition') ||
                section.includes('\"Article') ||
                section.includes('\"Interjection') ||
                section.includes('\"Conjunction')) {
                    section = section.replaceAll(/<\/?h3>|<\/?h4>|<\/?h5>|<b>|<\/?dd>|<\/?dl>|<\/?span>|<\/?p>/g, '');
                    section = section.replace('<ol>', '')
                    section = section.replaceAll('>Noun','><span style="color:#808080; font-weight: bold">Noun</span>');
                    section = section.replaceAll('>Verb','><span style="color:#808080; font-weight: bold">Verb</span>');
                    section = section.replaceAll('>Adjective','><span style="color:#808080; font-weight: bold">Adjective</span>');
                    section = section.replaceAll('>Adverb','><span style="color:#808080; font-weight: bold">Adverb</span>');
                    section = section.replaceAll('>Pronoun','><span style="color:#808080; font-weight: bold">Pronoun</span>');
                    section = section.replaceAll('>Preposition','><span style="color:#808080; font-weight: bold">Preposition</span>');
                    section = section.replaceAll('>Article','><span style="color:#808080; font-weight: bold">Article</span>');
                    section = section.replaceAll('>Interjectio','><span style="color:#808080; font-weight: bold">Interjectio</span>');
                    section = section.replaceAll('>Conjunction','><span style="color:#808080; font-weight: bold">Conjunction</span>');
                    section = section.replace(`>${wordVal}`,`><span style=color:#76B900>${wordVal}</span>`)
                    text_pos.push(section);
                }
            });

            document.getElementById('Wiktionary-output').getElementsByTagName('p')[0].innerHTML += text_pos.join('');
        });
    };

function setEmptyAlertInWiktionary() {
    document.getElementById('Wiktionary-output').getElementsByTagName('p')[0].textContent += "The word you're looking for is not in this dictionary.";
}

function getResultsFromUrban() {

    document.getElementById('Urban-output').getElementsByTagName('p')[0].innerHTML = "<br>";


    let wordVal = inputWord.value;
    let url = 'https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=' + wordVal.trim().toLowerCase();
    console.log(url);
    const options = {
        method: 'GET',
        headers: {
            //jak ten klucz przestanie dzialac to trzeba sie zalogowac czy cos
            'X-RapidAPI-Key': 'e2366fd9d1mshc2654b507d6bbc9p1e926djsncfb3238af786',
            'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
        }
    };
    fetch(url, options)
        .then(response => response.json())
        .then(response => {
            const definitions = response.list.map(x => x.definition);
            const urbanList = document.createElement('ol');
            if (definitions.length === 0) {
                document.getElementById('Urban-output').getElementsByTagName('p')[0].textContent += "The word you're looking for is not in this dictionary.";
            } else {
                definitions.forEach(el => {
                    let li = document.createElement('li');
                    li.innerHTML = el.replaceAll('[', '').replaceAll(']', '');
                    urbanList.appendChild(li);
                });
                document.getElementById('Urban-output').getElementsByTagName('p')[0].appendChild(urbanList);
                document.getElementById('results').scrollIntoView()
            }
        })
};

function getWordOfTheDay() {
    const url = 'https://urban-dictionary7.p.rapidapi.com/v0/words_of_the_day';     // for word of the day
    //const url = 'https://urban-dictionary7.p.rapidapi.com/v0/random';             // for random word every time
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e2366fd9d1mshc2654b507d6bbc9p1e926djsncfb3238af786',
            'X-RapidAPI-Host': 'urban-dictionary7.p.rapidapi.com'
        }
    };

    try {
        fetch(url, options).then(response => response.json()).then(response => {
            wordOfTheDayContainer.innerHTML = "";

            // Extract necessary data
            let word = response.list[0].word;
            let firstDefinition = response.list[0].definition;
            let link = response.list[0].permalink;

            // Create HTML elements
            let newPara = document.createElement('p');
            let wotdHeading = document.createElement('h5');
            wotdHeading.innerText = word;
            let definitionSpan = document.createElement('span');
            definitionSpan.innerText = firstDefinition.replaceAll('[', '').replaceAll(']', '');
            let linkSpan = document.createElement('a');
            linkSpan.innerText = "See the whole entry on Urban Dictionary";
            linkSpan.setAttribute('href', link);
            newPara.appendChild(wotdHeading);
            newPara.appendChild(definitionSpan);
            newPara.appendChild(linkSpan);

            // Connect HTML elements with the relevant container in the DOM
            wordOfTheDayContainer.appendChild(newPara);
        });
    } catch (error) {
        console.error(error);
        wordOfTheDayContainer.innerHTML = "Failed to load the word of the day :(";
    }
}

let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
