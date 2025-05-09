import { create } from 'zustand'

export interface DashboardState {
  final_emission: number
  chart_data: any
  component_chart: any
  map_html: any
}

type DashboardStore = {
  dashboardState: DashboardState | null
  setDashboardState: (data: DashboardState) => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  dashboardState: null,
  setDashboardState: (data) => set({ dashboardState: data }),
}))
