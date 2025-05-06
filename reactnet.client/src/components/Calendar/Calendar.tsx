import { useEffect, useState, useCallback, useRef } from 'react';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import { createViewDay, createViewMonthGrid, createViewWeek } from '@schedule-x/calendar';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createScrollControllerPlugin } from '@schedule-x/scroll-controller';
import '@schedule-x/theme-default/dist/index.css';
import calendarService, { CalendarEvent } from '../../services/calendarService';
import EventModal from './EventModal';
import toastService from '../../services/toastService';
import { useDateRangeStore } from '../../stores/dateRangeStore';

interface CalendarProps {
    className?: string;
}

interface EventModalData {
    id?: string;
    title?: string;
    description?: string;
    start: Date;
    end: Date;
    location?: string;
    readOnly?: boolean;
}

const Calendar = ({ className = '' }: CalendarProps) => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<EventModalData | undefined>(undefined);
    const { setDateRange } = useDateRangeStore();

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await calendarService.getCalendarEvents();
            setEvents(data);
        } catch (err) {
            setError('No se pudieron cargar los eventos. Por favor, intente de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const handleSaveEvent = async (event: Omit<CalendarEvent, 'id'> & { id?: string }) => {
        try {
            setLoading(true);
            
            if (selectedEvent?.id) {
                await calendarService.updateEvent(event as CalendarEvent);
                toastService.success('Evento actualizado correctamente');
            } else {
                await calendarService.createEvent(event);
                toastService.success('Evento creado correctamente');
            }
            
            setShowModal(false);
            await fetchEvents();
        } catch (err) {
            console.error('Error saving event:', err);
            setError('No se pudo guardar el evento. Por favor, intente de nuevo.');
            toastService.error('No se pudo guardar el evento. Por favor, intente de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEvent = async (id: string) => {
        try {
            setLoading(true);
            const success = await calendarService.deleteEvent(id);
            
            if (success) {
                setShowModal(false);
                toastService.success('Evento eliminado correctamente');
                await fetchEvents();
            } else {
                setError('No se pudo eliminar el evento. Por favor, intente de nuevo.');
                toastService.error('No se pudo eliminar el evento. Por favor, intente de nuevo.');
            }
        } catch (err) {
            console.error('Error deleting event:', err);
            setError('No se pudo eliminar el evento. Por favor, intente de nuevo.');
            toastService.error('No se pudo eliminar el evento. Por favor, intente de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const dragAndDropPlugin = createDragAndDropPlugin();
    const scrollController = createScrollControllerPlugin({
        initialScroll: '08:00'
    });

    const calendar = useCalendarApp({
        locale: 'es-AR',
        views: [
            createViewMonthGrid(),
            createViewWeek(),
            createViewDay()
        ],
        isResponsive: true,
        events: [],
        isDark: false,
        plugins: [dragAndDropPlugin, scrollController],
        callbacks: {
            onEventUpdate: async (updatedEvent) => {
                try {
                    setLoading(true);
                    await calendarService.updateEvent({
                        id: updatedEvent.id.toString(),
                        title: updatedEvent.title || '',
                        start: updatedEvent.start,
                        end: updatedEvent.end,
                        description: updatedEvent.description,
                        location: updatedEvent.location
                    });
                    toastService.success('Evento actualizado correctamente');
                    await fetchEvents();
                } catch (err) {
                    console.error('Error updating event:', err);
                    setError('No se pudo actualizar el evento. Por favor, intente de nuevo.');
                    toastService.error('No se pudo actualizar el evento. Por favor, intente de nuevo.');
                    await fetchEvents();
                } finally {
                    setLoading(false);
                }
            },
            onEventClick: (calendarEvent) => {
                const endDate = new Date(calendarEvent.end);
                const isPastEvent = endDate < new Date();
                
                setSelectedEvent({
                    id: calendarEvent.id.toString(),
                    title: calendarEvent.title || '',
                    description: calendarEvent.description || '',
                    start: new Date(calendarEvent.start),
                    end: new Date(calendarEvent.end),
                    location: calendarEvent.location || '',
                    readOnly: isPastEvent
                });
                setShowModal(true);
            },
            onDoubleClickDateTime: async (dateTime) => {
                const startDate = new Date(dateTime);
                const endDate = new Date(startDate);
                endDate.setHours(startDate.getHours() + 1);

                setSelectedEvent({
                    start: startDate,
                    end: endDate,
                });
                setShowModal(true);
            },
            onRangeUpdate: async (range) => {
                console.log("range", range);
                // TODO: Update the date range in the store
            }
        },
        dayBoundaries: {
            start: '07:00',
            end: '19:00',
        },
        weekOptions: {
            eventWidth: 95,
            timeAxisFormatOptions: { hour: '2-digit', minute: '2-digit' }
        }
    });

    useEffect(() => {
        calendar?.events.set(events);
    }, [events]);

    return (
        <div className={`h-full ${className}`}>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <div className="text-gray-600">Loading calendar...</div>
                </div>
            ) : error ? (
                <div className="flex justify-center items-center h-full">
                    <div className="text-red-600 p-4 bg-red-50 rounded-lg">
                        <p className="font-semibold mb-2">Error</p>
                        <p>{error}</p>
                        <button
                            onClick={fetchEvents}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Intentar de nuevo
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <ScheduleXCalendar calendarApp={calendar} />
                    <EventModal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        onSave={handleSaveEvent}
                        onDelete={handleDeleteEvent}
                        event={selectedEvent}
                    />
                </>
            )}
        </div>
    );
};

export default Calendar; 