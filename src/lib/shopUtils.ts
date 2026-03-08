// src\lib\shopUtils.ts
export function parseDescription(description: string) {
  const priceRegex = /(Rs|₹)\s*([\d,]+)\s*\/-/;
  const discountRegex = /\(([^)]+)\)/;
  const priceMatch = description.match(priceRegex);
  const discountMatch = description.match(discountRegex);
  const clean = description
    .replace(priceRegex, "")
    .replace(discountRegex, "")
    .replace(/\s+/g, " ")
    .trim();
  return {
    cleanDescription: clean,
    price: priceMatch ? `${priceMatch[1]} ${priceMatch[2]}/-` : null,
    priceNumeric: priceMatch ? parseInt(priceMatch[2].replace(/,/g, ""), 10) : null,
    discount: discountMatch ? discountMatch[1] : null,
  };
}
