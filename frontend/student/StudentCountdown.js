import React, {Fragment, useState, useCallback, useEffect} from 'react';
import { Button, useRecordById, useBase, Heading } from "@airtable/blocks/ui";
import {STUDENT_EXERCISE, STUDENT_SUBMIT} from '../index'
import Countdown from "react-countdown";




export default function StudentCountdown(props){
    
    const { setNav, activeSession } = props
    const base = useBase();
    const tblSessions = base.getTableByNameIfExists("Sessions");

    const session = useRecordById(tblSessions, activeSession)
    console.log('Found Session', activeSession, session)
    const start = session.getCellValue("Date")
    
    return (
        <>
        <div style={{textAlign:"center"}}>
        <Heading>{session.getCellValueAsString("Exercise")} starting in:</Heading>
        <Countdown date={start} renderer={( {minutes,seconds,completed} ) => {
            if(completed){
                setNav(STUDENT_EXERCISE)
                return <></>
            }else{
                
                return (<div style={{textAlign:"center",fontSize:"xxx-large",paddingTop:"75px" }}><span>{seconds}</span></div>)
                
            }
        }}/>
        </div>
        </>
    )

}