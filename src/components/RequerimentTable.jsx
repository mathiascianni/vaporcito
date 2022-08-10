import { Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const RequerimentTable = (props) => {
    return (
        <TableContainer>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Graphics:</TableCell>
                        {props.req['graphics'] == '?' || props.req['graphics'] == null ? <TableCell align="right">Minimum graphics not found</TableCell> : <TableCell align="right">{props.req['graphics']}</TableCell>}
                    </TableRow>
                    <TableRow>
                        <TableCell align="right">Memory:</TableCell>
                        {props.req['memory'] == '?' || props.req['memory'] == null  ? <TableCell align="right">Minimum memory not found</TableCell> : <TableCell align="right">{props.req['memory']}</TableCell>}
                    </TableRow>
                    <TableRow>
                        <TableCell align="right">OS:</TableCell>
                        {props.req['os'] == '?' || props.req['os'] == null  ? <TableCell align="right">Minimum os not found</TableCell> : <TableCell align="right">{props.req['os']}</TableCell>}
                    </TableRow>
                    <TableRow>
                        <TableCell align="right">Processor:</TableCell>
                        {props.req['processor'] == '?' || props.req['processor'] == null  ? <TableCell align="right">Minimum processor not found</TableCell> : <TableCell align="right">{props.req['processor']}</TableCell>}
                    </TableRow>
                    <TableRow>
                        <TableCell align="right">Storage:</TableCell>
                        {props.req['storage'] == '?' || props.req['storage'] == null  ? <TableCell align="right">Minimum storage not found</TableCell> : <TableCell align="right">{props.req['storage']}</TableCell>}
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
    );
}

export default RequerimentTable;