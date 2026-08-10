import { ShieldAlert } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="absolute top-4 right-8">
        <UserButton />
      </div>

      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center">
            <ShieldAlert className="w-12 h-12 text-red-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Acceso Restringido
          </h1>
          <p className="text-muted-foreground">
            No tienes los permisos necesarios para acceder al Panel de
            Analytics. Esta área está restringida exclusivamente para
            administradores
          </p>
        </div>
      </div>
    </div>
  );
}
