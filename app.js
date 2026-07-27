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
    const viewportNotes = document.getElementById('viewport-notes');
    const saveNotesBtn = document.getElementById('save-notes-btn');

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

    // 3. Notes Sidebar Show/Hide
    notesToggleBtn.addEventListener('click', () => {
        notesSidebar.classList.toggle('hidden');
    });

    // Secure initial loading
    if (urlInput.value) {
        screenshotBtn.removeAttribute('disabled');
    }

    // Unique key for localStorage (based on current URL)
    function getStorageKey() {
        const currentUrl = urlInput.value.trim() || 'default';
        return `viewport_notes_${currentUrl}`;
    }

    // Load notes for the current URL
    function loadNotes() {
        const key = getStorageKey();
        const savedNotes = localStorage.getItem(key);
        viewportNotes.value = savedNotes ? savedNotes : '';
    }

    // Save notes
    saveNotesBtn.addEventListener('click', () => {
        const key = getStorageKey();
        const content = viewportNotes.value;
        localStorage.setItem(key, content);

        // Short optical feedback when saving
        const originalText = saveNotesBtn.textContent;
        saveNotesBtn.textContent = 'Saved!';
        setTimeout(() =>{
            saveNotesBtn.textContent = originalText;
        }, 1500);
    });

    // Load notes when the URL changes or is reloaded
    loadBtn.addEventListener('click', loadNotes);

    loadNotes();
});
