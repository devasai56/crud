import './button.css'
const Button = ({endIcon, height, width, title, style, onClick}) => {

    return (
        <>
            <div className="button" style={
                {
                    ...style,
                    height, 
                    width,
                    justifyContent: endIcon ? 'space-between' : 'center' ,
                    borderRadius:height
                }}
                    onClick={() => onClick()}
                >
                <p style={{fontSize:'0.8rem', color:'white'}}>{title}</p>
               {
                   [endIcon]
               }
            </div>
        </>
    )

}

export default Button