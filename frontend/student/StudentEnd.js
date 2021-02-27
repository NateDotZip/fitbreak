import React, {Fragment, useState, useCallback, useEffect} from 'react';
import { Button, Heading } from "@airtable/blocks/ui";
import {STUDENT_HOME} from '../index'
export default function StudentEnd(props) {
    const { setNav } = props
    return (
        <>
        <div style={{textAlign:"center"}}>
        <Heading>Thank you for using FitBreak!</Heading>
        <br></br><br></br><br></br>
        <Button variant="primary" onClick={() => setNav(STUDENT_HOME)}>
            New Meeting
        </Button>
        </div>

        </>
    )

}