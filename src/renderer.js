const { ipcRenderer } = require('electron');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf');

dropzone.addEventListener('dragover', (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
});

dropzone.addEventListener('dragleave', (event) => {
  event.preventDefault();
  dropzone.classList.remove('valid', 'invalid');
});

dropzone.addEventListener('drop', async (event) => {
  event.preventDefault();

  dropzone.classList.remove('valid', 'invalid');

  const file = event.dataTransfer.files[0];
  if (file) {
    const filePath = file.path;

    // Carga el archivo PDF utilizando pdfjs-dist
    const pdfData = await pdfjsLib.getDocument({ url: filePath }).promise;

    // Obtén el número total de páginas
    const numPages = pdfData.numPages;

    // Inserta un objeto <embed> para mostrar el PDF en el mismo lugar
    const embedElement = document.createElement('embed');
    embedElement.setAttribute('src', `file://${filePath}#page=1`); // Muestra la primera página del PDF
    embedElement.setAttribute('type', 'application/pdf');
    embedElement.style.width = '100%';
    embedElement.style.height = '600px';
    dropzone.appendChild(embedElement);
  }
});
