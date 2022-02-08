import './button.css'
const Button = ({endIcon, height, width, title, style, onClick}) => {

    return (
        <>
            <div className="button" style={
                {
                    height, 
                    width,
                    justifyContent: endIcon ? 'space-between' : 'center' ,
                    borderRadius:height,
                    ...style
                }}
                    onClick={() => onClick()}
                >
                <p>{title}</p>
               {
                   [endIcon]
               }
            </div>
        </>
    )

}

export default Button