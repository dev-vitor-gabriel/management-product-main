const formatCurrency = (number) => {
  number = number / 100;
  const options = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 }
  const formatNumber = new Intl.NumberFormat('pt-BR', options)
  return (formatNumber.format(number)).split('R$ ')[1];
};
const formatCurrencyString = (numberStr) => {
  if (!numberStr) {
    return '';
  }
  let number = parseFloat(numberStr.replace(/\D/g, '')) / 100;
  if (isNaN(number)) {
    return '';
  }
  const options = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 };
  const formatNumber = new Intl.NumberFormat('pt-BR', options);
  return formatNumber.format(number);
};
const formatCurrencyPrefix = (number) => {

  try {
    number = number / 100;
    if (isNaN(number)) {
      return '';
    }
    const options = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 }
    const formatNumber = new Intl.NumberFormat('pt-BR', options)
    return formatNumber.format(number);
  } catch (e) {
    return '';
  }
};

const parseCurrencyToInt = (number) => {
  number = number.match(/\d+/g).join('');
  return number
};

function formatCNPJ(value) {
  value = value.replace(/\D/g, "");
  value = value.slice(0, 14);
  value = value.replace(/^(\d{2})(\d)/, "$1.$2");
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
  value = value.replace(/(\d{4})(\d)/, "$1-$2");
  return value;
}

function formatPhoneNumber(value) {
  const cleanedValue = value.replace(/\D/g, "");
  
  const hasCountryCode = cleanedValue.startsWith('55');
  
  const phoneDigits = hasCountryCode ? cleanedValue.substring(2) : cleanedValue;
  
  if (phoneDigits.length === 10) {
    return `+55 (${phoneDigits.substring(0, 2)}) ${phoneDigits.substring(2, 6)}-${phoneDigits.substring(6)}`;
  } else if (phoneDigits.length === 11) {
    return `+55 (${phoneDigits.substring(0, 2)}) ${phoneDigits.substring(2, 7)}-${phoneDigits.substring(7)}`;
  }
  
  return hasCountryCode ? `+55${phoneDigits}` : phoneDigits;
}

function formatCPFandCNPJ(value) {
  const cleanedValue = value.replace(/\D/g, "");

  if (cleanedValue.length === 11) {
    return cleanedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } 
  else if (cleanedValue.length === 14) {
    return cleanedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }
  
  return value.replace(/\D/g, "");
}
function removeNonNumeric(value) {
  return value.replace(/\D/g, "");
}


export { formatCurrency, formatCurrencyString, formatCurrencyPrefix, parseCurrencyToInt, formatCNPJ, formatCPFandCNPJ, removeNonNumeric, formatPhoneNumber };

