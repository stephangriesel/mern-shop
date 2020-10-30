import React from 'react';
import { Container } from 'react-bootstrap'
import Header from './components/Header';
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <Header></Header>
      <main className="py-4" >
        <Container>
          <h1>Test</h1>
        </Container>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
