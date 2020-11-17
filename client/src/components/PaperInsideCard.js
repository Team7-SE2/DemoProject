import React, { useState} from 'react'
import Paper from '@material-ui/core/Paper';
import { SortingState, PagingState, IntegratedPaging, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, PagingPanel } from '@devexpress/dx-react-grid-material-ui';
import Card from "react-bootstrap/Card"





const PaperInsideCard = (props) => {

    const [pageSizes] = useState([5, 10, 15, 0]);

    let { CardHeader, sortingStateColumnExtensions, integratedSortingColumnExtensions, columns, test } = props;
    return (
        <>
            <Card className="CardClass">
                <Card.Header className="text-center">
                    <h4><b>{CardHeader} </b></h4>
                </Card.Header>
                <Card.Body>
                    <Paper>
                        <Grid
                            rows={test}
                            columns={columns}
                        >
                            <PagingState
                                defaultCurrentPage={0}
                            //pageSize={10}
                            />
                            <SortingState
                                columnExtensions={sortingStateColumnExtensions}
                            />
                            <IntegratedSorting
                                columnExtensions={integratedSortingColumnExtensions}
                            />
                            <IntegratedPaging />
                            <Table />
                            <TableHeaderRow showSortingControls />
                            <PagingPanel pageSizes={pageSizes} />
                        </Grid>
                    </Paper>
                </Card.Body>
            </Card>
        </>
    );


}

export default PaperInsideCard;