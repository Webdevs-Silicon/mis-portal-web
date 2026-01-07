// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Box,
//   Typography,
// } from "@mui/material";
// import Chip from "./Chip";
// import { formatCurrency } from "../utils/performanceDataTransformer";

// export type Column = {
//   key: string;
//   type?: "chip" | "text" | "label" | "currency" | "memberStats";
//   width?: string | number;
//   align?: "left" | "right" | "center";
// };

// type ChartTableProps = {
//   columns: Column[];
//   data: any[];
//   numberOfRows?: number;
// };

// export default function ChartTable({
//   columns,
//   data,
//   numberOfRows,
// }: ChartTableProps) {
//   const rows = numberOfRows ? data.slice(0, numberOfRows) : data;

//   return (
//     <TableContainer component={Box} sx={{ borderRadius: 2 }}>
//       <Table>
//         <TableBody>
//           {rows.map((row, rowIndex) => {
//             // Check if the change value is negative to determine color
//             const isNegative = row.change < 0;

//             return (
//               <TableRow key={rowIndex} hover>
//                 {columns.map((col) => (
//                   <TableCell
//                     key={col.key}
//                     align={col.align || "left"}
//                     sx={{ whiteSpace: "nowrap" }}
//                   >
//                     {/* Custom Label + Percentage + Dot */}
//                     {col.type === "memberStats" ? (
//                       <Box display="flex" gap={2}>
//                         {/* Members Row */}
//                         <Box
//                           display="flex"
//                           flexDirection="column"
//                           justifyContent="space-between"
//                           alignItems="flex-start"
//                           width="100%"
//                         >
//                           <Typography fontSize={12} color="gray">
//                             Members
//                           </Typography>
//                           <Typography fontSize={14} fontWeight={600}>
//                             {row.memberCount.toLocaleString()}
//                           </Typography>
//                         </Box>

//                         {/* Share Capital Row */}
//                         <Box
//                           display="flex"
//                           flexDirection="column"
//                           justifyContent="space-between"
//                           alignItems="flex-start"
//                           width="100%"
//                         >
//                           <Typography fontSize={12} color="gray">
//                             Share Capital (₹L)
//                           </Typography>
//                           <Typography fontSize={14} fontWeight={600}>
//                             {formatCurrency(row.shareCapital)}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     ) : col.type === "label" ? (
//                       <Box display="flex" flexDirection="column">
//                         <Box display="flex" alignItems="center" gap={1}>
//                           <Box
//                             sx={{
//                               width: 14,
//                               height: 14,
//                               borderRadius: "50%",
//                               backgroundColor: row.color,
//                               flexShrink: 0,
//                               marginLeft: "-10px",
//                             }}
//                           />
//                           <Box>
//                             <Typography
//                               fontWeight={600}
//                               sx={{ whiteSpace: "nowrap", fontSize: 14 }}
//                             >
//                               {row.label}
//                             </Typography>
//                             <Typography
//                               sx={{
//                                 fontSize: 12,
//                                 color: "gray",
//                                 whiteSpace: "nowrap",
//                               }}
//                             >
//                               {row.percentage}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </Box>
//                     ) : col.type === "chip" ? (
//                       <Chip
//                         isPositive={row[col.key] > 0}
//                         text={`${row[col.key]}%`}
//                       />
//                     ) : (
//                       // Default: Text with conditional color
//                       <Typography
//                         sx={{
//                           fontSize: 14,
//                           fontWeight: 600,
//                           whiteSpace: "nowrap",
//                           color: isNegative ? "#EF4444" : "inherit",
//                         }}
//                       >
//                         {formatCurrency(row[col.key])}
//                       </Typography>
//                     )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
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
  type?: "chip" | "text" | "label" | "currency" | "memberStats";
  width?: string | number;
  align?: "left" | "right" | "center";
};

type ChartTableProps = {
  columns: Column[];
  data: any[];
  numberOfRows?: number;
};

// Helper function for currency formatting
// function formatCurrency(value: number): string {
//   if (isNaN(value) || !isFinite(value)) return "₹ 0";
  
//   const absValue = Math.abs(value);
//   let formatted;
  
//   if (absValue < 100000) {
//     formatted = value.toLocaleString("en-IN");
//   } else {
//     const lakhs = absValue / 100000;
//     formatted = `${lakhs.toFixed(1)}L`;
//   }
  
//   // Add negative sign for negative values
//   return value < 0 ? `-₹ ${formatted}` : `₹ ${formatted}`;
// }
// Helper function for currency formatting
function formatCurrency(value: number): string {
  if (isNaN(value) || !isFinite(value)) return "₹ 0";
  
  const absValue = Math.abs(value);
  let formatted;
  
  if (absValue < 100000) {
    // Use absValue for formatting, then add sign back
    formatted = absValue.toLocaleString("en-IN");
  } else {
    const lakhs = absValue / 100000;
    formatted = `${lakhs.toFixed(1)}L`;
  }
  
  // Add rupee symbol and sign
  return value < 0 ? `-₹ ${formatted}` : `₹ ${formatted}`;
}

// Helper function for percentage formatting
// function formatPercentage(value: number): string {
//   if (isNaN(value) || !isFinite(value)) return "0%";
  
//   const formatted = `${Math.abs(value).toFixed(1)}%`;
//   return value < 0 ? `-${formatted}` : `+${formatted}`;
// }
function formatPercentage(value: number): string {
  if (isNaN(value) || !isFinite(value)) return "0%";
  
  const absValue = Math.abs(value);
  const formatted = `${absValue.toFixed(1)}%`;
  
  // Don't add + sign here, let the chip handle it
  return value < 0 ? `-${formatted}` : formatted;
}

export default function ChartTable({
  columns,
  data,
  numberOfRows,
}: ChartTableProps) {
  const rows = numberOfRows ? data.slice(0, numberOfRows) : data;
  console.log('chartData',data)

  return (
    <TableContainer component={Box} sx={{ borderRadius: 2 }}>
      <Table>
        <TableBody>
          {rows.map((row, rowIndex) => {
            const isAmountNegative = row.amount < 0;
            const isChangeNegative = row.change < 0;

            return (
              <TableRow key={rowIndex} hover>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    align={col.align || "left"}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    {col.type === "memberStats" ? (
                      <Box display="flex" gap={2}>
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          width="100%"
                        >
                          <Typography fontSize={12} color="gray">
                            Members
                          </Typography>
                          <Typography fontSize={14} fontWeight={600}>
                            {row.memberCount.toLocaleString()}
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          width="100%"
                        >
                          <Typography fontSize={12} color="gray">
                            Share Capital (₹L)
                          </Typography>
                          <Typography fontSize={14} fontWeight={600}>
                            {formatCurrency(row.shareCapital)}
                          </Typography>
                        </Box>
                      </Box>
                    ) : col.type === "label" ? (
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
                                color: row.percentage?.includes('-') ? "#EF4444" : "gray",
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
                        text={formatPercentage(row[col.key])}
                      />
                    ) : (
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          color: isAmountNegative ? "#EF4444" : "inherit",
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