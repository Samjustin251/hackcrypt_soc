import { useState, useEffect, useRef } from 'react';

export const useWebSocket = (url) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('disconnected'); // connecting, connected, disconnected
    const ws = useRef(null);

    useEffect(() => {
        let reconnectInterval;

        const connect = () => {
            setStatus('connecting');
            ws.current = new WebSocket(url);

            ws.current.onopen = () => {
                console.log('WS Connected');
                setStatus('connected');
            };

            ws.current.onmessage = (event) => {
                const message = JSON.parse(event.data);
                setMessages((prev) => {
                    const newLogs = [message, ...prev];
                    return newLogs.slice(0, 500); // Keep last 500 for better charts
                });
            };

            ws.current.onclose = () => {
                console.log('WS Disconnected');
                setStatus('disconnected');
                // Auto-reconnect for hackathon "robustness"
                reconnectInterval = setTimeout(connect, 3000);
            };

            ws.current.onerror = (err) => {
                console.error('WS Error:', err);
                ws.current.close();
            };
        };

        connect();

        return () => {
            if (ws.current) ws.current.close();
            clearTimeout(reconnectInterval);
        };
    }, [url]);

    return { messages, status };
};
