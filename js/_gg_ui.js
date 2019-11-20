/*prefers-color-scheme support on older browser*/
if (window.matchMedia('(prefers-color-scheme: dark)').media === 'not all') {
    document.documentElement.style.display = 'none';
    document.head.insertAdjacentHTML(
        'beforeend',
        '<link rel="stylesheet" href="css/gg-light.css" onload="document.documentElement.style.display = \'\'">'
    );
}

window.addEventListener('load', () => {
    /*Sticky header global app*/
    let _page_title = document.querySelector('#_page_title');

    let observerStickyTitle = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                document.querySelector('._sticky_title').classList.add('_sticky_title_disappear');
                document.querySelector('._sticky_title').classList.remove('_sticky_title_appear');
            } else {
                document.querySelector('._sticky_title').classList.add('_sticky_title_appear');
                document.querySelector('._sticky_title').classList.remove('_sticky_title_disappear');
            }
        });
    });
    observerStickyTitle.observe(_page_title);

    /*cards animation entrance*/
    let contentCards = document.querySelectorAll('.gg-bubble-vert, .gg-bubble-horz');
    let animCardEntry = [
        { transform: 'translateX(200px)' },
        { transform: 'translateX(0px)' }
    ];
    let animCardEntryTiming = {
        duration: 500,
        easing: 'ease-out',
        fill: 'forwards',
    };

    let observerCards = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            let cardEntryAnim = entry.target.animate(animCardEntry, animCardEntryTiming);
            cardEntryAnim.onfinish = function() { observerCards.unobserve(entry.target) };
        });
    },
    {threshold:0});
    contentCards.forEach(card => { observerCards.observe(card); });
});
    

