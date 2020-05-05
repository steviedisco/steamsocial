import React, { useState } from 'react';

const block = {
  display: 'block',
} as React.CSSProperties;

const inline = {
  display: 'inline',
} as React.CSSProperties;

const pointer = {
  cursor: 'pointer'
} as React.CSSProperties;



function UserAdd(props) {

  const [showTheme, setShowTheme] = useState(false);

  const showThemeHandler = e => {
    setShowTheme(!showTheme);
  }

  return (
    {
      showTheme ?
      <div className="btns row themeSelector" style={themeBar}></div> :
      <div className="btn" style={block} onClick={showThemeHandler}>Change Theme</div>
    }
  );
}

export default UserAdd;
