import { useState, useEffect } from 'react';
import './table.css'
import {FaTrash, FaPencilAlt} from 'react-icons/fa'
const Table = ({columns, data, checkAll, actions, actionItems}) => {
    // console.log( "atable data", data, Array(data?.length || 0)?.keys())
    const [checkedAll, setCheckedAll] = useState(false);
    const [checked, setChecked] = useState({})

    useEffect(() => {

        let temp = data?.map(i => ([i.id, false]))
        temp  = Object.fromEntries(temp)
        setChecked(temp)

    }, [])

    const toggleCheck = (inputName) => {
        setChecked((prevState) => {
          const newState = { ...prevState };
          newState[inputName] = !prevState[inputName];
          return newState;
        });
      };

    const selectAll = (value) => {
    setCheckedAll(value);
    setChecked((prevState) => {
        const newState = { ...prevState };
        for (const inputName in newState) {
        newState[inputName] = value;
        }
        return newState;
    });
      };

    useEffect(() => {
    let allChecked = true;
    for (const inputName in checked) {
        
        if (checked[inputName] === false) {
         allChecked = false;
        }
    }
    if (allChecked) {
        setCheckedAll(true);
    } else {
        setCheckedAll(false);
    }
      }, [checked]);
     
    return (
    <>
        <table className='table' cellPadding={0} cellSpacing={0} border={0}>
             <thead>
                 {
                     checkAll && (<th align="left"><input type={"checkbox"} name='table-data' onChange={(e) => selectAll(e.target.checked)}   checked={checkedAll}/></th>)
                 }
                 <th> Sl.No</th>
                {
                    
                    columns?.map((i) => (   
                        <th>{i?.label}</th>
                    ))

                }
                {
                    actions && (<th>Actions</th>)
                }
            </thead>
            <tbody>
                {
                   data?.map((i, index) => {
                      // console.log(((index + 1) % 2) == 0 );
                       return (
                       <tr key={i.id} className={((index + 1) % 2) == 0 ? "evenRow" : 'oddRow'}>
                            {
                                checkAll && (<td align="left"><input id={i.id} type={"checkbox"} name='table-data' onChange={() => toggleCheck(i.id)} checked={checked[i?.id]}/></td>)
                            }
                           <td align="left">{index + 1}</td> 
                           {
                               columns?.map((c) => { 
                                   return (
                                         <td align="left">{i[c?.dataIndex]}</td>
                                   )})
        
                           }
                           
                           {
                               actions && ( <div className='flex-row' style={{justifyContent:'center', alignItems:'center',padding:"0.4rem"}}>
                                                {
                                                    actionItems?.delete && (<td align='center'><div className='pointer-hover' style={{marginRight:'1rem'}} onClick={() => actionItems?.deleteCallBack(i.id)}><FaTrash color="rgb(73,80,87)" size={17}/></div></td>)
                                                }
                                                {
                                                    actionItems?.edit && (<td align='center'><div className='pointer-hover' onClick={() => actionItems?.editCallBack(i.id)}><FaPencilAlt color="rgb(73,80,87)" size={17} /></div></td>)
                                                }         
                                            </div>)
                           }
                       </tr>)
                   } )
                }
            </tbody>
        </table>
    
    </>)
}

export default Table