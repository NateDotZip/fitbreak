import React, {Fragment, useState, useCallback, useEffect} from 'react';
import { Button, useRecordById, useBase, Heading, Input, SelectButtons, useRecords, useRecordIds } from "@airtable/blocks/ui";
import {STUDENT_END, TIME_OPTIONS} from '../index'
import { session as atSession } from '@airtable/blocks';

const currEmail = atSession.currentUser.email

export default function StudentSubmit(props) {
    const base = useBase();

    const tblStudents = base.getTableByNameIfExists("Students")
    const recStudents = useRecords(tblStudents)
    const currStudent = recStudents.find( stu => stu.getCellValueAsString('Email') === currEmail )
    console.log('Matching Email', currEmail, currStudent, recStudents )
    const { setNav, activeSession } = props
    const [value, setValue] = useState(null);
    const tblSessions = base.getTableByNameIfExists("Sessions");
    const tblEntries = base.getTable("Entries")
    const vwStudents = tblStudents.getView("Active")
    const students = useRecordIds(vwStudents)
        
    const session = useRecordById(tblSessions, activeSession)
    const mode = session.getCellValueAsString("Track Mode")
    const exercise = session.getCellValueAsString("Exercise")
    const options = TIME_OPTIONS;
    const entries = []  
    const onSubmit = async() =>{
        for(let stu of students){
            let response = 0
            if(stu === currStudent.id){
                response = value
            }else{
                if(mode === "Amount"){
                    const max = Math.floor(value*1.25)
                    const min = Math.ceil(value*0.75)
                    const random = Math.floor(Math.random() * (max - min + 1)) + min
                    response = random
                }else{
                    const random = Math.floor(Math.random() * 4)
                    response = options[random].value
                }
            }
            entries.push({fields:
                {
                    "Session": [{id:activeSession}],
                    "Student": [{id:stu}],
                    "Response": parseInt(`${response}`),
                }
            })
            
        }
        await tblEntries.createRecordsAsync(entries)
        await tblSessions.updateRecordAsync(activeSession,{Status:{name:"Ended"}})
        setNav(STUDENT_END)
    }
    return (
        <>
        <div style={{textAlign:"center", justifyContent:"center"}}>
        {mode === "Amount" && (
            <>
              <Heading>Please Submit Your Honest Number of {exercise}</Heading>
              <Input 
                type="number"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Enter Amount"
                width="320px"
                
           />
           </> 
            
        )}
         
        {mode === "Time" && (
          <>
              <Heading>Please Submit your Honest time spent on {exercise}</Heading>
              
              <SelectButtons
                alignSelf={"center"}
                value={value}
                onChange={newValue => setValue(newValue)}
                options={options}
                width="640px"
                style={{margin:"0 auto"}}
                />
                </>
                    
        )}
        
        <Button variant="primary" onClick={() => onSubmit()}>
            Submit
        </Button>
        </div>
        </>
    )

}