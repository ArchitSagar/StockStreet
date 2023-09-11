
const tradingViewContainer = document.getElementById("tradingview-container");
const tradingViewScript = document.createElement("script");
tradingViewScript.type = "text/javascript";
tradingViewScript.async = true;
tradingViewScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";

tradingViewScript.innerHTML = JSON.stringify({
    "symbols": [
        {
            "description": "SENSEX",
            "proName": "BSE:SENSEX"
        },
        {
            "description": "SBIN",
            "proName": "BSE:SBIN"
        },
        {
            "description": "RELIANCE",
            "proName": "BSE:RELIANCE"
        },
        {
            "description": "HDFC",
            "proName": "BSE:HDFCBANK"
        },
        {
            "description": "INFOSIS",
            "proName": "BSE:INFY"
        },
        {
            "description": "TATA MOTORS",
            "proName": "BSE:TATAMOTORS"
        },
        {
            "description": "ITC",
            "proName": "BSE:ITC"
        },
        {
            "description": "BHARTIARTL",
            "proName": "BSE:BHARTIARTL"
        },
        {
            "description": "HUL",
            "proName": "BSE:HINDUNILVR"
        }
        
    ],
    "showSymbolLogo": true,
    "height":46,
    "colorTheme": "dark",
    "isTransparent": false,
    "displayMode": "adaptive",
    "locale": "in"
});

tradingViewContainer.appendChild(tradingViewScript);



const links = document.querySelectorAll(".nav-link");

links.forEach((link) => {
    link.addEventListener("click",(e)=>{
        links.forEach((link) => {
            link.classList.remove("nav-active");
        });
        link.classList.add("nav-active");
    });
});



function searchSecurity(userInput) {
    fetch('bse_securities.csv')
        .then(response => response.text())
        .then(csvData => {
            const rows = csvData.split('\n');
            const headers = rows[0].split(',');
            const securitiesData = [];

            for (let i = 1; i < rows.length; i++) {
                const values = rows[i].split(',');
                const security = {};
                for (let j = 0; j < headers.length; j++) {
                    security[headers[j]] = values[j];
                }
                securitiesData.push(security);
            }

            const matchingSecurity = securitiesData.find(security => {
                const symbol = security && security.Symbol ? security.Symbol.toUpperCase() : null;
                return symbol === userInput;
            });
            
            console.log('CSV Data:', securitiesData);
            console.log('User Input:', userInput);


            const resultDiv = document.getElementById('result');
            if (matchingSecurity) {
                localStorage.setItem('userInput', userInput);
                window.location.href = 'search.html';
            } else {
                const resultDiv = document.getElementById('result');
                resultDiv.textContent = 'Stock not found.';
            }
        })
        .catch(error => {
            console.error('Error fetching CSV data:', error);
        });
}


const securityInput = document.getElementById('securityInput');
const searchButton = document.getElementById('searchButton');


searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    let userInput = securityInput.value.toUpperCase(); // Convert input to uppercase
    searchSecurity(userInput);
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

