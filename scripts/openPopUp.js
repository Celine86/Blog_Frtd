function openPopup(event, urlTemplate) {
    event.preventDefault();
    let url = urlTemplate;

    const popupWidth = 800;
    const popupHeight = 800;

    const screenLeft = window.screenLeft || window.screenX;
    const screenTop = window.screenTop || window.screenY;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const left = screenLeft + (windowWidth - popupWidth) / 2;
    const top = screenTop + (windowHeight - popupHeight) / 2;

    window.open(
        url,
        'popupWindow',
        `width=${popupWidth},height=${popupHeight},top=${top},left=${left},scrollbars=yes,resizable=yes`
    );
}
