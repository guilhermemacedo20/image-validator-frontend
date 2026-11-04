import { useNavigate } from "react-router-dom";

const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  className: "w-5 h-5",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "aria-hidden": true,
} as const;

export const MAIN_ROUTES: Record<string, string> = {
  analyze: "/analyze-image",
  dashboard: "/dashboard",
  account: "/my-account",
};

export const analyzeSidebarItem = {
  id: "analyze",
  title: "Análise de Imagem",
  subtitle: "Detector de IA",
  icon: (
    <svg {...iconProps}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L15 12l-5.25-5" />
    </svg>
  ),
};

export const dashboardSidebarItem = {
  id: "dashboard",
  title: "Dashboard",
  subtitle: "Histórico de análises",
  icon: (
    <svg {...iconProps}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  ),
};

export const accountSidebarItem = {
  id: "account",
  title: "Minha Conta",
  subtitle: "Perfil e segurança",
  icon: (
    <svg {...iconProps}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
};

export const mainSidebarItems = [analyzeSidebarItem, dashboardSidebarItem, accountSidebarItem];

export function useMainNavigation() {
  const navigate = useNavigate();
  return (id: string) => {
    const route = MAIN_ROUTES[id];
    if (route) navigate(route);
  };
}
