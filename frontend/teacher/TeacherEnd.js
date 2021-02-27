import React, {Fragment, useState, useCallback, useEffect} from 'react';
import { Heading } from "@airtable/blocks/ui";
import { Button } from "@airtable/blocks/ui";
import {TEACHER_HOME} from '../index'
export default function TeacherEnd(props) {
    const { setNav } = props
    return (
        <>
        <div style={{textAlign:"center"}}>
        <Heading>Thank You for using FitBreak!</Heading>
        <br></br><br></br><br></br>
        <Button variant="primary" onClick={() => setNav(TEACHER_HOME)}>
            New Exercise
        </Button>
        </div>
        </>
    )

}