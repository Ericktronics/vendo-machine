import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { chocolateData } from "./vendoPage";

type VendoTableProps = {
  chocolates: chocolateData[];
};

const VendoTable: React.FC<VendoTableProps> = ({ chocolates }) => {
  return (
    <div className="overflow-x-auto border-2 rounded-2xl shadow-md p-4">
      <Table className="w-full bg-white text-base">
        <TableHeader>
          <TableRow className="[&>*:not(:last-child)]:pr-28">
            <TableHead className="text-xl font-semibold">ID</TableHead>
            <TableHead className="text-xl font-semibold">
              Chocolate Name
            </TableHead>
            <TableHead className="text-xl font-semibold">Price</TableHead>
            <TableHead className="text-xl font-semibold">Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chocolates.map((choco) => (
            <TableRow
              key={choco.id}
              className="hover:bg-gray-50 [&>*:not(:last-child)]:pr-28">
              <TableCell className="text-base">{choco.id}</TableCell>
              <TableCell className="text-base">{choco.name}</TableCell>
              <TableCell className="text-base">${choco.price}</TableCell>
              <TableCell className="text-base">{choco.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VendoTable;
