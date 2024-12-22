function updateFavicon() {
    const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const favicon = document.getElementById('favicon');
    
    favicon.href = isDarkTheme ? 'coffee-dark.svg' : 'coffee-light.svg';
}

updateFavicon();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);