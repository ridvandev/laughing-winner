const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
// let value = params.some_key; // "some_value"

function dateDiff(testDate) {
    // Calculate the difference in milliseconds
    let twentyFourHour = 1000 * 60 * 60 * 24;
    let difference_ms = twentyFourHour -(new Date() - testDate);
    //take out milliseconds
    difference_ms = difference_ms / 1000;
    let seconds = Math.floor(difference_ms % 60);
    difference_ms = difference_ms / 60;
    let minutes = Math.floor(difference_ms % 60);
    difference_ms = difference_ms / 60;
    let hours = Math.floor(difference_ms % 24);

    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
}

function app() {
    const field = document.getElementById("name-field");
    field.innerHTML = params.name;

    var qrcode = new QRCode("qr-field", {
        width: 220,
        height: 220,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    qrcode.makeCode("https://google.com");

    const dateField = document.getElementById("date-field");
    const now = new Date();
    const day = (now.getDate()).toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    dateField.innerHTML = ' ' + day + '-' + month + ' / 09:25';

    const validField = document.getElementById("valid-field");
    let testDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 25, 0);
    validField.textContent = dateDiff(testDate);
    setInterval(() => {
        let validFor = dateDiff(testDate);
        validField.textContent = validFor;
    }, 1000);
}
app();
