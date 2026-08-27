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
import { useRegisterClient } from "../../hooks/use-auth";
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
import type { ClientRegisterSchema } from "../../types/user";
import { clientRegisterSchema } from "../../schemas/user.schema";
import { AlertBanner } from "../../components/alert-banner";
import { getErrorMessage, getFieldErrors } from "../../utils/get-error-message";
import { maskCPF, maskPhone } from "../../utils/mask";

const ALREADY_LINKED_MESSAGE = "Este paciente já possui uma conta.";

export function RegisterClientPage() {
  const { login } = useAuth();
  const mutation = useRegisterClient();
  const navigate = useNavigate();

  const form = useForm<ClientRegisterSchema>({
    resolver: zodResolver(clientRegisterSchema),
  });

  const cpfError = form.formState.errors.cpf?.message;
  const isAlreadyLinked = cpfError === ALREADY_LINKED_MESSAGE;

  const onSubmit = (data: ClientRegisterSchema) => {
    const cpfDigits = data.cpf.replace(/\D/g, "");

    mutation.mutate(
      { ...data, cpf: cpfDigits },
      {
        onSuccess: async () => {
          try {
            const loginResponse = await loginUser({
              username: cpfDigits,
              password: data.password,
            });
            login(loginResponse);
            navigate("/client/appointments");
          } catch {
            navigate("/login");
          }
        },
        onError: (error) => {
          const fieldErrors = getFieldErrors(error);
          for (const [field, message] of Object.entries(fieldErrors)) {
            form.setError(field as keyof ClientRegisterSchema, { message });
          }
        },
      },
    );
  };

  const goToLoginAsClient = () => {
    localStorage.setItem("login_account_type", "client");
    navigate("/login");
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
            <CardTitle>Criar conta de paciente</CardTitle>
            <CardDescription>
              Acompanhe suas consultas pelo celular
            </CardDescription>
          </CardHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet>
              <CardContent>
                <FieldGroup>
                  {mutation.isError && !isAlreadyLinked && (
                    <AlertBanner>{getErrorMessage(mutation.error)}</AlertBanner>
                  )}

                  <AlertBanner variant="info">
                    Você precisa já ser paciente da clínica. Use o mesmo{" "}
                    <strong className="font-medium">CPF</strong> informado no
                    seu atendimento para vincular a conta ao seu cadastro.
                  </AlertBanner>

                  <Field>
                    <FieldLabel>Nome completo</FieldLabel>
                    <Input
                      placeholder="Digite seu nome completo"
                      disabled={mutation.isPending}
                      {...form.register("name")}
                    />
                    <FieldError>
                      {form.formState.errors.name?.message}
                    </FieldError>
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field>
                      <FieldLabel>CPF</FieldLabel>
                      <Input
                        placeholder="000.000.000-00"
                        disabled={mutation.isPending}
                        {...form.register("cpf")}
                        onChange={(e) => {
                          form.setValue("cpf", maskCPF(e.target.value));
                        }}
                      />
                      <FieldError>{cpfError}</FieldError>
                    </Field>

                    <Field>
                      <FieldLabel>Telefone</FieldLabel>
                      <Input
                        placeholder="(11) 98888-0000"
                        disabled={mutation.isPending}
                        {...form.register("phone")}
                        onChange={(e) => {
                          form.setValue("phone", maskPhone(e.target.value));
                        }}
                      />
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel>
                      Email <span className="text-gray-400">(opcional)</span>
                    </FieldLabel>
                    <Input
                      placeholder="seu@email.com"
                      disabled={mutation.isPending}
                      {...form.register("email")}
                    />
                    <FieldError>
                      {form.formState.errors.email?.message}
                    </FieldError>
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
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
                    </Field>

                    <Field>
                      <FieldLabel>Confirmar senha</FieldLabel>
                      <Input
                        placeholder="Digite sua senha novamente"
                        type="password"
                        disabled={mutation.isPending}
                        {...form.register("confirm_password")}
                      />
                      <FieldError>
                        {form.formState.errors.confirm_password?.message}
                      </FieldError>
                    </Field>
                  </div>

                  {isAlreadyLinked && (
                    <div className="flex gap-2 border-t border-gray-200 pt-4">
                      <Button
                        type="button"
                        onClick={goToLoginAsClient}
                        className="flex-1"
                      >
                        Entrar na minha conta
                      </Button>
                      <Button type="button" variant="outline" asChild>
                        <a href="#">Esqueci a senha</a>
                      </Button>
                    </div>
                  )}
                </FieldGroup>
              </CardContent>

              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full"
                >
                  {mutation.isPending ? "Criando..." : "Criar conta"}
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
