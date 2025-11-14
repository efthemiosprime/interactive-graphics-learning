import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

export default function FormulaExplorer({ formula, parts, onPartHover, onPartClick }) {
  const [selectedPart, setSelectedPart] = useState(null);
  const [hoveredPart, setHoveredPart] = useState(null);

  const handlePartClick = (part) => {
    if (selectedPart === part.id) {
      setSelectedPart(null);
      if (onPartClick) onPartClick(null);
    } else {
      setSelectedPart(part.id);
      if (onPartClick) onPartClick(part);
    }
  };

  const handlePartHover = (part) => {
    setHoveredPart(part.id);
    if (onPartHover) onPartHover(part);
  };

  const handlePartLeave = () => {
    setHoveredPart(null);
    if (onPartHover) onPartHover(null);
  };

  if (!formula || !parts || parts.length === 0) {
    return null;
  }

  // Build the formula with interactive parts
  const renderFormula = () => {
    let currentIndex = 0;
    const elements = [];
    
    parts.forEach((part, index) => {
      // Add text before this part
      if (part.startIndex > currentIndex) {
        const beforeText = formula.substring(currentIndex, part.startIndex);
        if (beforeText) {
          elements.push(
            <span key={`text-${index}`} className="font-mono">
              {beforeText}
            </span>
          );
        }
      }
      
      // Add the interactive part
      const isSelected = selectedPart === part.id;
      const isHovered = hoveredPart === part.id;
      
      elements.push(
        <span
          key={`part-${part.id}`}
          onClick={() => handlePartClick(part)}
          onMouseEnter={() => handlePartHover(part)}
          onMouseLeave={handlePartLeave}
          className={`
            font-mono cursor-pointer transition-all duration-200
            ${isSelected 
              ? 'bg-indigo-600 text-white px-2 py-1 rounded shadow-lg' 
              : isHovered
              ? 'bg-indigo-200 text-indigo-900 px-2 py-1 rounded'
              : 'bg-indigo-100 text-indigo-800 px-1 rounded hover:bg-indigo-200'
            }
          `}
          title={part.description || part.name}
        >
          {part.text}
        </span>
      );
      
      currentIndex = part.endIndex || part.startIndex + part.text.length;
    });
    
    // Add remaining text
    if (currentIndex < formula.length) {
      const afterText = formula.substring(currentIndex);
      if (afterText) {
        elements.push(
          <span key="text-end" className="font-mono">
            {afterText}
          </span>
        );
      }
    }
    
    return elements;
  };

  const selectedPartData = parts.find(p => p.id === selectedPart);
  const hoveredPartData = parts.find(p => p.id === hoveredPart);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-indigo-300 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-indigo-600" />
          <h3 className="text-sm font-semibold text-indigo-900">Interactive Formula Explorer</h3>
        </div>
        {selectedPart && (
          <button
            onClick={() => {
              setSelectedPart(null);
              if (onPartClick) onPartClick(null);
            }}
            className="text-indigo-600 hover:text-indigo-800"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-indigo-200 mb-3">
        <p className="text-base font-mono text-gray-800 leading-relaxed">
          {renderFormula()}
        </p>
        <p className="text-xs text-gray-500 mt-2 italic">
          Click on highlighted parts to learn more
        </p>
      </div>

      {(selectedPartData || hoveredPartData) && (
        <div className="bg-white p-4 rounded-lg border-2 border-indigo-400 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {(selectedPartData || hoveredPartData).id}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-indigo-900 mb-1">
                {(selectedPartData || hoveredPartData).name}
              </h4>
              <p className="text-sm text-gray-700 mb-2">
                {(selectedPartData || hoveredPartData).description}
              </p>
              {(selectedPartData || hoveredPartData).example && (
                <div className="bg-indigo-50 p-2 rounded mt-2">
                  <p className="text-xs font-semibold text-indigo-700 mb-1">Example:</p>
                  <p className="text-xs font-mono text-indigo-800">
                    {(selectedPartData || hoveredPartData).example}
                  </p>
                </div>
              )}
              {(selectedPartData || hoveredPartData).geometric && (
                <div className="bg-purple-50 p-2 rounded mt-2">
                  <p className="text-xs font-semibold text-purple-700 mb-1">Geometric Meaning:</p>
                  <p className="text-xs text-purple-800">
                    {(selectedPartData || hoveredPartData).geometric}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

