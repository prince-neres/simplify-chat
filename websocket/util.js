function getFormattedTime() {
  const currentDate = new Date();

  const formatOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  const formatTime = new Intl.DateTimeFormat("pt-BR", formatOptions);

  return formatTime.format(currentDate);
}

module.exports = {
  getFormattedTime: getFormattedTime,
};
