import bridgeService from '../services/bridge';

export function Sandbox() {
    const handleClick = async () => {
        console.log('Button clicked');
        try {
            const data = await bridgeService.getBridges();
            console.log(data);
        } catch (error) {
            console.error('Error fetching bridges:', error);
        }
    };

    return (
        <div>
            <h1>Sandbox</h1>
            <button onClick={handleClick}>Click me</button>
            <button href='../assets/test.csv' download>Click to download</button>
        </div>
    );
}