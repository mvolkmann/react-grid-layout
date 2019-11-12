import React from 'react';
import GridLayout from './grid-layout';
import Slot from './slot';
import './App.css';

function App() {
  return (
    <GridLayout
      gridTemplateColumns="300px 1fr 1fr 200px"
      gridTemplateRows="200px 200px"
      gridTemplateAreas={[
        'travel marketing marketing image',
        'travel content benefits image'
      ]}
    >
      <Slot name="benefits">Benefits</Slot>
      <Slot name="content">Content</Slot>
      <Slot name="image">Image</Slot>
      <Slot name="marketing">Marketing</Slot>
      <Slot name="travel">Travel</Slot>
    </GridLayout>
  );
}

export default App;
