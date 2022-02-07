import './modal.css'
import {FaTimes}  from 'react-icons/fa'
const Modal = ({title, children, setVisible, visible}) => {
    return (
    <>
        <div className='modal' style={{display: !visible ? 'none' : 'block'}}>

            <div className='mHeader'>
                <div style={{fontWeight:'600', fontSize:'1rem'}}>{title}</div>
                <div className='cross'>
                     <FaTimes size={20} color='gray' onClick={() => setVisible(false)}/>
                </div>
            </div>
            <div className='mBody'>
                {
                    [children]
                }           
            </div>

        </div>

    </>)
}

export default Modal