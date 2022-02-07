import { useState, useEffect } from 'react'
import {FaChevronDown} from 'react-icons/fa'
import './dropdown.css'
const Select = ({height, width, title, style, options, onSelectCall}) => {

    const [visible, setVisible] = useState(false)

    const [checkedAll, setCheckedAll] = useState(false);
    const [checked, setChecked] = useState({})

    useEffect(() => {
        if(options?.length > 0) {
            let temp = options?.map(i => ([i.value, false]))
            temp  = Object?.fromEntries(temp)
            setChecked(temp)

        }
        

    }, [options])

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
        setVisible(false)
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
    onSelectCall && onSelectCall(checked)
      }, [checked]);
     

    console.log(visible)

    return (
    <>
        <div>
                <div className="dropdown pointer-hover" onClick={() => setVisible(!visible)} style={{...style, height, width}}>

                    <div>{title}</div>
                    <FaChevronDown /> 
                </div>
               { visible && (<div className='optionDiv'>
                    <div className='flex-row options'>

                        <input type={"checkbox"} onChange= {(e) => selectAll(e.target.checked) } checked={checkedAll} />
                        <label style={{paddingLeft:"0.5rem"}}>Select All</label>

                    </div>
                    {
                        options?.map(i => (
                            <div className='flex-row options'>

                                <input type={"checkbox"} onChange={() => toggleCheck(i.value)} checked={checked[i.value]}/>
                                <label style={{paddingLeft:"0.5rem"}}>{i.label}</label>

                            </div>
                        ))
                    }
                </div>) }
        </div>
            
    </>)
}

export default Select