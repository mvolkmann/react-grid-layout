import React, {ReactElement, useEffect, useRef} from 'react';
import {StyleMap} from './component-types';
import './grid-layout.scss';

const {userAgent} = window.navigator;
const isIE = userAgent.includes('MSIE') || userAgent.includes('Trident');

type Props = {
  children: ReactElement[];
  gridTemplateAreas: string[];
  gridTemplateColumns: string;
  gridTemplateRows: string;
  style?: StyleMap;
};

export default function GridLayout({
  children,
  gridTemplateAreas,
  gridTemplateColumns,
  gridTemplateRows,
  style = {}
}: Props): ReactElement {
  const myRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    const {current} = myRef;
    if (current) {
      current.style.setProperty('grid-template-columns', gridTemplateColumns);
      current.style.setProperty('grid-template-rows', gridTemplateRows);
      current.style.setProperty(
        'grid-template-areas',
        gridTemplateAreas.map(gta => `'${gta}'`).join(' ')
      );
      if (isIE) ieGridFix();
    }
  }, [gridTemplateAreas, gridTemplateColumns, gridTemplateRows]);

  // Adds CSS with vendor prefixes for IE11 grid support.
  function ieGridFix() {
    const {current} = myRef;
    if (!current) return;

    current.style.setProperty('-ms-grid-columns', gridTemplateColumns);
    current.style.setProperty('-ms-grid-rows', gridTemplateRows);

    const templateAreas: string[][] = [];
    gridTemplateAreas.forEach((gta, rowIndex) => {
      const names = gta.split(' ');
      names.forEach((name, columnIndex) => {
        let row = templateAreas[rowIndex];
        if (!row) row = templateAreas[rowIndex] = [];
        row[columnIndex] = name;
      });
    });

    Array.from(current.children).forEach((child, index) => {
      const slotName = child.id;
      const rowIndex = templateAreas.findIndex(row => row.includes(slotName));
      if (rowIndex !== -1) {
        // @ts-ignore
        child.style.setProperty('-ms-grid-row', rowIndex + 1);

        const row = templateAreas[rowIndex];
        const columnIndex = row.findIndex(name => name === slotName);
        // @ts-ignore
        child.style.setProperty('-ms-grid-column', columnIndex + 1);

        let columnSpan = 1;
        for (let c = columnIndex + 1; c < row.length; c++) {
          if (row[c] === slotName) columnSpan++;
        }
        // @ts-ignore
        if (columnSpan > 1) child.style.setProperty('-ms-grid-column-span', columnSpan);

        let rowSpan = 1;
        for (let r = rowIndex + 1; r < templateAreas.length; r++) {
          if (templateAreas[r][columnIndex] === slotName) rowSpan++;
        }
        // @ts-ignore
        if (rowSpan > 1) child.style.setProperty('-ms-grid-row-span', rowSpan);
      }
    });
  }
 
  function getSlotContent(slotName: string): ReactElement | undefined {
    if (!children) return undefined;
    return children.find(child => child.props.name === slotName);
  }
 
  const gridAreas = new Set<string>();
  for (const gta of gridTemplateAreas) {
    const names = gta.split(' ');
    names.forEach(name => gridAreas.add(name));
  }
 
  return (
    <div className="grid-layout" ref={myRef} style={style}>
      {Array.from(gridAreas).map(gridArea => (
        <div id={gridArea} key={gridArea} style={{gridArea}}>
          {getSlotContent(gridArea)}
        </div>
      ))}
    </div>
  );
}
