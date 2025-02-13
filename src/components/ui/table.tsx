// src/components/ui/table.tsx

import React, { HTMLAttributes } from 'react';

interface TableProps extends HTMLAttributes<HTMLTableElement> {}
interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {}
interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}
interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}
interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  header?: boolean;
}

export function Table({ children, className, ...props }: TableProps) {
  return (
    <table
      className={`min-w-full border-collapse border border-gray-300 ${className}`}
      {...props}
    >
      {children}
    </table>
  );
}

export function TableHead({ children, className, ...props }: TableHeadProps) {
  return (
    <thead className={`bg-gray-100 ${className}`} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className, ...props }: TableBodyProps) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className, ...props }: TableRowProps) {
  return (
    <tr className={`border-b border-gray-200 ${className}`} {...props}>
      {children}
    </tr>
  );
}

export function TableCell({ header, children, className, ...props }: TableCellProps) {
  const Tag = header ? 'th' : 'td';
  const defaultStyles = header ? 'font-semibold text-left p-2' : 'p-2';

  return (
    <Tag
      className={`${defaultStyles} ${className} border-l border-gray-200 last:border-r last:border-gray-200`}
      {...props}
    >
      {children}
    </Tag>
  );
}

