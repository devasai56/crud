import "./index.css";
import { FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Button from "../../Components/Button";
import Modal from "../../Components/Modal";
import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../Components/DropDown";
import { createMember, deleteMember, getAllMembers, getMemberById, updateMember } from "../../Redux/TeamMembers/actions";
import moment from "moment";

const TeamMembers = (props) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch()

  const data = useSelector((state) => state.members.members);
  const member = useSelector((state) => state.members.member) || [];
  const companies = useSelector((state) => state.members.companies);
  const status = useSelector((state) => state.members.status);
  const [formdata, setFormData] = useState({name:'', company:'', status:'', notes:''})

  const [members, setMembers] = useState(data);
  const [toggleStatus, setToggleStatus]  = useState(false)
  const [memberid, setMemberId] = useState('')

  useEffect(() => {
        //dispatch(getAllMembers())
        setMembers(data)
  }, [data])

  useEffect(() => {
    if (member?.length > 0) 
    {
        setFormData(member[0])
    }
    
  }, [member])

  const columns = [
    {
      label: "Name",
      dataIndex: "name",
    },
    {
      label: "Company",
      dataIndex: "company",
    },
    {
      label: "Status",
      dataIndex: "status",
    },
    {
      label: "Last Updated",
      dataIndex: "lastUpdated",
    },
    {
      label: "Notes",
      dataIndex: "notes",
    },
  ];

  const onButtonClick = () => {
      setMemberId('')
    setVisible(true);
  };

  useEffect(() => {
        setMembers(members?.sort(i => i.status == (toggleStatus ? 'Active' : 'Closed') ? -1 : 1))
  }, [toggleStatus])

  const onSelectCall = (selected, options, verifyKey) => {
   
    let company = [];
    let count = 0;
    for (let key in selected) {
      if (selected[key]) {
        company.push(options?.filter((i) => i.value == key)[0]?.label);
      } else {
        count++;
      }
    }
    if (count == Object.keys(selected)?.length) {
      setMembers(data);
    } else {
      setMembers(data?.filter((i) => company.includes(i[verifyKey])));
    }
  };

  const deleteCallBack = (id) => {
      console.log(id);
      dispatch(deleteMember(id))
      dispatch(getAllMembers())
  }

  const editCallBack = (id) => {
      
    dispatch(getMemberById(id))
    setVisible(true)
    setMemberId(id)
  }

  const saveUpdateMember = () => {
    if(memberid)
    {
        dispatch(updateMember({...formdata, lastUpdated: moment().format('D/MM/YYYY')}, memberid))

    }
    else
    {
        dispatch(createMember({...formdata, lastUpdated: moment().format('D/MM/YYYY')}))
    }
    
    dispatch(getAllMembers())
    setFormData({name:'', company:'', status:'', notes:''})
    setVisible(false)
  }

  return (
    <>
      <div className="container">
        <div className="titleHeader">
          <p className="headerText">Team Members</p>
          <Button
            height={"1.2rem"}
            width={"8rem"}
            endIcon={<FaPlus color="white" />}
            title={"Add Members"}
            onClick={onButtonClick}
            style={{ color: "white" }}
          ></Button>
        </div>
        <div className="dropDownDiv">
          <div className="flex-row">
            <Select
              height={"1.2rem"}
              width={"8rem"}
              title="Companies"
              style={{ marginRight: "0.5rem" }}
              multiselect={true}
              options={companies}
              onSelectCall={onSelectCall}
              verifyKey="company"
            />
            <Button
              height={"1.2rem"}
              width={"8rem"}
              endIcon={<FaChevronDown color="black" />}
              title={"Status"}
              onClick={() => setToggleStatus(!toggleStatus)}
              style={{
                backgroundColor: "white",
                border: "1px solid rgb(211,211,211)",
                borderRadius: "0.3rem",
                color: "black",
              }}
            ></Button>
          </div>
        </div>
        {
          <Modal title={"Add Member"} setVisible={setVisible} visible={visible}>
            <form >
              <div className="formDiv">
                <br />
                <label for="name">Name:</label>
                <br />
                <input type="text" id="name" name="name" onChange={(e) => setFormData({...formdata, name: e.target.value})} value={formdata.name}/>
                <br />
                <label for="company">Company:</label>
                <br />
                <input type="text" id="company" name="company"  onChange={(e) => setFormData({...formdata, company: e.target.value})} value={formdata.company}/>
                <br />
                <label for="status">Status:</label>
                <br />
                <input type="text" id="status" name="status"  onChange={(e) => setFormData({...formdata, status: e.target.value})} value={formdata.status}/>
                <br />
                <label for="notes">Notes:</label>
                <br />
                <input type="text" id="notes" name="notes"  onChange={(e) => setFormData({...formdata, notes: e.target.value})} value={formdata.notes}/>
                <br />
                <br />
                <Button
                  height={"1.2rem"}
                  width={"4rem"}
                  title={"Save"}
                  style={{ justifySelf: "end" }}
                  onClick={saveUpdateMember}
                />
              </div>
            </form>
          </Modal>
        }
        <Table
          columns={columns}
          data={members}
          checkAll={true}
          height={"1.2rem"}
          width={"8rem"}
          actions={true}
          actionItems={{delete:true, deleteCallBack, edit:true, editCallBack}}
        />
      </div>
    </>
  );
};

export default TeamMembers;
