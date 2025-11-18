"use client";

interface DynamicInputListProps {
  label: string;
  field: "ingredients" | "instructions";
  items: string[];
  onItemChange: (index: number, field: "ingredients" | "instructions", value: string) => void;
  onAddItem: (field: "ingredients" | "instructions") => void;
  onRemoveItem: (field: "ingredients" | "instructions", index: number) => void;
  isInstruction?: boolean;
}

export default function DynamicInputList({
  label,
  field,
  items,
  onItemChange,
  onAddItem,
  onRemoveItem,
  isInstruction = false,
}: DynamicInputListProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-(--primary) mb-2">{label}</label>
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-2 mb-2">
          {isInstruction && <span className="font-medium pt-2">{index + 1}.</span>}
          {isInstruction ? (
            <textarea
              value={item}
              onChange={(e) => onItemChange(index, field, e.target.value)}
              placeholder={`Step ${index + 1} details...`}
              rows={2}
              className="flex-1 bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent) placeholder-gray-400"
              maxLength={1000}
            />
          ) : (
            <input
              type="text"
              value={item}
              onChange={(e) => onItemChange(index, field, e.target.value)}
              placeholder={`Ingredient ${index + 1}`}
              className="flex-1 bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent) placeholder-gray-400"
              maxLength={200}
            />
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onRemoveItem(field, index)}
              className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              disabled={items.length === 1}
            >
              -
            </button>
            {index === items.length - 1 && (
              <button type="button" onClick={() => onAddItem(field)} className="px-3 py-2 bg-(--primary) text-white rounded-md hover:bg-(--hover)">
                +
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}