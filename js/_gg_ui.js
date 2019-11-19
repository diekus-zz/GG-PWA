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
});

