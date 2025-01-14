const formatDate = (dateString) => {
  let onlyDate = false;

  if (!dateString) {
    return '-';
  }

  dateString = dateString.split('.')[0];

  const date = new Date(dateString);

  if (date.toString() === 'Invalid Date') {
    return '-';
  }

  // Subtrair 3 horas
  date.setHours(date.getHours() - 3);

  const formattedDate = date.toLocaleString().replace(',', '');

  return onlyDate ? formattedDate.split(' ')[0] : formattedDate;
};

export { formatDate };
