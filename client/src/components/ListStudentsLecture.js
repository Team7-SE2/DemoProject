import React from "react";
import Card from "react-bootstrap/Card"
import Table from "react-bootstrap/Table"
import api from "../api/api"
export default class ListStudentsLecture extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bookings: [] ,prova:{}}
    }
    componentDidMount() {
        api.getbookings(2).then((bookings) => {
                this.setState({bookings: bookings});
            });

        }
     
        


    render() {
        { console.log("bookings");console.log(this.state.bookings) }
        { console.log(this.state.prova.name) }

        return <>
            <br /><br /><br />
            
            <Card style={{width: '50rem'} }>

<Card.Body>
    <Card.Title><h6>Students list</h6></Card.Title>
    <Card.Text>
        <Table>
            <thead>
                <tr>
                    <th> ID </th>
                    <th> Name </th>
                    <th> Surname</th>
                </tr>
            </thead>

            <tbody>
            {this.state.bookings.map( b =><QueueRow user={b.user} lecture={b.lecture} />)}

            </tbody>
        </Table>
    </Card.Text>
   
</Card.Body>
</Card>
            
           

        </>;
    }

   

}
function QueueRow(props){
    let {user, lecture} = props;
    return <tr><QueueElement user ={user} lecture={lecture}/></tr>
}

function QueueElement(props){
    let {user,lecture} = props;
    return <>
    <td>{user.userID}</td>
    <td>{user.name}</td>
    <td>{user.surname}</td>
    </>
}