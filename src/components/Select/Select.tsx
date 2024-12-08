import React from 'react';
import './Select.css';
import ReactSelect, { Props } from 'react-select';
import { SelectOption } from '../../models/component';

interface SelectProps extends Props {
  height?: string | number;
  width?: string | number;
  value: SelectOption | null
}

const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  isSearchable,
  value,
  placeholder,
  noOptionsMessage,
  onInputChange,
  height = '55px',
  width = '100%'
}) => {
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      width: width,
      height: height,
      border: state.isFocused ? '1.5px solid #5664f5' : '1.5px solid #86868b',
      borderRadius: '6px',
      fontSize: '16px',
      padding: '0 1rem',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      '&:hover': {
        borderColor: state.isFocused ? '#5664f5' : '1.5px solid #86868b',
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#6e6e73',
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      marginLeft: '-2px',
      padding: value ? '16px 0 0 0' : '0',
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: 'none',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: '#86868b',
    }),
  };

  return (
    <div className={'visanto-select'}>
      {value && (
        <label className={`visanto-select-label`}>{placeholder}</label>
      )}
      <ReactSelect
        options={options}
        value={value}
        onChange={onChange}
        isSearchable={isSearchable}
        placeholder={placeholder}
        styles={customStyles}
        components={{ IndicatorSeparator: null }}
        noOptionsMessage={noOptionsMessage}
        onInputChange={onInputChange}
      />
    </div>
  );
};

export default Select;
