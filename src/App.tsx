import React, {CSSProperties} from 'react';
import GridLayout from './grid-layout';
import Slot from './slot';
import './App.css';

function App() {
  const myStyle = {
    display: '-ms-grid',
    msGridRows: '200px 200px',
    msGridColumns: '200px 200px',
  };

  const getGrid = (row: number, column: number) => ({
    msGridRow: row, // TypeScript doesn't recognize this CSS property
    msGridColumn: column // TypeScript doesn't recognize this CSS property
  });

  const foo: CSSProperties = {};

  return (
    <div>
      <h1>React Grid Layout</h1>

      <div className="my-grid">
        <div className="a">A</div>
        <div className="b">B</div>
        <div className="c">C</div>
        <div className="d">D</div>
      </div>

      <div style={myStyle}>
        {/*
        // @ts-ignore */}
        <div className="a2" style={getGrid(2, 2)}>A</div>
        {/*
        // @ts-ignore */}
        <div className="b2" style={getGrid(2, 1)}>B</div>
        {/*
        // @ts-ignore */}
        <div className="c2" style={getGrid(1, 1)}>C</div>
        {/*
        // @ts-ignore */}
        <div className="d2" style={getGrid(1, 2)}>D</div>
      </div>

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
    </div>
  );
}

export default App;
