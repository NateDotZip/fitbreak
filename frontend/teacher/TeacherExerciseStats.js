import React, {Fragment, useState, useCallback, useEffect} from 'react';
import { Button, useBase, useRecords, Heading } from "@airtable/blocks/ui";
import {TEACHER_END, TIME_OPTIONS} from '../index'
import {Chart} from 'react-charts'

export default function TeacherExerciseStats(props) {
    const { setNav, activeSession } = props
    const base = useBase();

    const tblEntries = base.getTableByNameIfExists("Entries")
    const recEntries = useRecords(tblEntries)
    const sessionEntries = recEntries.filter( entry => entry.getCellValue('Session') && entry.getCellValue('Session').length && entry.getCellValue('Session')[0].id === activeSession)
    let mode = 'Time'
    if(sessionEntries.length)mode = sessionEntries[0].getCellValueAsString("Track Mode")
    const convertAxis = ( response ) => {
      if(mode === "Time"){
        const map = {}
        TIME_OPTIONS.forEach( opt => map[opt.value] = opt.label)
        return map[`${response}`] || ''
      }else if(mode === "Amount"){
        return response
      }
    }
    const entries = [{
        label: "Results",
        data: sessionEntries.map(entry => ({
            primary: entry.getCellValue("Student")[0].name,
            secondary: entry.getCellValue("Response")
        })).sort( (a,b) => parseInt(a.secondary) - parseInt(b.secondary) )
    }]
    console.log('Data',entries)
    const data = React.useMemo(
        () => entries
    ) 
        
       
    
    const axes = React.useMemo(
        () => [
          { primary: true, type: "ordinal", position: "left" },
          { position: "bottom", type: "linear", stacked: false, format: (label) => convertAxis(label) }
        ],
        []
      );

      const series = React.useMemo(
        () => ({
          type: "bar"
        }),
        []
      );
    


    return (
        <>
        <div style={{textAlign:"center"}}>
        <p>Teacher Exercise Stats</p>
        <div
       style={{
         width: '100%',
         height: '600px',
       }}
     >
       <Chart data={data} axes={axes} series={series} tooltip/>
     </div>
        <Button variant="primary" onClick={() => setNav(TEACHER_END)}>
            Done
        </Button>
        </div>
        </>
    )

}