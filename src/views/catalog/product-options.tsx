"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

const ProductStrengthContext = createContext<{
  strengths: readonly string[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
} | null>(null);

export function ProductStrengthProvider({ strengths, children }: { strengths: readonly string[]; children: ReactNode }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return <ProductStrengthContext.Provider value={{ strengths, selectedIndex, setSelectedIndex }}>{children}</ProductStrengthContext.Provider>;
}

export function useProductStrength() {
  const selection = useContext(ProductStrengthContext);
  if (!selection) throw new Error("Product strength selection requires ProductStrengthProvider.");
  return selection;
}

export function ProductOptions() {
  const { strengths, selectedIndex, setSelectedIndex } = useProductStrength();
  return (
    <fieldset className="mt-7">
      <legend className="text-sm font-semibold">Select strength</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {strengths.map((strength, index) => (
          <label key={strength} className="flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border-subtle px-4 py-2 text-sm has-checked:border-accent has-checked:bg-accent has-checked:text-action-primary-foreground">
            <input type="radio" name="catalog-strength" value={strength} checked={selectedIndex === index} onChange={() => setSelectedIndex(index)} className="accent-current" />
            {strength}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
