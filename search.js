const userInput = localStorage.getItem('userInput');

document.addEventListener('DOMContentLoaded', function () {


    function createTradingViewWidget1() {

        const tradingViewContainer1 = document.getElementById("widget1");
        const tradingViewScript1 = document.createElement("script");
        tradingViewScript1.type = "text/javascript";
        tradingViewScript1.async = true;
        tradingViewScript1.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";

        
        tradingViewScript1.innerHTML = JSON.stringify({

            "symbol":`BSE:${userInput}`,
            "height":80,
            "width": 1000,
            "locale": "en",
            "colorTheme": "dark",
            "isTransparent": false,
        });

        tradingViewContainer1.appendChild(tradingViewScript1);

    }

    createTradingViewWidget1();


    function createTradingViewWidget2() {
        const containerId = "widget2";
        const container = document.getElementById(containerId);
        

        if (container) {
            new TradingView.widget({
                "width": 1000,
                "height": 550,
                "symbol": `BSE:${userInput}`, 
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "1",
                "locale": "en",
                "enable_publishing": false,
                "container_id": containerId
            });
        }

        else {
            console.error(`Container with ID "${containerId}" not found.`);
        }
    }

    createTradingViewWidget2();


    function createTradingViewWidget3() {

        const tradingViewContainer2 = document.getElementById("widget3");
        const tradingViewScript2 = document.createElement("script");
        tradingViewScript2.type = "text/javascript";
        tradingViewScript2.async = true;
        tradingViewScript2.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";

        tradingViewScript2.innerHTML = JSON.stringify({

            "symbol":`BSE:${userInput}`,
            "interval": "1M",
            "width": 425,
            "isTransparent": false,
            "height": 450,
            "showIntervalTabs": true,
            "locale": "in",
            "colorTheme": "dark"
        });

        tradingViewContainer2.appendChild(tradingViewScript2);

    }
    createTradingViewWidget3();

    
});

