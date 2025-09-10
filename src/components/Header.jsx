import '../styles/Header.css';

export default function Header() {
    return (
        <header className="App-header">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/docs">Docs</a></li>
            </ul>
        </header>
    );
}
