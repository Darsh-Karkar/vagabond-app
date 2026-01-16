
export enum TripStatus {
  PLANNING = 'PLANNING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export enum TravelWho {
  SOLO = 'Solo',
  COUPLE = 'Couple',
  FRIENDS = 'Friends',
  FAMILY = 'Family'
}

export enum TravelStyle {
  RELAXED = 'Relaxed',
  ADVENTURE = 'Adventure',
  FOOD = 'Food',
  CULTURE = 'Culture',
  NATURE = 'Nature',
  LUXURY = 'Luxury'
}

export interface Place {
  id: string;
  name: string;
  category: string;
  description: string;
  bestTime: string;
  costEstimate: string;
  isUnlocked: boolean;
  lat: number;
  lng: number;
  timeSlot?: string;
}

export interface DayPlan {
  dayNumber: number;
  title: string;
  places: Place[];
}

export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: TripStatus;
  budget?: number;
  who: TravelWho;
  styles: TravelStyle[];
  itinerary: DayPlan[];
  totalPlaces: number;
  unlockedCount: number;
  image: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  style: TravelStyle;
  tripsCompleted: number;
  placesUnlocked: number;
  badgesEarned: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
}
