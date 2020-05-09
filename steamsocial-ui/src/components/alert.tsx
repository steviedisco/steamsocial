import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popup from "reactjs-popup";
import styled from 'styled-components';

import './../styles/app.css';


const StyledPopup = styled(Popup)`
  &-overlay {
   ...
  }
  // use your custom style for ".popup-content"
  &-content {
   width: auto !important;
   font-size: 30px !important;
   color: #3D4F66 !important;
   font-family: var(--textFont) !important;
   background-color: #eee !important;
   padding: 15px !important;
   text-align: center !important;
   font-weight: bold !important;
  }
`

export default function Alert(props) {

  let { content, onClose } = props;

  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  }
  const closeModal = () => {
    setOpen(false);
    onClose();
  }

  useEffect(() => {
    if (content !== '') {
      openModal();
    }
  // eslint-disable-next-line
  }, [content]);

  return (
    <div>
      <StyledPopup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}>
        {content}
      </StyledPopup>
    </div>
  );
}

Alert.propTypes = {
  content: PropTypes.any.isRequired,
  onClose: PropTypes.any.isRequired
};
