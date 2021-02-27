import React, {Fragment, useState, useCallback, useEffect} from 'react';
import { Heading, useBase, useRecords } from "@airtable/blocks/ui";
import { Button, SelectButtons } from "@airtable/blocks/ui";
import {TEACHER_EXERCISE_TIMER} from '../index'
export default function TeacherExerciseChoose(props) {
    const {setNav, setActiveSession} = props
    const [field, setField] = useState(null);
    const base = useBase();
    const table = base.getTableByNameIfExists("Exercises");
    const view = table.getView("Active")
    const records = useRecords( view )
    let [selection, setSelection] = useState({
        exercise: null,
        time: 0
    })
    const options = records.map( rec => ({value: rec.id, label: rec.name}))
    const times = [{value: 1, label: "1 minute"},{value: 2, label: "2 minutes"},{value: 3, label: "3 minutes"}]

    const onChangeValue = (key) => (value) => {
        setSelection({
            ...selection,
            ...{[key]: value}
        })
    }

    const startExercise = async() => {
        const tblSession = base.getTable("Sessions")
        let start = new Date()
        start.setSeconds(start.getSeconds() + 5)
        const session = await tblSession.createRecordAsync({
            "Date": start,
            "Exercise": [{id:selection.exercise}],
            "Status": {name:"Started"},
            "Length": parseInt(`${selection.time}`)
        })
        console.log('Session Created',session)
        setActiveSession(session)
        setNav(TEACHER_EXERCISE_TIMER)
    }
        
    return (
        <div style={{textAlign:"center"}} >
        <Heading>Select an Exercise</Heading>
        <SelectButtons
         
                alignSelf={"center"}
                value={selection.exercise}
                onChange={onChangeValue('exercise')}
                options={options}
                width="640px"
                style={{margin:"0 auto"}}
                />
        
      <p>How Long?</p>
      <SelectButtons
                alignSelf={"center"}
                value={selection.time}
                onChange={onChangeValue('time')}
                options={times}
                width="640px"
                style={{margin:"0 auto"}}
                />
      
      <Button variant="primary" onClick={async() => await startExercise()}>
            Start!
        </Button> 
      </div>
    )

}