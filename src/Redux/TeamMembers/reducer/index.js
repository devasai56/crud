import { data , companies, status} from "../../../Views/TeamMembers/data";
import { CREATE_MEMBER, DELETE_MEMBER, GET_ALL_MEMBERS, GET_MEMBERBY_ID, UPDATE_MEMBER } from "../types";

const initialState = {
    members: data,
    companies,
    status
}

const membersReducer = (state = initialState, action) => {
    switch(action?.type) {
        case CREATE_MEMBER:
            return {...state, members: [...state.members, action.payload]}
        case GET_ALL_MEMBERS:
            return {...state}
        case DELETE_MEMBER:
            return {...state, members:action.payload}
        case GET_MEMBERBY_ID:
            return{...state, member:action.payload}
        case UPDATE_MEMBER:
            return {...state, members:action.payload, member:[]}
        default:
            return state
    }
}

export default membersReducer