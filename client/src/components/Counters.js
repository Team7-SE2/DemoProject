import React from "react";
import Card from "react-bootstrap/Card"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"



const Counters = (props) => {
//todo: onClick API.setFreeCounter che manda al server l'id del counter free.
    return <>
    
    
         <Card style={{width: '50rem'} }>

            <Card.Body>
                
                
                    <Table striped borederd hover>
                        <thead>
                            <tr>
                                <th> Counter's number </th>
                                <th> </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr> <th> Counter 1 </th>   <th> <Button variant="danger">Next one</Button> </th> </tr>                             
                            <tr> <th> Counter 2 </th>   <th> <Button variant="danger">Next one</Button> </th> </tr> 
                            <tr> <th> Counter 3 </th>  <th> <Button variant="danger">Next one</Button> </th> </tr> 

                        </tbody>
                    </Table>
                
               
            </Card.Body>
         </Card>
     
       
    </>


}

export default Counters;