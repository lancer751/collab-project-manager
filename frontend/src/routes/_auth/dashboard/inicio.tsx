import { KPIsPanel } from "@/components/charts/KPIsPanel";
import ChartsSection from "@/components/ChartsSection";

import {
  getCountLatestProjects,
  getCountProjectsByState,
  getRelevantKPIS,
  getTasksByState,
  getTasksByUser,
} from "@/services/graphs";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/inicio")({
  component: HomePage,
  loader: async ({
    context: {
      queryClient,
      auth: { user },
    },
  }) => {
    if (user.rolDtoList[0].name === "ROLE_ADMIN") {
      await Promise.all([
        queryClient.prefetchQuery({
          queryKey: ["latestMonthProjects"],
          queryFn: getCountLatestProjects,
        }),
        queryClient.prefetchQuery({
          queryKey: ["tasksByState"],
          queryFn: getTasksByState,
        }),
        queryClient.prefetchQuery({
          queryKey: ["relevantKPIS"],
          queryFn: getRelevantKPIS,
        }),
        queryClient.prefetchQuery({
          queryKey: ["countProjectsByState"],
          queryFn: getCountProjectsByState,
        }),
        queryClient.prefetchQuery({
          queryKey: ["countTasksByUser"],
          queryFn: getTasksByUser,
        }),
      ]);
    }

    return { crumb: "inicio" };
  },
});

function HomePage() {
  const {
    auth: { user },
  } = Route.useRouteContext();
  const userFullname = `${user.name} ${user.lastname}`;
  const getGreeting = (currentUser: string) => {
    const currentHour = new Date().getHours();
    console.log(currentHour);
    if (currentHour >= 6 && currentHour < 12) {
      return `Buenos días, ${currentUser}`;
    }
    if (currentHour >= 12 && currentHour < 18) {
      return `Buenas tardes, ${currentUser}`;
    }
    return `Buenas noches, ${currentUser}`;
  };

  return (
    <div className="p-4 w-full h-full">
      <div className="space-y-4 py-5 mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-center">
          {getGreeting(userFullname)}
        </h1>
        <p className="max-w-md text-center mx-auto text-sm">
          {user.rolDtoList[0].name === "ROLE_ADMIN" ||
          user.rolDtoList[0].name === "ROLE_LIDER_SISTEMAS"
            ? "Supervisa y organiza los desarrollos en curso, asigna tareas, y mantén el control de los proyectos tecnológicos desde un solo lugar."
            : "Aquí puedes revisar tus asignaciones, colaborar en desarrollos y mantener tus avances al día."}
        </p>
        {user.rolDtoList[0].name === "ROLE_ADMIN" ||
        user.rolDtoList[0].name === "ROLE_LIDER_SISTEMAS" ? (
          <KPIsPanel />
        ) : null}
      </div>
      {user.rolDtoList[0].name === "ROLE_ADMIN" ||
      user.rolDtoList[0].name === "ROLE_LIDER_SISTEMAS" ? (
        <ChartsSection />
      ) : (
        <div className="text-center flex flex-col justify-center items-center text-sm dark:text-gray-500">
          No eres administrador, tu interfaz esta en desarrollo
        </div>
      )}
    </div>
  );
}
