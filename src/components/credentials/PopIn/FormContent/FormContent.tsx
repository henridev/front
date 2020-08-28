import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useTypedSelector } from '../../../../services/hooks/useTypedSelector';
import FormInput from '../FormInput/FormInput';
import FormSelect from '../FormSelect/FormSelect';
import './FormContent.css';
import { getNewUser, getRoleNameById, initState, validateForm } from './Helper';
import { shallowEqual } from 'react-redux';
import { useCredentialPopIn } from '../../../../services/hooks/UseCredentialPopIn';

export type State = {
  validated: boolean;
  employeeId: string;
  roleName: string;
  line: string;
  organisation: string;
};

export default function FormContent() {
  let lineList = useTypedSelector(({ lineState: { lines } }) => lines, shallowEqual);
  const roleList = useTypedSelector(({ roleState: { roles } }) => roles, shallowEqual);

  const [selectedUser, validating] = useTypedSelector(
    (state) => [
      state.credentialPopInState.selectedUser
        ? state.credentialPopInState.selectedUser
        : { id: -1 },
      state.credentialPopInState.meta.validating,
    ],
    shallowEqual,
  );

  const [state, setState] = useState<State>(initState(selectedUser, roleList, lineList));
  let ref = React.createRef<HTMLFormElement>();

  const { unvalidateCredentialPopIn, submitCredentialPopIn } = useCredentialPopIn();

  useEffect(() => {
    if (validating) handleSubmit();
  }, [validating]);

  /**
   * Handles submit event
   * Checks if form is valid
   * if valid, call submitCredentialPopIn for fetch request
   * else, it resets validation state to false via hook
   */
  const handleSubmit = async () => {
    try {
      // Show validation styles in form
      setState({ ...state, validated: true });
      if (!validateForm(ref)) {
        return;
      }
      submitCredentialPopIn(getNewUser(selectedUser.id, roleList, state));
    } finally {
      unvalidateCredentialPopIn();
    }
  };
  /**
   * Handles input changes by updating state
   */
  const handleChange = (event: any, property: string) => {
    if (!event || !event.target) return;
    setState({ ...state, [property]: event.target.value });
  };

  return (
    <>
      <Form noValidate validated={state.validated} ref={ref}>
        <FormInput
          label="Matricule"
          defaultValue={selectedUser.registration_number}
          onChange={(e: any) => handleChange(e, 'employeeId')}
          upperCase
        />
        <FormSelect
          label="Rôle"
          defaultValue={getRoleNameById(selectedUser.roles, roleList)}
          data={roleList.map((role) => role.name)}
          onChange={(e: any) => handleChange(e, 'roleName')}
        />
        <FormSelect
          label="Ligne"
          defaultValue={selectedUser.line_id}
          data={lineList}
          onChange={(e: any) => handleChange(e, 'line')}
        />
        <FormInput
          label="Entreprise"
          defaultValue={selectedUser.organisation}
          onChange={(e: any) => handleChange(e, 'organisation')}
        />
      </Form>
    </>
  );
}
