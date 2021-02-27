import React, {Fragment, useState, useCallback, useEffect} from 'react';
import {cursor} from '@airtable/blocks';
import {ViewType} from '@airtable/blocks/models';

import {
    initializeBlock,
    registerRecordActionDataCallback,
    useBase,
    useRecordById,
    useLoadable,
    useSettingsButton,
    useWatchable,
    Box,
    Dialog,
    Heading,
    Link,
    Text,
    TextButton,
} from '@airtable/blocks/ui';


import { Button } from "@airtable/blocks/ui";
import TeacherHome from './teacher/TeacherHome';
import TeacherExerciseChoose from './teacher/TeacherExerciseChoose';
import TeacherExerciseTimer from './teacher/TeacherExerciseTimer';
import TeacherExerciseStats from './teacher/TeacherExerciseStats';
import TeacherEnd from './teacher/TeacherEnd';

import StudentHome from './student/StudentHome';
import StudentCountdown from './student/StudentCountdown';
import StudentExercise from './student/StudentExercise';
import StudentSubmit from './student/StudentSubmit';
import StudentEnd from './student/StudentEnd';

const logo = "data:image/png;base64,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"
export const TEACHER_HOME = "TEACHER_HOME"
export const TEACHER_EXERCISE_CHOOSE = "TEACHER_EXERCISE_CHOOSE"
export const TEACHER_EXERCISE_TIMER = "TEACHER_EXERCISE_TIMER"
export const TEACHER_EXERCISE_STATS = "TEACHER_EXERCISE_STATS"
export const TEACHER_END = "TEACHER_END"

export const STUDENT_HOME = "STUDENT_HOME"
export const STUDENT_COUNTDOWN = "STUDENT_COUNTDOWN"
export const STUDENT_EXERCISE = "STUDENT_EXERCISE"
export const STUDENT_SUBMIT = "STUDENT_SUBMIT"
export const STUDENT_END = "STUDENT_END"

export const TIME_OPTIONS = [
    { value: "100", label: "The full time" },
    { value: "75", label: "Most of the time" },
    { value: "50", label: "Half of the time" },
    { value: "25", label: "A little bit of the time" }
  ];
function FitBreakApp() {

    const [isTeacher,setIsTeacher] = useState(false)
    const [nav, setNav] = useState(isTeacher ? TEACHER_HOME : STUDENT_HOME );
    const [activeSession, setActiveSession] = useState( null );
    useLoadable(cursor);

    const base = useBase();
    return isTeacher ? (
        <Box>
           {nav === TEACHER_HOME && <TeacherHome setNav={setNav}/>}
           {nav === TEACHER_EXERCISE_CHOOSE && <TeacherExerciseChoose setActiveSession={setActiveSession} setNav={setNav}/>} 
           {nav === TEACHER_EXERCISE_TIMER && <TeacherExerciseTimer activeSession={activeSession} setNav={setNav}/>}
           {nav === TEACHER_EXERCISE_STATS && <TeacherExerciseStats activeSession={activeSession} setNav={setNav}/>} 
           {nav === TEACHER_END && <TeacherEnd activeSession={activeSession} setNav={setNav}/>}

        </Box>
    ) : (
        <Box>
         {nav === STUDENT_HOME && <StudentHome setActiveSession={setActiveSession} setNav={setNav} setIsTeacher={setIsTeacher}/>}
         {nav === STUDENT_COUNTDOWN && <StudentCountdown activeSession={activeSession} setNav={setNav}/>}
         {nav === STUDENT_EXERCISE && <StudentExercise activeSession={activeSession} setNav={setNav}/>}     
         {nav === STUDENT_SUBMIT && <StudentSubmit activeSession={activeSession} setNav={setNav}/>}
         {nav === STUDENT_END && <StudentEnd activeSession={activeSession} setNav={setNav}/>}
        </Box>

    );
}




initializeBlock(() => <FitBreakApp />);
