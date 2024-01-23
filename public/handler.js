function handlerInit(boolean) {
    if(boolean) {
        changePage(window.location.href)
    }
    const botoes = document.querySelectorAll('a');

    botoes.forEach(botao => {
        if (botao.id !== 'form') {
            botao.addEventListener('click', event => {
                event.preventDefault();
                const url = botao.getAttribute('href');
                changePage(url)
            });
        }
    });
}


function changePage(url) {
    console.log(url)
    fetch(url + "?javascript=true", {headers: new Headers({"javascript": "JavaScript-SPA"})})
        .then(response => response.text())
        .then(html => {
            const oldScripts = document.querySelectorAll('script');
            oldScripts.forEach(script => script.remove());
            document.documentElement.innerHTML = html;

                const newScripts = document.querySelectorAll('script');
                newScripts.forEach(script => {
                    if (script.src) {
                        const newScript = document.createElement('script');
                        newScript.src = script.src;
                        document.body.appendChild(newScript);
                    } else {
                        const content = script.textContent;
                        new Function(content)();
                    }
                });

            if(!window.location.href.endsWith(url)) {
                window.history.pushState({ url }, '', url);
            }
            setTimeout(() =>{
                const bodys = document.querySelectorAll('body');
                bodys.forEach(body =>{
                    if(!body.onload.toString().includes("handlerInit(true)")) {
                        body.onload()
                    }
                })
                handlerInit(false)
            }, 250)
        })
        .catch(error => {
            console.error(error);
        });
}


window.addEventListener('popstate', function(event) {
    event.preventDefault()
    changePage(location.href)
});

window.onload = function () {
    handlerInit(true)
}
