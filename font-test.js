const debounceFn = (fn, time) => {
  let timeout;

  return (...args) => {
    const functionCall = () => fn.apply(this, args);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

const insertOrReplaceFont = fontStyle => {
  const fontStylesheet = document.querySelector("#font-stylesheet");
  fontStylesheet.innerHTML = fontStyle;
};

const generateFontStyle = fontData => {
  return `
@font-face {
  font-family: font-to-test;
  src: url(${fontData});
}
`;
};

const readFileToUrl = async file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const handleFontUpload = async event => {
  const fontFile = event.target.files[0];
  const fontDataString = await readFileToUrl(fontFile);
  const fontStyle = generateFontStyle(fontDataString);
  insertOrReplaceFont(fontStyle);
};

const handleFontWeight = () => {
  const fontWeight = document.querySelector("#font-weight");
  const newWeight = fontWeight.value;

  const samples = document.querySelector("#samples");
  samples.style.fontWeight = newWeight;
};

const handleFontStyle = () => {
  const fontStyle = document.querySelector("#font-style");
  const newStyle = fontStyle.value;

  const samples = document.querySelector("#samples");
  samples.style.fontStyle = newStyle;
};

const handleFontSize = () => {
  const fontSize = document.querySelector("#font-size");
  const newSize = fontSize.value;

  const samples = document.querySelector("#samples");
  samples.style.fontSize = newSize;
};

const debouncedHandleFontSize = debounceFn(handleFontSize, 100);

const setFirstValues = () => {
  handleFontSize();
  handleFontWeight();
  handleFontStyle();
};

const init = () => {
  const fontUpload = document.querySelector("#font-upload");
  fontUpload.addEventListener("change", handleFontUpload);

  const fontSize = document.querySelector("#font-size");
  fontSize.addEventListener("input", debouncedHandleFontSize);

  const fontWeight = document.querySelector("#font-weight");
  fontWeight.addEventListener("change", handleFontWeight);

  const fontStyle = document.querySelector("#font-style");
  fontStyle.addEventListener("change", handleFontStyle);

  setFirstValues();
};

init();
