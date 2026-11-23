// Match Stripe's UTC monthly anchors: January 31 advances to February's last
// day, then March 31 when calculated from the original enrollment timestamp.
function addMonths(timestampSeconds, months) {
  const date = new Date(timestampSeconds * 1000);
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + months);
  const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(day, lastDay));
  return Math.floor(date.getTime() / 1000);
}

module.exports = { addMonths };
