import { useSelector /* , shallowEqual */ } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { RootState } from "../../redux/reducers";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// function useShallowTypesSelector(selector: (state: RootState) => unknown) {
//   return useTypedSelector(selector, shallowEqual);
// }

// export default useShallowTypeSelector;
