import { useSelector } from "react-redux";
import { CREATE_MEMBER } from "../types";

export const  createMember = (data) => dispatch => {
    let members = useSelector(state => state.members.members)
    members = [...members, data]
    dispatch({
        type:CREATE_MEMBER,
        payload:members
    })
}