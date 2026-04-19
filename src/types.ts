export type Contact = {
  _id: string;
  name: string;
  mediagallery?: {
    src: string;
    painter?: string;
  }[];
  thumbnail: string;
  story?: string;
  isFemale: boolean;
  fontUrl?: string;
};

export type Comment = {
  fName: string;
  lName: string;
  phone: string;
  _createdDate: string;
  comment: string;
  isPinned: boolean;
};

export type Volunteer = {
  name: string;
  role: string;
  image: string;
  link: string;
  isPainter: boolean;
  order: number;
};

export type WixData = {
  ourActivity: string[];
  volunteers: Volunteer[];
  uploadUrl: string;
  fallenData: Contact[];
};

export interface ActivitiesData {
  schoolActivity: string[];
  armyActivity: string[];
  abroadActivity: string[];
  familySAtoriesActivity: string[];
}
