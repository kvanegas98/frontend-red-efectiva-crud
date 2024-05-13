
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Container from 'react-bootstrap/Container'
import GridLayout from './pages/Home/Grid';
import Navbar from './Layout/Navbar';


function App() {
  return (
    <div>
      <Container fluid>
        <Navbar />
        <GridLayout />
      </Container>
    </div>
  );
}

export default App;
