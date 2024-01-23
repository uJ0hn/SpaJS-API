function a(b) {
    if(b) c(window.location.href);
    const d = document.querySelectorAll('a');
    d.forEach(e => {
        if (e.id !== 'form') {
            e.addEventListener('click', f => {
                f.preventDefault();
                const g = e.getAttribute('href');
                c(g);
            });
        }
    });
}
window.onload = function () {
    a(true);
}
function c(h) {
    fetch(h + "?javascript=true", {headers: new Headers({"javascript": "JavaScript-SPA"})})
        .then(i => i.text())
        .then(j => {
            const k = document.querySelectorAll('script');
            k.forEach(l => l.remove());
            document.documentElement.innerHTML = j;
            const m = document.querySelectorAll('script');
            m.forEach(n => {
                if (n.src) {
                    const o = document.createElement('script');
                    o.src = n.src;
                    document.body.appendChild(o);
                } else {
                    const p = n.textContent;
                    new Function(p)();
                }
            });
            if(!window.location.href.endsWith(h)) {
                window.history.pushState({ h }, '', h);
            }
            setTimeout(() => {
                const q = document.querySelectorAll('body');
                q.forEach(r =>{
                    if(!r.onload.toString().includes("a(true)")) {
                        r.onload();
                    }
                });
                a(false);
                console.clear();
            }, 100);
        })
        .catch(s => {
            console.error(s);
        });
}

window.addEventListener('popstate', function(t) {
    t.preventDefault();
    c(location.href);
});

