import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
  weekStart: Date | null;
}

// Función para obtener el inicio de la semana actual (lunes)
const getCurrentWeekStart = (): Date => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = domingo, 1 = lunes, etc.
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Ajustar para que la semana comience el lunes
  const monday = new Date(now);
  monday.setDate(now.getDate() - diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
};

// Función para obtener el fin de la semana actual (domingo)
const getCurrentWeekEnd = (): Date => {
  const weekStart = getCurrentWeekStart();
  const sunday = new Date(weekStart);
  sunday.setDate(weekStart.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return sunday;
};

interface DateRangeState {
  dateRange: DateRange;
  setDateRange: (dateRange: DateRange) => void;
  setStartDate: (startDate: Date | null) => void;
  setEndDate: (endDate: Date | null) => void;
  setWeekStart: (weekStart: Date | null) => void;
  resetDateRange: () => void;
}

export const useDateRangeStore = create<DateRangeState>()(
  persist(
    (set) => ({
      dateRange: {
        startDate: getCurrentWeekStart(),
        endDate: getCurrentWeekEnd(),
        weekStart: getCurrentWeekStart(),
      },
      setDateRange: (dateRange: DateRange) => set({ dateRange }),
      setStartDate: (startDate: Date | null) => 
        set((state) => ({ 
          dateRange: { ...state.dateRange, startDate } 
        })),
      setEndDate: (endDate: Date | null) => 
        set((state) => ({ 
          dateRange: { ...state.dateRange, endDate } 
        })),
      setWeekStart: (weekStart: Date | null) => 
        set((state) => ({ 
          dateRange: { ...state.dateRange, weekStart } 
        })),
      resetDateRange: () => 
        set({ 
          dateRange: { 
            startDate: getCurrentWeekStart(), 
            endDate: getCurrentWeekEnd(), 
            weekStart: getCurrentWeekStart() 
          } 
        }),
    }),
    {
      name: 'date-range-storage',
    }
  )
); 