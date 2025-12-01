import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Button } from '@mantine/core';

function App() {
    
   return (
    <MantineProvider>
        <Notifications />
        <div style={{ padding: '20px' }}>
        
        <h1>Frontend OK - React 19 + TypeScript + Mantine</h1>
        <Button>Botão Mantine Funcionando</Button>
        </div>
    </MantineProvider>
  );
}

export default App
