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

export type Column = {
  key: string;
  type?: "chip" | "text" | "label";
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
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex} hover>
              {columns.map((col) => (
                <TableCell key={col.key} align={col.align || "left"}>
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
                          }}
                        />
                        <Box>
                          <Typography fontWeight={600}>{row.label}</Typography>
                          <Typography sx={{ fontSize: 12, color: "gray" }}>
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
                    // Default: Text
                    row[col.key]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
