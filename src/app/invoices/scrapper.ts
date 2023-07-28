import { PdfReader } from "pdfreader";

function Scrapper() {
  let clientNumber;
  let monthRef;
  let dueDate;
  let eletricEnergy = {
    kwh: 0,
    unitPrice: 0,
    price: 0,
  };
  let energyInjected = {
    kwh: 0,
    unitPrice: 0,
    price: 0,
  };
  let icms = {
    kwh: 0,
    unitPrice: 0,
    price: 0,
  };
  let contrib = 0;
  let totalValue;

  const pdfReader = PdfReader();
  pdfReader().parseFileItems(
    "assets/3004298116-05-2023.pdf",
    (err: string, item: { text: string; x: number; y: number; w: number }) => {
      if (err) console.error("error:", err);
      if (!item) console.warn("end of file");
      // else if (item.text) console.log("D", item.text);

      const { x, y, w, text } = item;

      if (x === 0.634 && y === 9.272 && w === 208.5)
        clientNumber = text.trim().split(" ")[0];

      if (x === 14.809 && y === 3.9219999999999997 && w === 287.651)
        monthRef = text.match(/[A-Z]{3}\/\d{4}/)?.[0];

      if (x === 14.809 && y === 3.9219999999999997 && w === 287.651)
        dueDate = text.match(/\d{2}\/\d{2}\/\d{4}/)?.[0];

      if (x === 14.809 && y === 3.9219999999999997 && w === 287.651) {
        const value = text.match(/\d{3},\d{2}/)?.[0];
        totalValue = value && parseStringToFloat(value);
      }

      // Eletric Energy
      if (x === 15.616 && y === 14.856 && w === 40.936) {
        eletricEnergy.unitPrice = parseStringToFloat(
          item.text.replace(",", ".")
        );
      }

      if (x === 18.969 && y === 14.856 && w === 31.171) {
        eletricEnergy.price = parseStringToFloat(item.text);
      }

      // Injected Energy
      // if (x === 12.603 && y === 16.056 && w === 25.333) {
      if (x === 31.269 && y === 16.056 && w === 40.936) {
        energyInjected.unitPrice = parseStringToFloat(item.text);
      }

      if (x === 18.822 && y === 16.056 && w === 33.53) {
        energyInjected.price = parseStringToFloat(item.text);
        console.log(energyInjected);
      }

      // IMCS
      if (x === 15.616 && y === 15.456 && w === 40.936) {
        icms.price = parseStringToFloat(item.text);
      }

      if (x === 18.847 && y === 15.456 && w === 33.124) {
        icms.unitPrice = parseStringToFloat(item.text);
      }

      if (x === 18.725 && y === 16.656 && w === 35.063) {
        contrib = parseStringToFloat(item.text);
      }
    }
  );

  function parseStringToFloat(text: string) {
    return parseFloat(text.replace(",", "."));
  }

  return { contrib, icms, energyInjected, monthRef, clientNumber, dueDate };
}

export default Scrapper;
