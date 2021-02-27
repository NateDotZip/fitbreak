import React, {Fragment, useState, useCallback, useEffect} from 'react';
import { Button, useRecordById, useBase, Heading } from "@airtable/blocks/ui";
import {TEACHER_EXERCISE_STATS} from '../index'
import Countdown from "react-countdown";


export default function TeacherExerciseTimer(props) {
    const { setNav, activeSession } = props
    const base = useBase();
    const tblSessions = base.getTableByNameIfExists("Sessions");

    const session = useRecordById(tblSessions, activeSession)
    console.log('Found Session', activeSession, session)
    const end = session.getCellValue("Session End")
    return (
        <>
        <Countdown date={end} renderer={ ( {minutes,seconds,completed} ) => {

            
            if(completed){
             //await tblSessions.updateRecordAsync(activeSession,{Status:{name:"Ended"}})
             setNav(TEACHER_EXERCISE_STATS)
             return <></>
        
            }else{
                
                return (
                <div style={{textAlign:"center",fontSize:"xxx-large",paddingTop:"50px" }}>
                    <Heading>{session.getCellValueAsString("Exercise")} ending in:
                    </Heading>
                    <span>{minutes} minutes {seconds} seconds</span></div>
                    )
                
                
                       
            }
        }}/>
        </>
    )

}