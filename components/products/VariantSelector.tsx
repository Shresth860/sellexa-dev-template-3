type VariantSelectorProps = {
  colors?: { name: string; hex: string }[];
  storageOptions?: string[];
  selectedColor?: string;
  selectedStorage?: string;
  onColorChange: (name: string) => void;
  onStorageChange: (value: string) => void;
};

export default function VariantSelector({
  colors,
  storageOptions,
  selectedColor,
  selectedStorage,
  onColorChange,
  onStorageChange,
}: VariantSelectorProps) {
  if (!colors?.length && !storageOptions?.length) {
    return null;
  }

  return (
    <div className="space-y-5">
      {colors && colors.length > 0 && (
        <div>
          <p className="mb-2 text-[13px] font-medium text-black">
            Color:{" "}
            <span className="font-normal text-black/60">
              {selectedColor}
            </span>
          </p>

          <div className="flex items-center gap-2.5">
            {colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => onColorChange(color.name)}
                aria-label={color.name}
                aria-pressed={color.name === selectedColor}
                className={`h-8 w-8 rounded-full ring-2 ring-offset-2 transition ${
                  color.name === selectedColor
                    ? "ring-black"
                    : "ring-transparent hover:ring-black/20"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      )}

      {storageOptions && storageOptions.length > 0 && (
        <div>
          <p className="mb-2 text-[13px] font-medium text-black">Storage</p>

          <div className="flex flex-wrap gap-2">
            {storageOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onStorageChange(option)}
                aria-pressed={option === selectedStorage}
                className={`rounded-lg border px-4 py-2 text-[13px] font-medium transition ${
                  option === selectedStorage
                    ? "border-black bg-black text-white"
                    : "border-black/15 text-black hover:border-black/35"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
