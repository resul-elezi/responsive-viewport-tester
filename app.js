'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements Reference
    const urlInput = document.getElementById('url-input');
    const loadBtn = document.getElementById('load-btn');
    const iframe = document.getElementById('viewport-iframe');
    const frameContainer = document.getElementById('frame-container');
    const widthSlider = document.getElementById('width-slider');
    const widthValue = document.getElementById('width-value');
    const presetBtns = document.querySelectorAll('.preset-btn');
    const screenshotBtn = document.getElementById('screenshot-btn');
    const notesToggleBtn = document.getElementById('notes-toggle-btn');
    const notesSidebar = document.getElementById('notes-sidebar');

    // 1. Loading URL in the Iframe
    function loadUrl() {
        let url = urlInput.value.trim();
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
            urlInput.value = url;
        }
        iframe.src = url;
        // Enable screenshot button as soon as a URL is loaded
        screenshotBtn.removeAttribute('disable');
    }

    loadBtn.addEventListener('click', loadUrl);
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loadUrl();
        }
    });

    // 2. Update Viewport Width
    function setViewportWidth(width) {
        frameContainer.style.width = width + 'px';
        widthSlider.value = width;
        widthValue.textContent = width;
    }

    // Slider-Event
    widthSlider.addEventListener('input', (e) => {
        setViewportWidth(e.target.value);
    });

    // Preset-Events
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const width = btn.getAttribute('data-width');
            setViewportWidth(width);
        });
    });

    
})