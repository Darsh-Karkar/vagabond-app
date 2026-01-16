
import { TripStatus, TravelWho, Trip, Badge } from './types';

export const MOCK_TRIPS: Trip[] = [
  {
    id: '1',
    destination: 'Lakshadweep',
    startDate: '2024-08-10',
    endDate: '2024-08-15',
    status: TripStatus.IN_PROGRESS,
    who: TravelWho.FRIENDS,
    styles: [],
    totalPlaces: 12,
    unlockedCount: 4,
    image: 'https://picsum.photos/seed/lakshadweep/800/400',
    itinerary: []
  },
  {
    id: '2',
    destination: 'Goa',
    startDate: '2024-12-01',
    endDate: '2024-12-05',
    status: TripStatus.PLANNING,
    who: TravelWho.SOLO,
    styles: [],
    totalPlaces: 8,
    unlockedCount: 0,
    image: 'https://picsum.photos/seed/goa/800/400',
    itinerary: []
  }
];

export const MOCK_BADGES: Badge[] = [
  { id: 'b1', name: 'Island Hopper', icon: 'fa-island-tropical', description: 'Visited 5+ islands', unlocked: true },
  { id: 'b2', name: 'Monsoon Traveller', icon: 'fa-cloud-showers-heavy', description: 'Travelled in heavy rain', unlocked: true },
  { id: 'b3', name: 'Explorer Lv. 3', icon: 'fa-medal', description: 'Reached explorer level 3', unlocked: false }
];
