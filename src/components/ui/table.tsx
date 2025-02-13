import React from 'react';
import { Table, TableHead, TableRow, TableCell } from '@material-ui/core';

const MyTable = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell headers="email">Email</TableCell>
          <TableCell headers="phone">Phone</TableCell>
        </TableRow>
      </TableHead>
      {/* Table body content */}
    </Table>
  );
};

export default MyTable;
