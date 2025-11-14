export default function BlurControls({ blurAmount, setBlurAmount }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Blur Amount: {blurAmount.toFixed(1)}
      </label>
      <input
        type="range"
        min="0"
        max="10"
        step="0.5"
        value={blurAmount}
        onChange={(e) => setBlurAmount(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

