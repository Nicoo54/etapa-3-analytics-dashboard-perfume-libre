import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle, Star } from "lucide-react";

export function SellersAtRiskTable({ data }: { data: any[] }) {
  return (
    <Card className="col-span-3 mt-6 border-destructive/20">
      <CardHeader>
        <CardTitle className="text-destructive flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Vendedores en Riesgo (Promedio &lt; 3.0)
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Vendedor</TableHead>
              <TableHead>Nombre Comercial</TableHead>
              <TableHead className="text-center">Total Reseñas</TableHead>
              <TableHead className="text-center">Promedio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground py-6"
                >
                  No hay vendedores en riesgo actualmente.
                </TableCell>
              </TableRow>
            ) : (
              data.map((vendedor) => (
                <TableRow key={vendedor.id}>
                  <TableCell className="text-muted-foreground font-medium">
                    {vendedor.id}
                  </TableCell>
                  <TableCell className="font-semibold text-foreground">
                    {vendedor.nombre}
                  </TableCell>
                  <TableCell className="text-center text-foreground">
                    {vendedor.resenas}
                  </TableCell>
                  <TableCell className="font-bold text-destructive">
                    <div className="flex items-center justify-center gap-1">
                      <span>{vendedor.promedio.toFixed(1)}</span>
                      <Star className="w-4 h-4 fill-destructive text-destructive" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
