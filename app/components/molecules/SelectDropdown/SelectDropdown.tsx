import React, { useState, useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

interface OptionType {
    label: string;
    value: string;
    url: string;
    target?: string;
}

interface SelectDropdownProps {
    options: OptionType[];
    placeholder?: string;
    onSelect?: (selectedOption: OptionType | string) => void;
    returnFullOption?: boolean; // new prop to determine behavior
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ options, placeholder, onSelect, returnFullOption = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const optionsRef = useRef<HTMLDivElement | null>(null);

    const { height } = useSpring({
        from: { height: 0 },
        to: { height: isOpen ? optionsRef.current?.scrollHeight : 0 }
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleOptionClick = (option: OptionType, event: React.MouseEvent) => {
        event.preventDefault();
        if (returnFullOption) {
            onSelect?.(option); 
        } else {
            // If you want to use only the label or value
            onSelect?.(option.value); // or option.label based on your needs
        }
        setSelectedOption(option);
        setIsOpen(false);
    };
    
    return (
        <div className={`custom-select ${isOpen ? 'active' : ''}`} ref={dropdownRef}>
            <div className="header" onClick={() => setIsOpen(!isOpen)}>
                {selectedOption?.label || placeholder || "Select"}
                <div className='icon'></div>
            </div>

            <animated.div className="options" ref={optionsRef} style={{ height }}>
                {options.map((option, idx) => (
                    <div key={idx} className="option">
                        <a href={option.url} target={option.target || "_self"} onClick={(event) => handleOptionClick(option, event)}>
                            {option.label}
                        </a>
                    </div>
                ))}
            </animated.div>
        </div>
    );
}

export default SelectDropdown;
