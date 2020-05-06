import React, { useState, useEffect } from 'react';
import './../styles/app.css';

const themeButton = {
  marginTop: '20px',
  display: 'block',
} as React.CSSProperties;

const themeBar = {
  marginTop: '20px',
  display: 'block',
  textAlign: 'right'
} as React.CSSProperties;

const disabled = {
  display: 'none',
} as React.CSSProperties;



function Theme(props) {

  const [themeStyle, setThemeStyle] = useState(disabled);
  const [buttonStyle, setButtonStyle] = useState(themeButton);


  useEffect(() => {

    const script = document.createElement('script');

    script.type = "text/javascript"
    script.innerHTML = `
      var originalSetTheme = fluid.theme;

      fluid.theme = function(value) {
        alert(value);
        originalSetTheme(value);

        ${ showThemeHandler }();
      };
    `;

    document.body.appendChild(script);

    // eslint-disable-next-line
  }, []);



  const showThemeHandler = e => {
    if (themeStyle === disabled) {
      setThemeStyle(themeBar);
      setButtonStyle(disabled);
    } else {
      setButtonStyle(themeBar);
      setThemeStyle(disabled);
    }
  }

  return (<>
    <div className="btns row themeSelector" style={themeStyle}></div>
    <div className="btn" style={buttonStyle} onClick={showThemeHandler}>Change Theme</div>
  </>);
}


export default Theme;
