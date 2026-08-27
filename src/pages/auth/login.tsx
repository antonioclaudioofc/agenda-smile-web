import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import type { LoginSchema, Role } from "../../types/user";
import {
  FieldSet,
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "../../components/field";
import { AlertBanner } from "../../components/alert-banner";
import { getErrorMessage } from "../../utils/get-error-message";
import { maskCPF } from "../../utils/mask";
import { cn } from "../../lib/utils";

const ACCOUNT_TYPE_KEY = "login_account_type";

export function LoginPage() {
  const { login } = useAuth();
  const mutation = useLogin();
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState<Role>(() => {
    const stored = localStorage.getItem(ACCOUNT_TYPE_KEY);
    return stored === "client" ? "client" : "secretary";
  });

  const form = useForm<LoginSchema>({
    resolver: zodResolver(userLoginSchema),
  });

  const handleAccountTypeChange = (type: Role) => {
    setAccountType(type);
    localStorage.setItem(ACCOUNT_TYPE_KEY, type);
    form.reset();
  };

  const onSubmit = (data: LoginSchema) => {
    const payload =
      accountType === "client"
        ? { ...data, username: data.username.replace(/\D/g, "") }
        : data;

    mutation.mutate(payload, {
      onSuccess: (response) => {
        login(response);
        navigate(accountType === "client" ? "/client/appointments" : "/");
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

          <div className="px-4">
            <div className="flex gap-1 rounded-[10px] bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => handleAccountTypeChange("secretary")}
                className={cn(
                  "flex-1 h-[34px] rounded-[7px] text-[12.5px] font-medium transition-colors",
                  accountType === "secretary"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-gray-500",
                )}
              >
                Sou da equipe da clínica
              </button>
              <button
                type="button"
                onClick={() => handleAccountTypeChange("client")}
                className={cn(
                  "flex-1 h-[34px] rounded-[7px] text-[12.5px] font-medium transition-colors",
                  accountType === "client"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-gray-500",
                )}
              >
                Sou paciente
              </button>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet>
              <CardContent>
                <FieldGroup>
                  {mutation.isError && (
                    <AlertBanner>{getErrorMessage(mutation.error)}</AlertBanner>
                  )}

                  {accountType === "secretary" ? (
                    <Field>
                      <FieldLabel>Nome de usuário</FieldLabel>
                      <Input
                        placeholder="Digite seu nome de usuário"
                        disabled={mutation.isPending}
                        {...form.register("username")}
                      />
                      <FieldError>
                        {form.formState.errors.username?.message}
                      </FieldError>
                    </Field>
                  ) : (
                    <Field>
                      <FieldLabel>CPF</FieldLabel>
                      <Input
                        placeholder="000.000.000-00"
                        disabled={mutation.isPending}
                        {...form.register("username")}
                        onChange={(e) => {
                          form.setValue("username", maskCPF(e.target.value));
                        }}
                      />
                      <FieldError>
                        {form.formState.errors.username?.message}
                      </FieldError>
                    </Field>
                  )}

                  <Field>
                    <FieldLabel>Senha</FieldLabel>
                    <Input
                      placeholder="Digite sua senha"
                      type="password"
                      disabled={mutation.isPending}
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
                  href={
                    accountType === "client" ? "/client/register" : "/register"
                  }
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
