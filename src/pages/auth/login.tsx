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
import { FaUserDoctor } from "react-icons/fa6";
import { useAuth } from "../../contexts/AuthContext";
import { useLogin } from "../../hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginSchema } from "../../schemas/user.schema";
import { useForm } from "react-hook-form";
import type { LoginSchema } from "../../types/user";
import {
  FieldSet,
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "../../components/field";

export function LoginPage() {
  const { login } = useAuth();
  const mutation = useLogin();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    mutation.mutate(data, {
      onSuccess: (response) => {
        login(response);
      },
    });
  };

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
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Nome de usuário</FieldLabel>
                    <Input
                      placeholder="Digite seu nome de usuário"
                      {...form.register("username")}
                    />
                    <FieldError>
                      {form.formState.errors.username?.message}
                    </FieldError>
                  </Field>

                  <Field>
                    <FieldLabel>Senha</FieldLabel>
                    <Input
                      placeholder="Digite sua senha"
                      type="password"
                      {...form.register("password")}
                    />
                    <FieldError>
                      {form.formState.errors.password?.message}
                    </FieldError>
                    <a
                      href="#"
                      className="text-right inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Esqueceu sua senha?
                    </a>
                  </Field>
                </FieldGroup>
              </CardContent>

              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full"
                >
                  {mutation.isPending ? "Entrando..." : "Entrar"}
                </Button>

                <a
                  className="font-medium text-blue-500 transition-all hover:text-blue-400"
                  href="/register"
                >
                  Não tem uma conta? Criar conta
                </a>
              </CardFooter>
            </FieldSet>
          </form>
        </Card>
      </div>
    </section>
  );
}
