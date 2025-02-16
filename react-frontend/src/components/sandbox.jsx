import bridgeService from '../services/bridge';
import { useRef, useState, useEffect } from 'react';

export function Sandbox() {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    // useEffect(() => {
    //     const canvas = canvasRef.current;
    //     const ctx = canvas.getContext('2d');
    //     const resizeCanvas = () => {
    //         const ratio = window.devicePixelRatio || 1;
    //         canvas.width = document.body.clientWidth * ratio;
    //         canvas.height = document.body.clientHeight * ratio;
    //         canvas.style.width = `${document.body.clientWidth}px`;
    //         canvas.style.height = `${document.body.clientHeight}px`;
    //         ctx.scale(ratio, ratio);
    //     };
    //     resizeCanvas();
    //     window.addEventListener('resize', resizeCanvas);

    //     return () => {
    //         window.removeEventListener('resize', resizeCanvas);
    //     };
    // }, []);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
    };

    const stopDrawing = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.closePath();
        setIsDrawing(false);
    };

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
        </div>
    );
}