
export function Container({children}) {


    return (
        <div style={{border: '1px solid black', padding: '10px', borderRadius:'20px'}}>
            {children}
        </div>
    );
}