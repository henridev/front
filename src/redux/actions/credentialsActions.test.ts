import {
  REQUEST_CREDENTIALS,
  RESPONSE_CREDENTIALS,
  ERROR_CREDENTIALS,
} from "../types/credentialsTypes";
import { authorityMock } from "../../../__mocks__/mockstate";
import credentialsActions from "./credentialsActions";
/**
 * TEST-SUITE - CREDENTIALS ACTIONS
 */

describe("CREDENTIALS ACTIONS", () => {
  it("should create a REQUEST_CREDENTIALS action", () => {
    const expectedAction = {
      type: REQUEST_CREDENTIALS,
    };
    expect(credentialsActions.requestCredentials()).toEqual(expectedAction);
  });

  it("should create a ERROR_CREDENTIALS action", () => {
    const errorInfo = "error loading rolling stock";
    const expectedAction = {
      type: ERROR_CREDENTIALS,
      errorInfo,
    };
    expect(credentialsActions.errorCredentials(errorInfo)).toEqual(
      expectedAction
    );
  });

  it("should create a RESPONSE_CREDENTIALS action", () => {
    const authorityDTO = authorityMock;
    const expectedAction = {
      type: RESPONSE_CREDENTIALS,
      authorityDTO,
    };
    expect(credentialsActions.responseCredentials(authorityDTO)).toEqual(
      expectedAction
    );
  });
});
