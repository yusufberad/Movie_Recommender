import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const AutoComplete = ({ options = [], value, placeholder, onChange }) => {
  const autocomplete = useRef();

  const [optionsData, setOptionsData] = useState([]);
  const [query, setQuery] = useState(value);
  const [isShow, setIsShow] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleInputChange = (v) => {
    setQuery(v);
    onChange(v);
    if (v === "") {
      setOptionsData([]);
    } else {
      const filteredOptions = options.filter((item) =>
        item.toLowerCase().includes(v.toLowerCase())
      );
      setOptionsData(filteredOptions);
      setHighlightedIndex(-1);
    }
  };

  const handleClickOutside = (e) => {
    if (autocomplete.current && !autocomplete.current.contains(e.target)) {
      setIsShow(false);
    }
  };

  const highlightSearchText = (text) => {
    const pattern = new RegExp(`(${query})`, "gi");
    const newText = text.replace(pattern, `<b>${query}</b>`);
    return newText;
  };

  const handleKeyDown = (e) => {
    if (isShow) {
      if (e.key === "ArrowDown") {
        setHighlightedIndex((prevIndex) =>
          prevIndex < optionsData.length - 1 ? prevIndex + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : optionsData.length - 1
        );
      } else if (e.key === "Enter") {
        if (highlightedIndex >= 0 && highlightedIndex < optionsData.length) {
          const selectedItem = optionsData[highlightedIndex];
          setQuery(selectedItem);
          setIsShow(false);
          onChange(selectedItem);
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsShow(optionsData.length !== 0);
  }, [optionsData]);

  return (
    <Wrapper ref={autocomplete}>
      <InputField
        type="search"
        value={query}
        placeholder={placeholder}
        isSearch={true}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {isShow && (
        <ListWrapper>
          {optionsData.map((item, index) => (
            <ListItem
              key={index}
              onClick={() => {
                setQuery(item);
                setIsShow(false);
                onChange(item);
              }}
              isHighlighted={index === highlightedIndex}
            >
              <div dangerouslySetInnerHTML={{ __html: highlightSearchText(item) }} />
            </ListItem>
          ))}
        </ListWrapper>
      )}
    </Wrapper>
  );
};

export default AutoComplete;

const Wrapper = styled.div`
  position: relative;
  min-width: 320px;
`;

const InputField = styled.input`
  position: relative;
  width: 100%;
  font-size: 14px;
  color: #000;
  border-radius: 8px;
  padding: 0 12px;
  height: 44px;
  outline: none;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 0.5rem;
  position: absolute;
  top: 44px;
  z-index: 10;
  background: #fff;
  border-radius: 4px;
  width: 100%;
  max-height: 240px;
  overflow-y: auto;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const ListItem = styled.button`
  text-align: left;
  padding: 16px 8px;
  width: 100%;
  background: ${(props) => (props.isHighlighted ? "#e2e2e2" : "#fff")};
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    background: #e2e2e2;
  }
`;
