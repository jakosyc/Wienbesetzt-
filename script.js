window.addEventListener('load', function () {
    const bild = document.getElementById('bild1');
    const blueDot = document.getElementById('blueDot');

    function updateBlueDotPosition() {
        const bildRect = bild.getBoundingClientRect();
        blueDot.style.left = `${bildRect.left + (bildRect.width / 2) - 5}px`;
        blueDot.style.top = `${bildRect.top - 5}px`;
    }

    // Blaue Punktposition bei Mausbewegung oder Klick aktualisieren
    bild.addEventListener('mousemove', updateBlueDotPosition);
    bild.addEventListener('click', updateBlueDotPosition);

    // Anfangsposition setzen
    updateBlueDotPosition();

    function openPopup(popupId) {
        const popup = document.getElementById(popupId);
        const bildRect = bild.getBoundingClientRect();

        if (popupId === 'popup') {
            popup.style.left = `${bildRect.right + 10}px`;
            popup.style.top = `${bildRect.top}px`;
        }

        if (popupId === 'popupQuellen') {
            const mainPopup = document.getElementById('popup');
            const mainPopupRect = mainPopup.getBoundingClientRect();
            popup.style.left = `${mainPopupRect.left}px`;
            popup.style.top = `${mainPopupRect.bottom + 10}px`;
        }

        popup.style.display = 'block';
    }

    function closePopup(popupId) {
        const popup = document.getElementById(popupId);
        popup.style.display = 'none';

        // Quellen-Popup mit schließen, wenn Hauptpopup geschlossen wird
        if (popupId === 'popup') {
            closePopup('popupQuellen');
        }
    }

    // Haupt-Popup öffnen bei Klick auf das Bild
    bild.addEventListener('click', function () {
        openPopup('popup');
    });

    // Haupt-Popup schließen
    document.getElementById('closePopup').addEventListener('click', function () {
        closePopup('popup');
    });

    // Quellen-Popup öffnen
    document.getElementById('quellenLink').addEventListener('click', function () {
        openPopup('popupQuellen');
    });

    // Popups schließen beim Klick außerhalb
    window.addEventListener('click', function (event) {
        if (
            !event.target.closest('#popup') &&
            !event.target.closest('#popupQuellen') &&
            !event.target.closest('.custom-image')
        ) {
            closePopup('popup');
            closePopup('popupQuellen');
        }
    });

    //Zoom
const svgElement = document.getElementById('svgObject');
const panZoom = svgPanZoom(svgElement, {
  zoomEnabled: true,
  controlIconsEnabled: true,
  fit: true,
  center: true
});

const svgObject = document.getElementById('svgObject');
const svgDocument = svgObject.contentDocument;  // Zugriff auf das eingebettete SVG-Dokument

svgDocument.addEventListener('wheel', function(event) {
  event.preventDefault();
  let viewBox = svgDocument.documentElement.getAttribute('viewBox').split(' ');

  let currentWidth = parseFloat(viewBox[2]);
  let currentHeight = parseFloat(viewBox[3]);

  let zoomFactor = event.deltaY < 0 ? 1.1 : 0.9;  // Zoomfaktor: + oder - bei Mausradbewegung
  currentWidth *= zoomFactor;
  currentHeight *= zoomFactor;

  // Setze den neuen viewBox-Wert
  svgDocument.documentElement.setAttribute('viewBox', `0 0 ${currentWidth} ${currentHeight}`);
});

function positionImage() {
    var svgElement = document.getElementById('svgObject');
    var image = document.getElementById('bild1');

    var svgRect = svgElement.getBoundingClientRect();

    // Berechne die Position als Prozentsatz der SVG-Größe
    var topPosition = svgRect.top + svgRect.height * 0.2;  // 20% der Höhe des SVG
    var leftPosition = svgRect.left + svgRect.width * 0.3; // 30% der Breite des SVG

    // Setze die neue Position des Bildes
    image.style.top = topPosition + 'px';
    image.style.left = leftPosition + 'px';
}

// Aufruf der Funktion, um das Bild zu positionieren
positionImage();

// Optional: Bei einer Fenstergrößeänderung die Position erneut setzen
window.addEventListener('resize', positionImage);



});