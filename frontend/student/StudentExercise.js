import React, {Fragment, useState, useCallback, useEffect} from 'react';
import { Button, useRecordById, useBase, Heading } from "@airtable/blocks/ui";
import Countdown from "react-countdown";
import StudentSubmit from './StudentSubmit';
import { STUDENT_SUBMIT } from '..';


export default function StudentExercise(props) {
    const { setNav, activeSession } = props
    const base = useBase();
    const tblSessions = base.getTableByNameIfExists("Sessions");

    const session = useRecordById(tblSessions, activeSession)
    console.log('Found Session', activeSession, session)
    const end = session.getCellValue("Session End")
    return (
        <>
        <Countdown date={end} renderer={( {minutes,seconds,completed} ) => {
                        <div style={{textAlign:"center"}}>
                        <Heading>
                        {session.getCellValueAsString("Exercise")} ending in:
                        </Heading>
                        </div>
            if(completed){
                setNav(STUDENT_SUBMIT)
                return <></>
            }else{
                
                return (<div style={{textAlign:"center",fontSize:"xxx-large",paddingTop:"50px" }}><span>{minutes} minutes, {seconds} seconds</span></div>)
                
            }
        }}/>
        </>
    )

}