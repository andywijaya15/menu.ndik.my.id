import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/layouts/AuthLayout";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center bg-muted/40">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Daftar</CardTitle>
            <CardDescription>Buat akun baru untuk melanjutkan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nama</Label>
              <Input type="text" placeholder="Nama lengkap" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="email@example.com" />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full">Daftar</Button>
            <p className="text-sm text-center text-muted-foreground">
              Sudah punya akun?{" "}
              <a href="/login" className="underline hover:text-primary">
                Login
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </AuthLayout>
  );
}
