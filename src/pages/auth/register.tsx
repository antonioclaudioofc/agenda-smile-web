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
import { useRegister } from "../../hooks/use-auth";
import { useAuth } from "../../contexts/AuthContext";
import { loginUser } from "../../api/auth";
import {
  FieldSet,
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "../../components/field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterSchema } from "../../types/user";
import { userRegisterSchema } from "../../schemas/user.schema";

export function RegisterPage() {
  const { login } = useAuth();
  const mutation = useRegister();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(userRegisterSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
    mutation.mutate(data, {
      onSuccess: async () => {
        try {
          const loginResponse = await loginUser({
            username: data.username,
            password: data.password,
          });
          login(loginResponse);
        } catch (error) {
          console.error("Auto-login failed after registration:", error);
        }
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
              Crie uma conta para acessar o sistema
            </CardDescription>
          </CardHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Nome</FieldLabel>
                    <Input
                      placeholder="Digite seu nome"
                      {...form.register("first_name")}
                    />
                    <FieldError>
                      {form.formState.errors.first_name?.message}
                    </FieldError>
                  </Field>

                  <Field>
                    <FieldLabel>Usuário</FieldLabel>
                    <Input
                      placeholder="Digite seu nome de usuário"
                      {...form.register("username")}
                    />
                    <FieldError>
                      {form.formState.errors.username?.message}
                    </FieldError>
                  </Field>

                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      placeholder="Digite seu email"
                      {...form.register("email")}
                    />
                    <FieldError>
                      {form.formState.errors.email?.message}
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
                  </Field>

                  <Field>
                    <FieldLabel>Confirmar senha</FieldLabel>
                    <Input
                      placeholder="Digite sua senha novamente"
                      type="password"
                      {...form.register("confirm_password")}
                    />
                    <FieldError>
                      {form.formState.errors.confirm_password?.message}
                    </FieldError>
                  </Field>
                </FieldGroup>
              </CardContent>

              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full"
                >
                  {mutation.isPending ? "Criando..." : "Criar Conta"}
                </Button>

                <a href="/login" className="text-blue-500">
                  Já tem uma conta? Entrar
                </a>
              </CardFooter>
            </FieldSet>
          </form>
        </Card>
      </div>
    </section>
  );
}
