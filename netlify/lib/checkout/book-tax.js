const { BOOKS } = require('./catalog');

async function quoteBook(selectedClass, quantity, request) {
  const book = BOOKS[selectedClass.bookId];
  const address = selectedClass.bookPickupAddress;
  if (!book || !address || !Number.isInteger(quantity) || quantity < 1 || quantity > 6) {
    throw new Error('Invalid classroom book selection');
  }
  const subtotal = book.amount * quantity;
  const params = new URLSearchParams({ currency: 'usd', 'customer_details[address_source]': 'shipping',
    'line_items[0][amount]': String(subtotal), 'line_items[0][reference]': book.id,
    'line_items[0][tax_code]': 'txcd_99999999', 'line_items[0][tax_behavior]': 'exclusive' });
  for (const [key, value] of Object.entries(address)) params.set(`customer_details[address][${key}]`, value);
  const calculation = await request('/tax/calculations', params);
  const tax = calculation.tax_amount_exclusive;
  if (!calculation.id || !Number.isSafeInteger(tax) || tax <= 0 || calculation.amount_total !== subtotal + tax) {
    throw new Error('Book sales tax could not be verified');
  }
  return { subtotal, tax, total: calculation.amount_total, calculationId: calculation.id };
}

module.exports = { quoteBook };
