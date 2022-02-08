import { CREATE_MEMBER, DELETE_MEMBER, GET_ALL_MEMBERS, GET_MEMBERBY_ID, UPDATE_MEMBER } from "../types";
import {store} from '../../store'
import moment from "moment";

export const  createMember = (data, id) => dispatch => {
    console.log(id)
    let storeData  = store.getState()
    let members = storeData.members.members

        dispatch({
            type:CREATE_MEMBER,
            payload:{...data, id: `${members.length}${moment().format()}`}
        })
 
}

export const updateMember = (data, id) => dispatch => {
    let storeData  = store.getState()
    let members = storeData.members.members
    members = members.filter(i => i.id != id)
    members = [...members, data]
    dispatch({
        type:UPDATE_MEMBER,
        payload:members
    })
    

}

export const getAllMembers = () => dispatch => {
    //let members = useSelector(state => state.members.members)
    let storeData  = store.getState()
    dispatch({
        type:GET_ALL_MEMBERS,
        payload: storeData.members.members
    })

}

export const getMemberById = (id) => dispatch => {
    //let members = useSelector(state => state.members.members)
    let storeData  = store.getState()
    let members = storeData.members.members
    members = members.filter(i => i.id == id)
    dispatch({
        type:GET_MEMBERBY_ID,
        payload: members
    })

}

export const deleteMember = (id) => dispatch => {
    let storeData  = store.getState()
    let members = storeData.members.members
    members = members.filter(i => i.id != id)
    dispatch({
        type:DELETE_MEMBER,
        payload: members
    })

}