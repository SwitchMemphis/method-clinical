export function MolecularFormula({ value }: { value: string }) {
  return value.split("\n").map((line, index) => {
    const separator = line.indexOf(":");
    const label = separator < 0 ? "" : line.slice(0, separator + 1);
    const formula = line.slice(separator + 1);
    const parts = formula.split(/\b((?:[A-Z][a-z]?\d*){2,})(?=\b|[+…])/g);

    return (
      <span key={index} className="block tabular-nums">
        {label}
        {parts.map((part, partIndex) => partIndex % 2 === 0 ? part : (
          <span key={partIndex} className="inline-block">
            {part.split(/(\d+)/).map((token, tokenIndex) =>
              tokenIndex % 2 === 0 ? token : <sub key={tokenIndex}>{token}</sub>,
            )}
          </span>
        ))}
      </span>
    );
  });
}
