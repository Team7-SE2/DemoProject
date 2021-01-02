import React, { useState } from 'react'
import moment from 'moment';
import Button from "react-bootstrap/Button";
import PaperInsideCard from './PaperInsideCard';
import { FaUsers } from 'react-icons/fa';

const PastLectures = (props) => {

    let {lectures, course, getListStudentsPast} = props;

    const compareData = (c, d) => {
        const mA = new Date(c).getTime();
        const mB = new Date(d).getTime();
        return mA - mB;
    };

    const [integratedSortingColumnExtensions] = useState([
        { columnName: 'lectureData', compare: compareData }

    ]);


    const [columns] = useState(
            [
                //{ name: 'id', title: 'ID'},
                { name: 'lectureData', title: 'Lecture Date' },
                { name: 'Record students presences', title: 'Record students presences' }
            ]  
    );

    const [sortingStateColumnExtensions] = useState([
        { columnName: 'Record students presences', sortingEnabled: false }
    ]);

    const test = lectures.sort((a,b) =>{return moment(b.date).unix() - moment(a.date).unix()}).filter(function (l) {
        return (l.remote == null);
    }).map((lec) => {
            return {
                id: lec.id,
                lectureData: lec.deleted_at == null ?
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        {moment(new Date(lec.date)).format("LLL")}
                    </div>
                    :
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textDecoration: "line-through red"
                    }}>
                        {moment(new Date(lec.date)).format("LLL")}
                    </div>
                ,
                'Record students presences': <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    {lec.deleted_at == null ? <Button onClick={() => getListStudentsPast(lec)} ><FaUsers size={20} > </FaUsers></Button> : <Button disabled><FaUsers size={20} > </FaUsers></Button>}
                </div>
            }
        
    })


    return (
        <>
            <PaperInsideCard
                CardHeader={course.description + " lectures"}
                columns={columns}
                sortingStateColumnExtensions={sortingStateColumnExtensions}
                integratedSortingColumnExtensions={integratedSortingColumnExtensions}
                test={test}
            ></PaperInsideCard>
        </>
    );
}


export default PastLectures;