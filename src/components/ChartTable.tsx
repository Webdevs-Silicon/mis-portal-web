import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import Chip from "./Chip";
import { formatCurrency } from "../utils/performanceDataTransformer";

export type Column = {
  key: string;
  type?: "chip" | "text" | "label" | "currency";
  width?: string | number;
  align?: "left" | "right" | "center";
};

type ChartTableProps = {
  columns: Column[];
  data: any[];
  numberOfRows?: number;
};

export default function ChartTable({
  columns,
  data,
  numberOfRows,
}: ChartTableProps) {
  const rows = numberOfRows ? data.slice(0, numberOfRows) : data;

  return (
    <TableContainer component={Box} sx={{ borderRadius: 2 }}>
      <Table>
        <TableBody>
          {rows.map((row, rowIndex) => {
            // Check if the change value is negative to determine color
            const isNegative = row.change < 0;

            return (
              <TableRow key={rowIndex} hover>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    align={col.align || "left"}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    {/* Custom Label + Percentage + Dot */}
                    {col.type === "label" ? (
                      <Box display="flex" flexDirection="column">
                        <Box display="flex" alignItems="center" gap={1}>
                          <Box
                            sx={{
                              width: 14,
                              height: 14,
                              borderRadius: "50%",
                              backgroundColor: row.color,
                              flexShrink: 0,
                              marginLeft: "-10px",
                            }}
                          />
                          <Box>
                            <Typography
                              fontWeight={600}
                              sx={{ whiteSpace: "nowrap", fontSize: 14 }}
                            >
                              {row.label}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 12,
                                color: "gray",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {row.percentage}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ) : col.type === "chip" ? (
                      <Chip
                        isPositive={row[col.key] > 0}
                        text={`${row[col.key]}%`}
                      />
                    ) : (
                      // Default: Text with conditional color
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          color: isNegative ? "#EF4444" : "inherit",
                        }}
                      >
                        {formatCurrency(row[col.key])}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
