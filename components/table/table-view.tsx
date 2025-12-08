import { ExteriorView } from "@/components/exterior/exterior-view";
import { InteriorCharts } from "@/components/interior/interior-charts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useScenario } from "@/lib/context/scenario-context";
import { useTableSort } from "@/lib/context/table-sort-context";
import { Credit } from "@/lib/models/credit";
import { PeriodicPayment } from "@/lib/models/periodic-payment";
import type { Table as TableType } from "@/lib/models/scenario";
import { Activity, ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";
import React, { useEffect, useMemo, useRef } from "react";

export function TableView({ table }: { table: TableType }) {
  const tableRef = useRef<HTMLDivElement>(null);
  const { scenario } = useScenario();
  const { getSort, setSort } = useTableSort();

  const sortedRows = useMemo(() => {
    const sortColumn = table.columns.find((col) => getSort(col.key) !== null);
    if (!sortColumn) return table.rows;

    return [...table.rows].sort((a, b) => {
      const aValue = a[sortColumn.key];
      const bValue = b[sortColumn.key];
      const direction = getSort(sortColumn.key);

      // Handle currency columns
      if (sortColumn.type === "currency") {
        const aIsCredit = aValue instanceof Credit;
        const bIsCredit = bValue instanceof Credit;
        const aIsPeriodic = aValue instanceof PeriodicPayment;
        const bIsPeriodic = bValue instanceof PeriodicPayment;

        // If both are Credit objects, compare their numeric values
        if (aIsCredit && bIsCredit) {
          return direction === "asc"
            ? aValue.numeric - bValue.numeric
            : bValue.numeric - aValue.numeric;
        }

        // If one is Credit and one is PeriodicPayment, Credit comes first
        if (aIsCredit && bIsPeriodic) {
          return direction === "asc" ? -1 : 1;
        }
        if (aIsPeriodic && bIsCredit) {
          return direction === "asc" ? 1 : -1;
        }

        // If both are PeriodicPayment objects, compare their hourly amounts
        if (aIsPeriodic && bIsPeriodic) {
          return direction === "asc"
            ? aValue.getAmountPerHour().numeric -
                bValue.getAmountPerHour().numeric
            : bValue.getAmountPerHour().numeric -
                aValue.getAmountPerHour().numeric;
        }

        // If one is PeriodicPayment and one is string, PeriodicPayment comes first
        if (aIsPeriodic && !bIsCredit && !bIsPeriodic) {
          return direction === "asc" ? -1 : 1;
        }
        if (!aIsCredit && !aIsPeriodic && bIsPeriodic) {
          return direction === "asc" ? 1 : -1;
        }

        // If neither is a valid type, compare as strings
        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();
        return direction === "asc"
          ? aStr.localeCompare(bStr)
          : bStr.localeCompare(aStr);
      }

      // Handle string columns
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      return direction === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [table.rows, table.columns, getSort]);

  const handleSort = (columnKey: string) => {
    const currentSort = getSort(columnKey);
    let newSort: "asc" | "desc" | null = null;

    if (currentSort === null) newSort = "asc";
    else if (currentSort === "asc") newSort = "desc";

    setSort(columnKey, newSort);
  };

  useEffect(() => {
    if (tableRef.current) {
      // Calculate estimated table height based on dots in cells
      const estimatedHeight = table.rows.reduce((total, row) => {
        // Find the cell with the most dots in this row
        const maxDotsInRow = table.columns.reduce((max, col) => {
          const cellContent = String(row[col.key]);
          const dotCount = (cellContent.match(/\./g) || []).length;
          return Math.max(max, dotCount);
        }, 0);

        // If no dots found, count as 1 line
        return total + (maxDotsInRow > 0 ? maxDotsInRow + 1 : 1);
      }, 0);

      console.log(estimatedHeight);

      // Only scroll if the estimated height is significant
      if (estimatedHeight >= 31) {
        const yOffset = -12;
        const y =
          tableRef.current.getBoundingClientRect().top +
          window.scrollY +
          yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, []);

  const renderSortIcon = (columnKey: string) => {
    const sort = getSort(columnKey);
    const baseClasses = "h-4 w-4 inline-block ml-2";
    const opacityClass = sort === null ? "opacity-40" : "opacity-100";

    if (sort === "asc")
      return <ArrowUpNarrowWide className={`${baseClasses} ${opacityClass}`} />;
    if (sort === "desc")
      return (
        <ArrowDownWideNarrow className={`${baseClasses} ${opacityClass}`} />
      );
    return <ArrowUpNarrowWide className={`${baseClasses} ${opacityClass}`} />;
  };

  const renderCell = (
    value: string | Credit | PeriodicPayment,
    columnType?: string
  ) => {
    if (columnType === "currency") {
      if (value instanceof Credit) {
        return value.toString();
      }
      if (value instanceof PeriodicPayment) {
        return value.toString();
      }
    }
    return String(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 md:gap-4">
      <div className="lg:col-span-3">
        <div
          ref={tableRef}
          className="border border-primary bg-black p-2 md:p-4"
        >
          <h2 className="text-lg md:text-2xl font-bold mb-2 text-primary">
            {table.title}
          </h2>
          <p className="text-primary text-xs md:text-base pb-2">
            {table.description}
          </p>
          <div className="block md:table w-full">
            <div className="md:hidden overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-primary/80">
                    {table.columns.map((col) => (
                      <TableHead
                        key={col.key}
                        className="text-sm font-semibold py-1 whitespace-nowrap cursor-pointer hover:bg-primary/10 text-primary"
                        onClick={() => handleSort(col.key)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{col.label.toUpperCase()}</span>
                          {renderSortIcon(col.key)}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedRows.map((row, i) => (
                    <TableRow
                      key={i}
                      className="border-primary/40 text-white text-base"
                    >
                      {table.columns.map((col, i) => (
                        <TableCell
                          key={col.key}
                          className="text-sm py-1 align-top whitespace-nowrap"
                        >
                          {String(
                            i === 0
                              ? row[col.key].toString().toUpperCase()
                              : renderCell(row[col.key], col.type)
                          )
                            .split(".")
                            .map((part, index, array) => (
                              <React.Fragment key={index}>
                                {part}
                                {index < array.length - 1 && (
                                  <>
                                    .<br />
                                  </>
                                )}
                              </React.Fragment>
                            ))}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow className="border-primary/80">
                    {table.columns.map((col) => (
                      <TableHead
                        key={col.key}
                        className="text-lg font-semibold py-1.5 cursor-pointer hover:bg-primary/10 text-primary"
                        onClick={() => handleSort(col.key)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{col.label.toUpperCase()}</span>
                          {renderSortIcon(col.key)}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedRows.map((row, i) => (
                    <TableRow
                      key={i}
                      className="border-primary/40 text-white text-xl"
                    >
                      {table.columns.map((col, i) => (
                        <TableCell
                          key={col.key}
                          className="text-base py-1.5 align-top"
                        >
                          {String(
                            i === 0
                              ? row[col.key].toString().toUpperCase()
                              : renderCell(row[col.key], col.type)
                          )
                            .split(".")
                            .map((part, index, array) => (
                              <React.Fragment key={index}>
                                {part}
                                {index < array.length - 1 && (
                                  <>
                                    .<br />
                                  </>
                                )}
                              </React.Fragment>
                            ))}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="h-full flex flex-col">
          <div className="w-full" style={{ aspectRatio: "1/1" }}>
            <ExteriorView viewAngle="top" />
          </div>
          <div className="border-l border-r border-b border-primary p-2 md:p-4 flex-grow overflow-auto">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-4 w-4 text-primary" />
              <h3 className="font-bold text-sm md:text-base">
                STATION METRICS
              </h3>
            </div>
            <InteriorCharts chartTypes={scenario.charts} />
          </div>
        </div>
      </div>
    </div>
  );
}
