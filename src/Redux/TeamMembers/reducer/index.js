import { data , companies} from "../../../Views/TeamMembers/data";
import { CREATE_MEMBER } from "../types";

const initialState = {
    members: data,
    companies
}

const membersReducer = (state = initialState, action) => {
    switch(action?.type) {
        case CREATE_MEMBER:
            return {...state, members: action.payload}
        default:
            return state
    }
}

export default membersReducer