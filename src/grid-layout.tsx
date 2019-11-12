import React, {ReactElement, useEffect, useRef} from 'react';
import {StyleMap} from './component-types';
import './grid-layout.scss';

type Props = {
  children?: ReactElement[];
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
    }
  }, [gridTemplateAreas, gridTemplateColumns, gridTemplateRows]);
 
  function getSlotContent(slotName: string): ReactElement | undefined {
    if (!children) return undefined;
    return Array.from(children).find(child => child.props.name === slotName);
  }
 
  const gridAreas = new Set<string>();
  for (const gta of gridTemplateAreas) {
    const names = gta.split(' ');
    names.forEach(name => gridAreas.add(name));
  }
 
  return (
    <div className="grid-layout" ref={myRef} style={style}>
      {Array.from(gridAreas).map(gridArea => (
        <div key={gridArea} style={{gridArea}}>
          {getSlotContent(gridArea)}
        </div>
      ))}
    </div>
  );
}
