import React, { useState, useEffect } from 'react';
import './../styles/app.css';

const enabled = {
  display: 'block',
  textAlign: 'center'
} as React.CSSProperties;

const disabled = {
  display: 'none',
} as React.CSSProperties;



function Theme(props) {

  const [themeStyle, setThemeStyle] = useState(enabled);
  const [buttonStyle, setButtonStyle] = useState(disabled);

  useEffect(() => {

    window["themeHandlerClient"] = showThemeHandler;

    const script = document.createElement('script');

    script.type = "text/javascript"
    script.innerHTML = `
      var originalSetTheme = fluid.theme;

      fluid.theme = function(value) {
        window["themeHandlerClient"]();
        originalSetTheme(value);
      };
    `;

    document.body.appendChild(script);

    // eslint-disable-next-line
  }, []);



  const showThemeHandler = () => {
    if (themeStyle === disabled) {
      setThemeStyle(enabled);
      setButtonStyle(disabled);
    } else {
      setButtonStyle(enabled);
      setThemeStyle(disabled);
    }
  }

  return (<>
    <br/>
    <div className="btns row themeSelector" style={themeStyle}></div>
    <div className="btn" style={buttonStyle} onClick={showThemeHandler}>Change Theme</div>
  </>);
}


export default Theme;
