import React from 'react';

const ChoiceButton = ({ label, value, selected, onSelect, disabled = false }) => {
  const handleClick = () => {
    if (!disabled) {
      onSelect(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !disabled) {
      e.preventDefault();
      onSelect(value);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-pressed={selected}
      role="button"
      className={`choice-btn ${selected ? 'selected' : ''}`}
    >
      {label}
    </button>
  );
};

export default ChoiceButton;
