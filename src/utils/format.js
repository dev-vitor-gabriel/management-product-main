const formatCurrency = (number) => {
  number = number / 100;
  const options = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 }
  const formatNumber = new Intl.NumberFormat('pt-BR', options)
  return (formatNumber.format(number)).split('R$ ')[1];
};
const formatCurrencyPrefix = (number) => {
  
  try{
    number = number / 100;
    if(isNaN(number)){
      return '';
    }
    console.log(number)
    const options = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 }
    const formatNumber = new Intl.NumberFormat('pt-BR', options)
    return formatNumber.format(number);
  }catch(e){
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


export { formatCurrency, formatCurrencyPrefix, parseCurrencyToInt, formatCNPJ };

