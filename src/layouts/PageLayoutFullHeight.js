export default function PageLayoutFullHeight({ children }) {
    return (
        <div style={{ display: 'flex', flexDirection:'column', height: `calc(100vh - 65px)`, width: '100%' }}>
            { children }
        </div>
    );
}