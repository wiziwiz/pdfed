import { PDFDocument } from 'pdf-lib';
import { readFileSync, writeFileSync } from 'fs';

async function doALL() {
  const existingPdfBytes = readFileSync('./pdf1.pdf');
  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc1 = await PDFDocument.load(existingPdfBytes);

  const existingPdfBytes2 = readFileSync('./pdf2.pdf');
  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc2 = await PDFDocument.load(existingPdfBytes2);

  // Get the first page of the document
  // const pages2 = pdfDoc2.getPages()
  // const firstPage = pages[0]

  // const pages1 = pdfDoc1.getPages()
  // const thirdPage = pages1[2]

  pdfDoc1.removePage(2);

  const [existingPage] = await pdfDoc1.copyPages(pdfDoc2, [0]);
  // const existingPage = pdfDoc2.getPage(0);
  pdfDoc1.insertPage(2, existingPage);

  const pdfBytes = await pdfDoc1.save();

  writeFileSync('./pdfresult.pdf', pdfBytes);
}

doALL();