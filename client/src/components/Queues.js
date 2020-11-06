import React from "react";
import Card from "react-bootstrap/Card"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"



const Queues = (props) => {
//todo: replace fixed values with data from json file.
//todo: onClick API.bookRequestType che manda al server il tipo della richiesta prenotata
   let {requestTypes,bookTicket} = props;
   return <>
    
    
         <Card style={{width: '50rem'} }>

            <Card.Body>
                <Card.Title>Available queues</Card.Title>
                <Card.Text>
                    <Table>
                        <thead>
                            <tr>
                                <th> Request type </th>
                                <th> Expected waiting time </th>
                                <th> </th>
                            </tr>
                        </thead>

                        <tbody>
                        {requestTypes.map( vt =><QueueRow key={vt.typeCode} requestTypes={vt} bookTicket={bookTicket} />)}

                        </tbody>
                    </Table>
                </Card.Text>
               
            </Card.Body>
         </Card>
     
       
    </>


}


function QueueRow(props){
    let {requestTypes, bookTicket} = props;
    return <tr><QueueElement requestTypes ={requestTypes} bookTicket={bookTicket}/></tr>
}

function QueueElement(props){
    let {requestTypes,bookTicket} = props;
    console.log(requestTypes);
    return <>
    <td>{requestTypes.typeName}</td>
    <td>{requestTypes.typeCode}</td>
    <td><Button onClick={() => bookTicket(requestTypes.typeCode)}> BOOK </Button></td>
    </>
}

export default Queues;