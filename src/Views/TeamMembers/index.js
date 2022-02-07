import './index.css'
import {FaPlus} from 'react-icons/fa'
import Button from '../../Components/Button';
import Modal from '../../Components/Modal';
import { useState } from 'react';
import Table from '../../Components/Table';
import { useSelector } from 'react-redux';
import Select from '../../Components/DropDown';

const TeamMembers = (props) => {
    const [visible, setVisible] = useState(false)
    
    const data = useSelector(state => state.members.members)
    const companies = useSelector(state => state.members.companies)
    const [members, setMembers] = useState(data)
    const columns = [
        {
            label:'Name',
            dataIndex:'name'
        },
        {
            label:'Company',
            dataIndex:'company'
        },
        {
            label:'Status',
            dataIndex:'status'
        },
        {
            label:'Last Updated',
            dataIndex:'lastUpdated'
        },
        {
            label:'Notes',
            dataIndex:'notes'
        }
    ]
    
    const onButtonClick = () => {
        setVisible(true)
    }
    const onSelectCall = (selected) => {

        console.log(selected);
        let company = []
        let count =0
        for(let key in selected) {

            if (selected[key]) 
            {
                company.push(companies?.filter(i => i.value == key)[0]?.label)
            }
            else
            {
                count++
            }

        }
        if(count == data?.length)
        {
            setMembers(data)
            
        }
        else{
            setMembers(data?.filter(i => company.includes(i.company)))
        }
       

    }
    return (
    <>
        <div className='container'>
            <div className='titleHeader'>
                <p className='headerText'>Team Members</p>
                <Button height={"1.2rem"} width={"8rem"} endIcon={<FaPlus color='white'/>} title={"Add Members"} onClick={onButtonClick}></Button>
            </div>
            <div className='dropDownDiv'>
                <div className='flex-row'>
                    <Select height={"1.2rem"} width={"8rem"} title="Companies" style={{marginRight:"0.5rem"}} multiselect={true} options={companies} onSelectCall={onSelectCall}/>
                    <Select height={"1.2rem"} width={"8rem"} title="Status"/>
                </div>
            </div>
           { <Modal title={"Add Member"} setVisible={setVisible} visible={visible}>
                
                    <form>
                        <div className='formDiv'>
                            <br/><label for="name">Name:</label><br />
                            <input type="text" id="name" name="name"  /><br/>
                            <label for="company">Company:</label><br />
                            <input type="text" id="company" name="company" /><br/>
                            <label for="status">Status:</label><br />
                            <input type="text" id="status" name="status"  /><br/>
                            <label for="notes">Notes:</label><br />
                            <input type="text" id="notes" name="notes"  />
                            <br/><br/>
                            <Button height={"1.2rem"} width={"4rem"} title={"Save"} style={{justifySelf:'end'}}/>
                        </div>
                    </form>
               
            </Modal>
           }
           <Table columns = {columns} data={members} checkAll={true} height={"1.2rem"} width={"8rem"}/>
        </div>
    
    </>)
}

export default TeamMembers