import React, { useState, useEffect } from "react";

export default function FiltersPrice({
  minPrice,
  maxPrice,
  loading,
  setMinPrice,
  setMaxPrice,
}) {
  const [minPricePreview, setMinPricePreview] = useState(minPrice);
  const [maxPricePreview, setMaxPricePreview] = useState(maxPrice);

  useEffect(() => {
    setMinPricePreview(minPrice);
  }, [minPrice]);

  useEffect(() => {
    setMaxPricePreview(maxPrice);
  }, [maxPrice]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-sm font-bold text-gray-700">Price</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-1 my-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="minPrice" className="text-gray-600">
              Min Price
            </label>
            <input
              type="range"
              name="minPrice"
              id="minPrice"
              disabled={loading}
              min={0}
              max={7000}
              step={10}
              value={minPricePreview}
              onMouseUp={(e) => setMinPrice(parseInt(e.currentTarget.value))}
              onChange={(e) =>
                setMinPricePreview(parseInt(e.currentTarget.value))
              }
              className="slider-thumb"
            />
          </div>

          <div>
            <label htmlFor="maxPrice" className="text-gray-600">
              Max Price
            </label>
            <input
              type="range"
              name="maxPrice"
              id="maxPrice"
              disabled={loading}
              min={0}
              max={7000}
              step={10}
              value={maxPricePreview}
              onMouseUp={(e) => setMaxPrice(parseInt(e.currentTarget.value))}
              onChange={(e) =>
                setMaxPricePreview(parseInt(e.currentTarget.value))
              }
              className="slider-thumb"
            />
          </div>

          <div className="col-span-2 flex items-center justify-between space-x-2">
            <input
              type="number"
              id="min-price-input"
              value={minPricePreview}
              readOnly
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
            />

            <div className="flex text-sm font-medium text-gray-500">to</div>

            <input
              type="number"
              id="max-price-input"
              value={maxPricePreview}
              readOnly
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
