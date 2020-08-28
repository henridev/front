import { authorityMock } from '../../../__mocks__/mockstate';
import { initCredentialsState } from '../config/initialState';
import { credentialsReducer } from './credentialsReducer';
import {
  requestCredentials,
  responseCredentials,
  errorCredentials,
} from '../actions/credentialsActions';
import { CredentialsState } from '../types/credentialsTypes';
import { loadingState, loadingResponseState, loadingErrorState } from './apiStates';

/**
 * TEST-SUITE - CREDENTIALS REDUCER
 */
describe('CREDENTIALS REDUCER', () => {
  const expectedStateRequest: CredentialsState = {
    ...initCredentialsState,
    meta: loadingState,
  };
  const expectedStateResponse: CredentialsState = {
    ...initCredentialsState,
    credentials: authorityMock,
    meta: loadingResponseState,
  };
  const expectedStateisError: CredentialsState = {
    ...initCredentialsState,
    meta: {
      ...loadingErrorState,
      errorInfo: '500 internal server isError',
    },
  };
  it('should handle REQUEST_CREDENTIALS', () => {
    expect(credentialsReducer(initCredentialsState, requestCredentials())).toEqual(
      expectedStateRequest,
    );
  });

  it('should handle RESPONSE_CREDENTIALS', () => {
    expect(credentialsReducer(expectedStateRequest, responseCredentials(authorityMock))).toEqual(
      expectedStateResponse,
    );
  });

  it('should handle isError_CREDENTIALS', () => {
    expect(
      credentialsReducer(expectedStateRequest, errorCredentials('500 internal server isError')),
    ).toEqual(expectedStateisError);
  });
});
