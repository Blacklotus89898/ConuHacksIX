
export function Container({children}) {

    return (
        <div style={{border: '1px solid black', padding: '10px', borderRadius:'20px', flex:'1 1 0'}}>
            {children}
        </div>
    );
}