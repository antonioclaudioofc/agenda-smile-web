import { Button } from "../../components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/card";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import { FaUserDoctor } from "react-icons/fa6";

export function RegisterPage() {
  return (
    <section className="w-full bg-blue-100">
      <div className="max-w-7xl min-h-screen m-auto flex justify-center items-center">
        <Card className="w-full max-w-md m-4">
          <div className="flex flex-col gap-8 items-center">
            <div className="rounded-full border-none outline-none p-5 w-max bg-blue-500">
              <FaUserDoctor className="w-12 h-12 text-white" />
            </div>
          </div>
          <CardHeader className="text-center">
            <CardTitle>Clínica Odonto</CardTitle>
            <CardDescription>
              Crie uma conta para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Digite seu nome" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Usuário</Label>
                  <Input
                    id="username"
                    placeholder="Digite seu usuário"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="confirm_password">Confirmar Senha</Label>
                  </div>
                  <Input
                    id="confirm_password"
                    type="password"
                    placeholder="Digite a senha novamente"
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Criar Conta
            </Button>
            <a
              className="font-medium text-blue-500 transition-all hover:text-blue-400"
              href="/login"
            >
              Já tem uma conta? Entrar
            </a>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
