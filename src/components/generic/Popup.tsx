import React, { FC, ReactElement, memo } from 'react';
import { useTypedSelector } from '../../services/hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { hidePopup } from '../../redux/actions/popupActions';
import ButtonCustom from './ButtonCustom';
import './Popup.css';

export enum PopupType {
  apiError = 'API_ERROR',
  postSuccess = 'POST_SUCCESS',
  invalidEntry = 'INVALID_ENTRY',
  none = 'none',
}

const Popup: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const { isVisible, message, popupType } = useTypedSelector(({ popupState }) => popupState);

  let popStylingClass = '';
  let title = '';
  switch (popupType) {
    case PopupType.apiError:
      popStylingClass = 'popup-error';
      title = 'api error';
      break;
    case PopupType.postSuccess:
      popStylingClass = 'popup-succes';
      title = 'success';
      break;
    case PopupType.invalidEntry:
      popStylingClass = 'popup-danger';
      title = 'attention';
      break;
    default:
      break;
  }

  const dismissError = () => dispatch(hidePopup());

  return (
    <>
      {isVisible && (
        <div id="popup-container" className="font-paris">
          <div id="popup" className={`${popStylingClass}`}>
            <h3 className={`m-3`}>{title}</h3>
            <div className={`m-3`}>{message}</div>
            <span className={`m-3`}>
              <ButtonCustom action={dismissError} type="default" text={'close'} />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(Popup);
