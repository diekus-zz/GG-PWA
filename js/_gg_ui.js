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

    let observer = new IntersectionObserver(entries => {
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
    observer.observe(_page_title);


    /*cards animation entrance*/
    const lis = Array.from(document.querySelectorAll('li'));
    const intersectingEvent = new Event('intersecting');

    const intersectionObserverOptions = {
        threshold: 0.25
    }

    let observer = new IntersectionObserver(entries => entries.forEach(function onIntersection({
            isIntersecting,
            target
        }) {
            if (isIntersecting) {
                target.dispatchEvent(intersectingEvent);
            }
        }), intersectionObserverOptions);

    lis.forEach(li => {
        observer.observe(li);

        // Have the box on the screen but invisible at the start
        // Since it needs to be detected by the intersection observer
        li.style.opacity = 0;

        // Only once when it is intersecting do the animation and make it visible
        li.addEventListener('intersecting', () => {
            const animation = li.animate(
            {'transform': ['translateX(100vw)','translateX(0)']},
            {easing: getComputedStyle(document.documentElement).getPropertyValue('--easeInCubic'),
             duration: 700,
             fill: 'forwards'
            });
            li.style.opacity = 1;
        }, {
            once: true
        });
    });
});

