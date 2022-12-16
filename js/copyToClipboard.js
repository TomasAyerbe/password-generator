const copyButton = document.getElementById('copy-button');

copyButton.addEventListener('click', async function (event) {
    const content = document.getElementById('password-text').textContent;
    
    await navigator.clipboard.writeText(content);
});
